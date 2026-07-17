/**
 * Extracción manual y puntual de datos de referencia (SOLO LECTURA).
 *
 * Objetivo: obtener una fotografía actual de indicadores y cobertura
 * territorial desde PORTAL_NIEVE para evaluar la futura sección de
 * estadísticas y el mapa interactivo de los sitios corporativos.
 *
 * Este script:
 *   - se ejecuta ÚNICAMENTE de forma manual (node extract-current-statistics.mjs);
 *   - lee credenciales solo de variables de entorno (ver db.mjs);
 *   - ejecuta exclusivamente consultas SELECT agregadas y acotadas;
 *   - exporta resultados a data/database-snapshot/ y termina cerrando la conexión;
 *   - NO alimenta la página, NO crea endpoints y NO deja procesos activos;
 *   - NO exporta filas de clientes ni datos personales (solo agregados).
 *
 * Contexto verificado en la exploración inicial (2026-07-16):
 *   - dbo.clientes.Cia: 1 = Distribuciones La Nieve, 2 = Unimarka
 *     (inferido de dbo.centros_operativos y magnitudes; ver documentación).
 *   - Geografía en texto libre: clientes.f_desc_depto / f_desc_ciudad.
 *   - Ventas: dbo.VentasMSV_NV (La Nieve) y dbo.VentasMSV_UK (Unimarka).
 *
 * Unidades de negocio de La Nieve añadidas el 2026-07-17:
 *   - BAT: ventas en dbo.VentasBAT_NV (mismo esquema que VentasMSV_NV);
 *     clientes marcados con dbo.clientes.TipoNegocioBAT; maestras BMSV*.
 *   - Alpina: dos operaciones con esquema propio — amovil (Yopal) y
 *     amovil1 (Villavicencio); ventas VentasALP_* (boAfectaVenta = 'S'
 *     distingue líneas que afectan venta) y clientes ClientesALP_* con
 *     corte diario (FechaCorte). La geografía viene en las ventas
 *     (txDepartamento / txCiudad), no en la maestra de clientes.
 *   - Nestlé Ecom: NO existe tabla de ventas propia; la única fuente
 *     encontrada es dbo.ObjetivoEfectividad_EcNestle_nv (objetivos por
 *     ruta) y dbo.ECOM_NstlObjetivoMarcos (vacía a la fecha).
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runReadOnlyQuery, withConnection } from "./db.mjs";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const outputDir = resolve(repoRoot, "data", "database-snapshot");

const COMPANY_BY_CIA = { 1: "La Nieve", 2: "Unimarka" };

/** Cada consulta responde una pregunta concreta; todas son de lectura. */
const QUERIES = [
  {
    id: "meta_tablas",
    objetivo:
      "Inventario de tablas con filas aproximadas para ubicar fuentes útiles.",
    sql: `SELECT s.name AS esquema, t.name AS tabla, SUM(p.rows) AS filas_aprox
FROM sys.tables t
JOIN sys.schemas s ON t.schema_id = s.schema_id
JOIN sys.partitions p ON t.object_id = p.object_id AND p.index_id IN (0, 1)
GROUP BY s.name, t.name
ORDER BY filas_aprox DESC;`,
  },
  {
    id: "meta_vistas",
    objetivo: "Inventario de vistas disponibles.",
    sql: `SELECT TABLE_SCHEMA AS esquema, TABLE_NAME AS vista
FROM INFORMATION_SCHEMA.VIEWS ORDER BY TABLE_SCHEMA, TABLE_NAME;`,
  },
  {
    id: "centros_operativos",
    objetivo:
      "Mapear el código Cia a cada empresa y conocer los centros operativos (sedes).",
    sql: `SELECT cia, co, co_descripcion, id_regional
FROM dbo.centros_operativos ORDER BY cia, co;`,
  },
  {
    id: "clientes_resumen",
    objetivo:
      "Comparar filas vs terceros distintos por compañía (una fila por sucursal puede duplicar terceros).",
    sql: `SELECT Cia AS cia, COUNT(*) AS filas,
  COUNT(DISTINCT IdTercero) AS terceros_distintos
FROM dbo.clientes GROUP BY Cia ORDER BY Cia;`,
  },
  {
    id: "clientes_estado",
    objetivo:
      "Entender la distribución de EstadoCliente (hipótesis: 1 = activo, 0 = inactivo, NULL = sin dato).",
    sql: `SELECT Cia AS cia, EstadoCliente AS estado_cliente, COUNT(*) AS filas
FROM dbo.clientes GROUP BY Cia, EstadoCliente ORDER BY Cia, EstadoCliente;`,
  },
  {
    id: "clientes_por_departamento",
    objetivo:
      "Cobertura territorial por departamento (total vs activos), base del mapa.",
    sql: `SELECT Cia AS cia,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO')))) AS departamento,
  COUNT(DISTINCT IdTercero) AS clientes_total,
  COUNT(DISTINCT CASE WHEN EstadoCliente = 1 THEN IdTercero END) AS clientes_activos
FROM dbo.clientes
WHERE Cia IN (1, 2)
GROUP BY Cia, UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO'))))
ORDER BY cia, clientes_total DESC;`,
  },
  {
    id: "clientes_por_municipio",
    objetivo:
      "Detalle municipal agregado (sin datos personales) para evaluar granularidad del mapa.",
    sql: `SELECT Cia AS cia,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO')))) AS departamento,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_ciudad, ''), 'SIN MUNICIPIO')))) AS municipio,
  COUNT(DISTINCT IdTercero) AS clientes_total,
  COUNT(DISTINCT CASE WHEN EstadoCliente = 1 THEN IdTercero END) AS clientes_activos
FROM dbo.clientes
WHERE Cia IN (1, 2)
GROUP BY Cia,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO')))),
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_ciudad, ''), 'SIN MUNICIPIO'))))
ORDER BY cia, departamento, clientes_total DESC;`,
  },
  {
    id: "rutas_activas",
    objetivo:
      "Rutas comerciales activas (vendedores distintos) y clientes asignados a ruta.",
    sql: `SELECT Cia AS cia,
  COUNT(DISTINCT CodigoVendedor) AS rutas_vendedores,
  COUNT(DISTINCT Cliente) AS clientes_en_ruta
FROM dbo.RutaClienteActivos GROUP BY Cia ORDER BY Cia;`,
  },
  {
    id: "bodegas",
    objetivo: "Bodegas registradas por compañía.",
    sql: `SELECT cia, COUNT(DISTINCT bodega) AS bodegas
FROM dbo.Bodegas GROUP BY cia ORDER BY cia;`,
  },
  {
    id: "productos_nv_estado",
    objetivo: "Productos del catálogo La Nieve por estado.",
    sql: `SELECT Estado AS estado, COUNT(*) AS productos
FROM dbo.NMSVMaestraProductos GROUP BY Estado ORDER BY productos DESC;`,
  },
  {
    id: "productos_uk_estado",
    objetivo: "Productos del catálogo Unimarka por estado.",
    sql: `SELECT Estado AS estado, COUNT(*) AS productos
FROM dbo.UMSVMaestraProductos GROUP BY Estado ORDER BY productos DESC;`,
  },
  {
    id: "marcas_catalogo",
    objetivo:
      "Marcas registradas en la maestra de cada empresa (catálogo interno, no equivale a aliados del sitio).",
    sql: `SELECT 'La Nieve' AS empresa, COUNT(DISTINCT Cod_Marca) AS marcas FROM dbo.NMSVMarca
UNION ALL
SELECT 'Unimarka', COUNT(DISTINCT Cod_Marca) FROM dbo.UMSVMarca;`,
  },
  {
    id: "casas_comerciales",
    objetivo:
      "Casas comerciales registradas (candidato más cercano al concepto de 'aliados').",
    sql: `SELECT 'La Nieve' AS empresa, COUNT(*) AS casas_comerciales FROM dbo.NMSVCasasComerciales
UNION ALL
SELECT 'Unimarka', COUNT(*) FROM dbo.UMSVCasasComerciales;`,
  },
  {
    id: "ventas_rango_fechas",
    objetivo: "Vigencia de los datos de ventas (fecha mínima y máxima).",
    sql: `SELECT
  (SELECT MIN(Fecha) FROM dbo.VentasMSV_NV) AS min_fecha_nv,
  (SELECT MAX(Fecha) FROM dbo.VentasMSV_NV) AS max_fecha_nv,
  (SELECT MIN(Fecha) FROM dbo.VentasMSV_UK) AS min_fecha_uk,
  (SELECT MAX(Fecha) FROM dbo.VentasMSV_UK) AS max_fecha_uk;`,
  },
  {
    id: "ventas_nv_por_anio",
    objetivo:
      "Documentos de venta y valor subtotal por año (2025 en adelante), La Nieve.",
    sql: `SELECT YEAR(Fecha) AS anio,
  COUNT(DISTINCT [Numero Factura]) AS documentos_distintos,
  SUM(ValorSubtotalLocal) AS valor_subtotal_local
FROM dbo.VentasMSV_NV WHERE Fecha >= '2025-01-01'
GROUP BY YEAR(Fecha) ORDER BY anio;`,
  },
  {
    id: "ventas_uk_por_anio",
    objetivo:
      "Documentos de venta y valor subtotal por año (2025 en adelante), Unimarka.",
    sql: `SELECT YEAR(Fecha) AS anio,
  COUNT(DISTINCT [Numero Factura]) AS documentos_distintos,
  SUM(ValorSubtotalLocal) AS valor_subtotal_local
FROM dbo.VentasMSV_UK WHERE Fecha >= '2025-01-01'
GROUP BY YEAR(Fecha) ORDER BY anio;`,
  },
  {
    id: "ventas_nv_tipos_documento_2026",
    objetivo:
      "Composición por tipo de documento en 2026 (detectar facturas vs devoluciones), La Nieve.",
    sql: `SELECT [Tipo Documento] AS tipo_documento,
  COUNT(*) AS lineas,
  COUNT(DISTINCT [Numero Factura]) AS documentos,
  SUM(ValorSubtotalLocal) AS valor_subtotal_local
FROM dbo.VentasMSV_NV WHERE Fecha >= '2026-01-01'
GROUP BY [Tipo Documento] ORDER BY lineas DESC;`,
  },
  {
    id: "clientes_con_compras_90d",
    objetivo:
      "Clientes con compras en los últimos 90 días (medida operativa de actividad, contrastable con EstadoCliente).",
    sql: `SELECT 'La Nieve' AS empresa, COUNT(DISTINCT [Nit Cliente]) AS clientes_con_compras_90d
FROM dbo.VentasMSV_NV WHERE Fecha >= DATEADD(day, -90, CAST(GETDATE() AS date))
UNION ALL
SELECT 'Unimarka', COUNT(DISTINCT [Nit Cliente])
FROM dbo.VentasMSV_UK WHERE Fecha >= DATEADD(day, -90, CAST(GETDATE() AS date));`,
  },
  {
    id: "pedidos_por_anio",
    objetivo:
      "Pedidos y facturas distintas por compañía y año (2025 en adelante); comparar filas vs distintos por posibles duplicados.",
    sql: `SELECT cia, YEAR(fecha) AS anio,
  COUNT(*) AS filas,
  COUNT(DISTINCT pedido) AS pedidos_distintos,
  COUNT(DISTINCT factura) AS facturas_distintas
FROM dbo.pedidos_facturas WHERE fecha >= '2025-01-01'
GROUP BY cia, YEAR(fecha) ORDER BY cia, anio;`,
  },

  // ---- Unidad BAT (parte de La Nieve) -----------------------------------
  {
    id: "bat_ventas_rango_fechas",
    objetivo: "Vigencia de los datos de ventas de la unidad BAT.",
    sql: `SELECT MIN(Fecha) AS min_fecha, MAX(Fecha) AS max_fecha
FROM dbo.VentasBAT_NV;`,
  },
  {
    id: "bat_ventas_por_anio",
    objetivo:
      "Documentos de venta y valor subtotal por año (2025 en adelante), unidad BAT de La Nieve.",
    sql: `SELECT YEAR(Fecha) AS anio,
  COUNT(DISTINCT [Numero Factura]) AS documentos_distintos,
  SUM(ValorSubtotalLocal) AS valor_subtotal_local
FROM dbo.VentasBAT_NV WHERE Fecha >= '2025-01-01'
GROUP BY YEAR(Fecha) ORDER BY anio;`,
  },
  {
    id: "bat_clientes_con_compras_90d",
    objetivo:
      "Clientes de la unidad BAT con compras en los últimos 90 días (NIT distintos).",
    sql: `SELECT COUNT(DISTINCT [Nit Cliente]) AS clientes_con_compras_90d
FROM dbo.VentasBAT_NV
WHERE Fecha >= DATEADD(day, -90, CAST(GETDATE() AS date));`,
  },
  {
    id: "bat_clientes_marcados",
    objetivo:
      "Clientes marcados con TipoNegocioBAT en la maestra, por compañía (la unidad opera dentro de La Nieve; el marcado en otras Cia se documenta como anomalía).",
    sql: `SELECT Cia AS cia, COUNT(DISTINCT IdTercero) AS terceros
FROM dbo.clientes
WHERE TipoNegocioBAT IS NOT NULL AND LTRIM(RTRIM(TipoNegocioBAT)) <> ''
GROUP BY Cia ORDER BY Cia;`,
  },
  {
    id: "bat_clientes_por_departamento",
    objetivo:
      "Cobertura territorial de los clientes marcados BAT dentro de La Nieve (Cia 1); subconjunto de la cobertura general.",
    sql: `SELECT
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO')))) AS departamento,
  COUNT(DISTINCT IdTercero) AS clientes_total,
  COUNT(DISTINCT CASE WHEN EstadoCliente = 1 THEN IdTercero END) AS clientes_activos
FROM dbo.clientes
WHERE Cia = 1 AND TipoNegocioBAT IS NOT NULL AND LTRIM(RTRIM(TipoNegocioBAT)) <> ''
GROUP BY UPPER(LTRIM(RTRIM(COALESCE(NULLIF(f_desc_depto, ''), 'SIN DEPARTAMENTO'))))
ORDER BY clientes_total DESC;`,
  },
  {
    id: "bat_productos_estado",
    objetivo: "Productos del catálogo BAT por estado.",
    sql: `SELECT Estado AS estado, COUNT(*) AS productos
FROM dbo.BMSVMaestraProductos GROUP BY Estado ORDER BY productos DESC;`,
  },
  {
    id: "bat_marcas_catalogo",
    objetivo: "Marcas registradas en la maestra BAT (catálogo interno).",
    sql: `SELECT COUNT(DISTINCT Cod_Marca) AS marcas FROM dbo.BMSVMarca;`,
  },

  // ---- Unidad Alpina (parte de La Nieve; esquemas amovil/amovil1) --------
  {
    id: "alp_ventas_por_anio",
    objetivo:
      "Facturas y valor antes de IVA por año y sede (2025 en adelante), unidad Alpina; solo líneas que afectan venta (boAfectaVenta = 'S').",
    sql: `SELECT 'Yopal' AS sede, YEAR(dtFactura) AS anio,
  COUNT(DISTINCT nbFactura) AS facturas_distintas,
  SUM(vlrAntesIva) AS valor_antes_iva
FROM amovil.VentasALP_YP
WHERE boAfectaVenta = 'S' AND dtFactura >= '2025-01-01'
GROUP BY YEAR(dtFactura)
UNION ALL
SELECT 'Villavicencio', YEAR(dtFactura),
  COUNT(DISTINCT nbFactura), SUM(vlrAntesIva)
FROM amovil1.VentasALP_VCIO
WHERE boAfectaVenta = 'S' AND dtFactura >= '2025-01-01'
GROUP BY YEAR(dtFactura)
ORDER BY sede, anio;`,
  },
  {
    id: "alp_clientes_snapshot",
    objetivo:
      "Clientes y rutas del corte vigente por sede, unidad Alpina (la maestra amovil es una fotografía diaria con FechaCorte).",
    sql: `SELECT 'Yopal' AS sede,
  COUNT(DISTINCT cliente_id) AS clientes,
  COUNT(DISTINCT NULLIF(LTRIM(RTRIM(nbRuta)), '')) AS rutas,
  MAX(FechaCorte) AS fecha_corte
FROM amovil.ClientesALP_YP
UNION ALL
SELECT 'Villavicencio',
  COUNT(DISTINCT cliente_id),
  COUNT(DISTINCT NULLIF(LTRIM(RTRIM(nbRuta)), '')),
  MAX(FechaCorte)
FROM amovil1.ClientesALP_VCIO;`,
  },
  {
    id: "alp_clientes_con_compras_90d",
    objetivo:
      "Clientes Alpina con compras en los últimos 90 días por sede (documentos distintos).",
    sql: `SELECT 'Yopal' AS sede, COUNT(DISTINCT nbDocumento) AS clientes_con_compras_90d
FROM amovil.VentasALP_YP
WHERE boAfectaVenta = 'S' AND dtFactura >= DATEADD(day, -90, CAST(GETDATE() AS date))
UNION ALL
SELECT 'Villavicencio', COUNT(DISTINCT nbDocumento)
FROM amovil1.VentasALP_VCIO
WHERE boAfectaVenta = 'S' AND dtFactura >= DATEADD(day, -90, CAST(GETDATE() AS date));`,
  },
  {
    id: "alp_cobertura_territorial_12m",
    objetivo:
      "Cobertura por departamento y municipio con compradores Alpina en los últimos 12 meses (desde las ventas: la maestra amovil no trae departamento).",
    sql: `SELECT 'Yopal' AS sede,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txDepartamento, ''), 'SIN DEPARTAMENTO')))) AS departamento,
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txCiudad, ''), 'SIN MUNICIPIO')))) AS municipio,
  COUNT(DISTINCT nbDocumento) AS clientes
FROM amovil.VentasALP_YP
WHERE boAfectaVenta = 'S' AND dtFactura >= DATEADD(month, -12, CAST(GETDATE() AS date))
GROUP BY UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txDepartamento, ''), 'SIN DEPARTAMENTO')))),
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txCiudad, ''), 'SIN MUNICIPIO'))))
UNION ALL
SELECT 'Villavicencio',
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txDepartamento, ''), 'SIN DEPARTAMENTO')))),
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txCiudad, ''), 'SIN MUNICIPIO')))),
  COUNT(DISTINCT nbDocumento)
FROM amovil1.VentasALP_VCIO
WHERE boAfectaVenta = 'S' AND dtFactura >= DATEADD(month, -12, CAST(GETDATE() AS date))
GROUP BY UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txDepartamento, ''), 'SIN DEPARTAMENTO')))),
  UPPER(LTRIM(RTRIM(COALESCE(NULLIF(txCiudad, ''), 'SIN MUNICIPIO'))))
ORDER BY sede, departamento, clientes DESC;`,
  },

  // ---- Nestlé Ecom (parte de La Nieve; sin tabla de ventas propia) -------
  {
    id: "ecom_nestle_objetivos",
    objetivo:
      "Única fuente encontrada para Nestlé Ecom: objetivos de efectividad por ruta (última fecha disponible, rutas vigentes y maestra de clientes objetivo).",
    sql: `SELECT MAX(FECHA) AS ultima_fecha,
  COUNT(DISTINCT RUTA) AS rutas_distintas_historico,
  (SELECT COUNT(DISTINCT RUTA) FROM dbo.ObjetivoEfectividad_EcNestle_nv
     WHERE FECHA = (SELECT MAX(FECHA) FROM dbo.ObjetivoEfectividad_EcNestle_nv)) AS rutas_ultima_fecha,
  (SELECT SUM(MAESTRA) FROM dbo.ObjetivoEfectividad_EcNestle_nv
     WHERE FECHA = (SELECT MAX(FECHA) FROM dbo.ObjetivoEfectividad_EcNestle_nv)) AS maestra_ultima_fecha
FROM dbo.ObjetivoEfectividad_EcNestle_nv;`,
  },
];

const MAX_ROWS_IN_RESULTS_FILE = 1000;

function byId(results, id) {
  return results.find((r) => r.id === id && !r.error)?.rows ?? null;
}

function num(value) {
  return typeof value === "string" ? Number(value) : value;
}

function buildStatistics(results, extractedAt) {
  const stats = [];
  const push = (stat) => stats.push({ fecha_extraccion: extractedAt, ...stat });

  const resumen = byId(results, "clientes_resumen");
  for (const row of resumen ?? []) {
    const empresa = COMPANY_BY_CIA[row.cia];
    if (!empresa) continue;
    push({
      indicador: "Clientes registrados (histórico, terceros distintos)",
      empresa,
      valor: num(row.terceros_distintos),
      periodo: "Histórico completo",
      fuente: "dbo.clientes",
      columnas: "Cia, IdTercero",
      consulta_id: "clientes_resumen",
      confianza: "alta en el conteo; media en interpretación (incluye inactivos)",
      observaciones:
        "COUNT DISTINCT IdTercero; la tabla tiene una fila por sucursal, por eso filas > terceros.",
    });
  }

  const estados = byId(results, "clientes_estado");
  if (estados) {
    for (const cia of [1, 2]) {
      const activos = estados
        .filter((r) => r.cia === cia && r.estado_cliente === 1)
        .reduce((acc, r) => acc + num(r.filas), 0);
      push({
        indicador: "Clientes con EstadoCliente = 1 (hipótesis: activos)",
        empresa: COMPANY_BY_CIA[cia],
        valor: activos,
        periodo: "Estado actual",
        fuente: "dbo.clientes",
        columnas: "Cia, EstadoCliente",
        consulta_id: "clientes_estado",
        confianza:
          "media: la semántica de EstadoCliente (1=activo) es una hipótesis no confirmada por el negocio",
        observaciones:
          "Conteo de filas (sucursales), no de terceros distintos. Existen filas con estado NULL.",
      });
    }
  }

  const compras90 = byId(results, "clientes_con_compras_90d");
  for (const row of compras90 ?? []) {
    push({
      indicador: "Clientes con compras en los últimos 90 días (NIT distintos)",
      empresa: row.empresa,
      valor: num(row.clientes_con_compras_90d),
      periodo: "Últimos 90 días",
      fuente: row.empresa === "La Nieve" ? "dbo.VentasMSV_NV" : "dbo.VentasMSV_UK",
      columnas: "Nit Cliente, Fecha",
      consulta_id: "clientes_con_compras_90d",
      confianza: "alta: es una medida operativa directa",
      observaciones:
        "Incluye cualquier documento de venta del periodo (también devoluciones).",
    });
  }

  const porDepto = byId(results, "clientes_por_departamento");
  if (porDepto) {
    for (const cia of [1, 2]) {
      const rows = porDepto.filter(
        (r) => r.cia === cia && r.departamento !== "SIN DEPARTAMENTO"
      );
      push({
        indicador: "Departamentos con clientes registrados",
        empresa: COMPANY_BY_CIA[cia],
        valor: rows.length,
        periodo: "Histórico completo",
        fuente: "dbo.clientes",
        columnas: "Cia, f_desc_depto",
        consulta_id: "clientes_por_departamento",
        confianza:
          "media-alta: campo de texto libre; puede contener variantes u errores de escritura",
        observaciones:
          "Excluye el grupo 'SIN DEPARTAMENTO'. Ver department-coverage-current.json para el detalle.",
      });
      push({
        indicador: "Departamentos con clientes activos (EstadoCliente = 1)",
        empresa: COMPANY_BY_CIA[cia],
        valor: rows.filter((r) => num(r.clientes_activos) > 0).length,
        periodo: "Estado actual",
        fuente: "dbo.clientes",
        columnas: "Cia, f_desc_depto, EstadoCliente",
        consulta_id: "clientes_por_departamento",
        confianza: "media: depende de la hipótesis EstadoCliente = 1 activo",
        observaciones: "Excluye el grupo 'SIN DEPARTAMENTO'.",
      });
    }
  }

  const porMunicipio = byId(results, "clientes_por_municipio");
  if (porMunicipio) {
    for (const cia of [1, 2]) {
      const rows = porMunicipio.filter(
        (r) => r.cia === cia && r.municipio !== "SIN MUNICIPIO"
      );
      push({
        indicador: "Municipios/ciudades con clientes registrados",
        empresa: COMPANY_BY_CIA[cia],
        valor: rows.length,
        periodo: "Histórico completo",
        fuente: "dbo.clientes",
        columnas: "Cia, f_desc_depto, f_desc_ciudad",
        consulta_id: "clientes_por_municipio",
        confianza:
          "media: texto libre; el conteo puede inflarse por variantes del mismo municipio",
        observaciones: "Detalle completo en department-coverage-current.json/.csv.",
      });
    }
  }

  const rutas = byId(results, "rutas_activas");
  for (const row of rutas ?? []) {
    const empresa = COMPANY_BY_CIA[row.cia];
    if (!empresa) continue;
    push({
      indicador: "Rutas comerciales activas (códigos de vendedor distintos)",
      empresa,
      valor: num(row.rutas_vendedores),
      periodo: "Estado actual",
      fuente: "dbo.RutaClienteActivos",
      columnas: "Cia, CodigoVendedor",
      consulta_id: "rutas_activas",
      confianza:
        "media-alta: asume que un código de vendedor equivale a una ruta activa",
      observaciones: `Clientes asignados a ruta: ${num(row.clientes_en_ruta)}.`,
    });
  }

  const bodegas = byId(results, "bodegas");
  for (const row of bodegas ?? []) {
    const empresa = COMPANY_BY_CIA[row.cia];
    if (!empresa) continue;
    push({
      indicador: "Bodegas registradas",
      empresa,
      valor: num(row.bodegas),
      periodo: "Estado actual",
      fuente: "dbo.Bodegas",
      columnas: "cia, bodega",
      consulta_id: "bodegas",
      confianza:
        "media: puede incluir bodegas lógicas del ERP que no son sedes físicas",
      observaciones: "Validar con el negocio antes de publicar.",
    });
  }

  for (const [id, empresa] of [
    ["productos_nv_estado", "La Nieve"],
    ["productos_uk_estado", "Unimarka"],
  ]) {
    const rows = byId(results, id);
    if (!rows) continue;
    const total = rows.reduce((acc, r) => acc + num(r.productos), 0);
    const activos = rows
      .filter((r) => /activ/i.test(String(r.estado ?? "")))
      .reduce((acc, r) => acc + num(r.productos), 0);
    push({
      indicador: "Productos en catálogo (total / con estado activo)",
      empresa,
      valor: { total, activos },
      periodo: "Estado actual",
      fuente: id === "productos_nv_estado" ? "dbo.NMSVMaestraProductos" : "dbo.UMSVMaestraProductos",
      columnas: "Estado",
      consulta_id: id,
      confianza: "media-alta: depende de la etiqueta textual del estado",
      observaciones: `Estados encontrados: ${rows.map((r) => `${r.estado}=${r.productos}`).join(", ")}.`,
    });
  }

  const marcas = byId(results, "marcas_catalogo");
  for (const row of marcas ?? []) {
    push({
      indicador: "Marcas en la maestra de productos",
      empresa: row.empresa,
      valor: num(row.marcas),
      periodo: "Estado actual",
      fuente: row.empresa === "La Nieve" ? "dbo.NMSVMarca" : "dbo.UMSVMarca",
      columnas: "Cod_Marca",
      consulta_id: "marcas_catalogo",
      confianza:
        "baja para uso público: catálogo interno del ERP, no equivale a los aliados comerciales del sitio",
      observaciones: "No usar como número de aliados sin validación.",
    });
  }

  const casas = byId(results, "casas_comerciales");
  for (const row of casas ?? []) {
    push({
      indicador: "Casas comerciales registradas",
      empresa: row.empresa,
      valor: num(row.casas_comerciales),
      periodo: "Estado actual",
      fuente:
        row.empresa === "La Nieve"
          ? "dbo.NMSVCasasComerciales"
          : "dbo.UMSVCasasComerciales",
      columnas: "COUNT(*)",
      consulta_id: "casas_comerciales",
      confianza:
        "baja-media: incluye casas históricas o administrativas; supera con creces los aliados publicados (16/13)",
      observaciones: "Requiere depuración de negocio antes de usarse.",
    });
  }

  for (const [id, empresa] of [
    ["ventas_nv_por_anio", "La Nieve"],
    ["ventas_uk_por_anio", "Unimarka"],
  ]) {
    for (const row of byId(results, id) ?? []) {
      push({
        indicador: `Documentos de venta y valor subtotal ${row.anio}`,
        empresa,
        valor: {
          documentos_distintos: num(row.documentos_distintos),
          valor_subtotal_local: num(row.valor_subtotal_local),
        },
        periodo: String(row.anio),
        fuente: id === "ventas_nv_por_anio" ? "dbo.VentasMSV_NV" : "dbo.VentasMSV_UK",
        columnas: "Fecha, Numero Factura, ValorSubtotalLocal",
        consulta_id: id,
        confianza:
          "media: la suma incluye todos los tipos de documento (posibles devoluciones); dato financiero sensible",
        observaciones:
          "2026 es año parcial. No publicar valores monetarios sin aprobación del negocio.",
      });
    }
  }

  const pedidos = byId(results, "pedidos_por_anio");
  for (const row of pedidos ?? []) {
    const empresa = COMPANY_BY_CIA[row.cia];
    if (!empresa) continue;
    push({
      indicador: `Pedidos distintos ${row.anio}`,
      empresa,
      valor: num(row.pedidos_distintos),
      periodo: String(row.anio),
      fuente: "dbo.pedidos_facturas",
      columnas: "cia, fecha, pedido",
      consulta_id: "pedidos_por_anio",
      confianza: "media-alta",
      observaciones: `Filas: ${num(row.filas)}; facturas distintas: ${num(row.facturas_distintas)}. 2026 es año parcial.`,
    });
  }

  const rango = byId(results, "ventas_rango_fechas")?.[0];
  if (rango) {
    push({
      indicador: "Vigencia de datos de ventas (fecha máxima)",
      empresa: "Ambas",
      valor: { la_nieve: rango.max_fecha_nv, unimarka: rango.max_fecha_uk },
      periodo: "Actual",
      fuente: "dbo.VentasMSV_NV / dbo.VentasMSV_UK",
      columnas: "Fecha",
      consulta_id: "ventas_rango_fechas",
      confianza: "alta",
      observaciones: `Histórico disponible desde ${rango.min_fecha_nv} (NV) y ${rango.min_fecha_uk} (UK).`,
    });
  }

  // ---- Unidad BAT (parte de La Nieve) -----------------------------------
  const EMPRESA_BAT = "La Nieve — unidad BAT";

  const batRango = byId(results, "bat_ventas_rango_fechas")?.[0];
  if (batRango) {
    push({
      indicador: "Vigencia de datos de ventas BAT",
      empresa: EMPRESA_BAT,
      valor: { desde: batRango.min_fecha, hasta: batRango.max_fecha },
      periodo: "Actual",
      fuente: "dbo.VentasBAT_NV",
      columnas: "Fecha",
      consulta_id: "bat_ventas_rango_fechas",
      confianza: "alta",
      observaciones: "La unidad BAT hace parte de La Nieve.",
    });
  }

  for (const row of byId(results, "bat_ventas_por_anio") ?? []) {
    push({
      indicador: `Documentos de venta y valor subtotal ${row.anio} (BAT)`,
      empresa: EMPRESA_BAT,
      valor: {
        documentos_distintos: num(row.documentos_distintos),
        valor_subtotal_local: num(row.valor_subtotal_local),
      },
      periodo: String(row.anio),
      fuente: "dbo.VentasBAT_NV",
      columnas: "Fecha, Numero Factura, ValorSubtotalLocal",
      consulta_id: "bat_ventas_por_anio",
      confianza:
        "media: la suma incluye todos los tipos de documento (posibles devoluciones); dato financiero sensible",
      observaciones:
        "2026 es año parcial. No publicar valores monetarios sin aprobación del negocio.",
    });
  }

  const bat90 = byId(results, "bat_clientes_con_compras_90d")?.[0];
  if (bat90) {
    push({
      indicador: "Clientes con compras en los últimos 90 días (BAT, NIT distintos)",
      empresa: EMPRESA_BAT,
      valor: num(bat90.clientes_con_compras_90d),
      periodo: "Últimos 90 días",
      fuente: "dbo.VentasBAT_NV",
      columnas: "Nit Cliente, Fecha",
      consulta_id: "bat_clientes_con_compras_90d",
      confianza: "alta: es una medida operativa directa",
      observaciones:
        "Incluye cualquier documento de venta del periodo (también devoluciones).",
    });
  }

  const batMarcados = byId(results, "bat_clientes_marcados");
  if (batMarcados) {
    const cia1 = batMarcados.find((r) => r.cia === 1);
    const otros = batMarcados.filter((r) => r.cia !== 1);
    push({
      indicador: "Clientes marcados con TipoNegocioBAT (maestra de clientes)",
      empresa: EMPRESA_BAT,
      valor: num(cia1?.terceros ?? 0),
      periodo: "Estado actual",
      fuente: "dbo.clientes",
      columnas: "Cia, TipoNegocioBAT, IdTercero",
      consulta_id: "bat_clientes_marcados",
      confianza:
        "media-alta: el marcado es un atributo del ERP; incluye clientes inactivos",
      observaciones: `Solo Cia 1. Anomalía documentada: el marcado también aparece en otras compañías (${otros
        .map((r) => `Cia ${r.cia}: ${num(r.terceros)}`)
        .join(", ")}); requiere aclaración del negocio.`,
    });
  }

  const batDeptos = byId(results, "bat_clientes_por_departamento");
  if (batDeptos) {
    const rows = batDeptos.filter((r) => r.departamento !== "SIN DEPARTAMENTO");
    push({
      indicador: "Departamentos con clientes BAT registrados",
      empresa: EMPRESA_BAT,
      valor: rows.length,
      periodo: "Histórico completo",
      fuente: "dbo.clientes (Cia 1 + TipoNegocioBAT)",
      columnas: "f_desc_depto",
      consulta_id: "bat_clientes_por_departamento",
      confianza: "media-alta: campo de texto libre",
      observaciones:
        "Subconjunto de la cobertura general de La Nieve; detalle en department-coverage-current.json.",
    });
  }

  const batProductos = byId(results, "bat_productos_estado");
  if (batProductos) {
    const total = batProductos.reduce((acc, r) => acc + num(r.productos), 0);
    const activos = batProductos
      .filter((r) => /activ/i.test(String(r.estado ?? "")))
      .reduce((acc, r) => acc + num(r.productos), 0);
    push({
      indicador: "Productos en catálogo BAT (total / con estado activo)",
      empresa: EMPRESA_BAT,
      valor: { total, activos },
      periodo: "Estado actual",
      fuente: "dbo.BMSVMaestraProductos",
      columnas: "Estado",
      consulta_id: "bat_productos_estado",
      confianza: "media-alta: depende de la etiqueta textual del estado",
      observaciones: `Estados encontrados: ${batProductos.map((r) => `${r.estado}=${r.productos}`).join(", ")}.`,
    });
  }

  const batMarcas = byId(results, "bat_marcas_catalogo")?.[0];
  if (batMarcas) {
    push({
      indicador: "Marcas en la maestra de productos BAT",
      empresa: EMPRESA_BAT,
      valor: num(batMarcas.marcas),
      periodo: "Estado actual",
      fuente: "dbo.BMSVMarca",
      columnas: "Cod_Marca",
      consulta_id: "bat_marcas_catalogo",
      confianza:
        "baja para uso público: catálogo interno del ERP, no equivale a aliados del sitio",
      observaciones: "No usar como número de aliados sin validación.",
    });
  }

  // ---- Unidad Alpina (parte de La Nieve) --------------------------------
  const empresaAlp = (sede) => `La Nieve — unidad Alpina (${sede})`;

  const alpSnapshot = byId(results, "alp_clientes_snapshot");
  for (const row of alpSnapshot ?? []) {
    push({
      indicador: "Clientes en la maestra Alpina (corte vigente)",
      empresa: empresaAlp(row.sede),
      valor: num(row.clientes),
      periodo: `Corte ${row.fecha_corte}`,
      fuente:
        row.sede === "Yopal"
          ? "amovil.ClientesALP_YP"
          : "amovil1.ClientesALP_VCIO",
      columnas: "cliente_id, FechaCorte",
      consulta_id: "alp_clientes_snapshot",
      confianza:
        "media-alta: la maestra es una fotografía diaria; incluye clientes de cualquier estado",
      observaciones: `Rutas distintas asignadas en la maestra: ${num(row.rutas)}.`,
    });
  }

  for (const row of byId(results, "alp_ventas_por_anio") ?? []) {
    push({
      indicador: `Facturas y valor antes de IVA ${row.anio} (Alpina)`,
      empresa: empresaAlp(row.sede),
      valor: {
        facturas_distintas: num(row.facturas_distintas),
        valor_antes_iva: num(row.valor_antes_iva),
      },
      periodo: String(row.anio),
      fuente:
        row.sede === "Yopal" ? "amovil.VentasALP_YP" : "amovil1.VentasALP_VCIO",
      columnas: "dtFactura, nbFactura, vlrAntesIva, boAfectaVenta",
      consulta_id: "alp_ventas_por_anio",
      confianza:
        "media: filtrado con boAfectaVenta = 'S'; dato financiero sensible",
      observaciones:
        "2026 es año parcial. La operación Villavicencio inicia en 2026 (sin histórico 2025). No publicar valores monetarios sin aprobación del negocio.",
    });
  }

  for (const row of byId(results, "alp_clientes_con_compras_90d") ?? []) {
    push({
      indicador:
        "Clientes con compras en los últimos 90 días (Alpina, documentos distintos)",
      empresa: empresaAlp(row.sede),
      valor: num(row.clientes_con_compras_90d),
      periodo: "Últimos 90 días",
      fuente:
        row.sede === "Yopal" ? "amovil.VentasALP_YP" : "amovil1.VentasALP_VCIO",
      columnas: "nbDocumento, dtFactura, boAfectaVenta",
      consulta_id: "alp_clientes_con_compras_90d",
      confianza: "alta: es una medida operativa directa",
      observaciones: "Cuenta documentos de identidad distintos de compradores.",
    });
  }

  const alpCobertura = byId(results, "alp_cobertura_territorial_12m");
  if (alpCobertura) {
    for (const sede of ["Yopal", "Villavicencio"]) {
      const rows = alpCobertura.filter(
        (r) => r.sede === sede && r.departamento !== "SIN DEPARTAMENTO"
      );
      const deptos = new Set(rows.map((r) => r.departamento));
      push({
        indicador:
          "Departamentos con compradores Alpina en los últimos 12 meses",
        empresa: empresaAlp(sede),
        valor: deptos.size,
        periodo: "Últimos 12 meses",
        fuente:
          sede === "Yopal" ? "amovil.VentasALP_YP" : "amovil1.VentasALP_VCIO",
        columnas: "txDepartamento, txCiudad, nbDocumento",
        consulta_id: "alp_cobertura_territorial_12m",
        confianza: "media-alta: texto libre en las ventas",
        observaciones: `Municipios distintos con compradores: ${rows.length}. Detalle en department-coverage-current.json.`,
      });
    }
  }

  // ---- Nestlé Ecom (parte de La Nieve) -----------------------------------
  const ecomNestle = byId(results, "ecom_nestle_objetivos")?.[0];
  if (ecomNestle) {
    push({
      indicador: "Nestlé Ecom: rutas vigentes y maestra objetivo",
      empresa: "La Nieve — Nestlé Ecom",
      valor: {
        rutas_ultima_fecha: num(ecomNestle.rutas_ultima_fecha),
        maestra_ultima_fecha: num(ecomNestle.maestra_ultima_fecha),
      },
      periodo: `Última fecha disponible: ${ecomNestle.ultima_fecha}`,
      fuente: "dbo.ObjetivoEfectividad_EcNestle_nv",
      columnas: "FECHA, RUTA, MAESTRA",
      consulta_id: "ecom_nestle_objetivos",
      confianza:
        "media: son objetivos de efectividad, no ventas ni clientes reales",
      observaciones:
        "LIMITACIÓN: no existe tabla de ventas propia de Nestlé Ecom en PORTAL_NIEVE (ECOM_NstlObjetivoMarcos está vacía). Estos valores son la única referencia disponible de la unidad.",
    });
  }

  return stats;
}

function buildCoverage(results, extractedAt) {
  const porDepto = byId(results, "clientes_por_departamento") ?? [];
  const porMunicipio = byId(results, "clientes_por_municipio") ?? [];

  const empresas = {};
  for (const cia of [1, 2]) {
    const empresa = COMPANY_BY_CIA[cia];
    const deptos = porDepto
      .filter((r) => r.cia === cia)
      .map((r) => ({
        departamento: r.departamento,
        clientes_total: num(r.clientes_total),
        clientes_activos: num(r.clientes_activos),
        municipios: porMunicipio.filter(
          (m) =>
            m.cia === cia &&
            m.departamento === r.departamento &&
            m.municipio !== "SIN MUNICIPIO"
        ).length,
      }));
    empresas[empresa] = {
      nivel_geografico: "departamento y municipio (texto libre del ERP)",
      departamentos: deptos,
      municipios: porMunicipio
        .filter((r) => r.cia === cia)
        .map((r) => ({
          departamento: r.departamento,
          municipio: r.municipio,
          clientes_total: num(r.clientes_total),
          clientes_activos: num(r.clientes_activos),
        })),
    };
  }

  const batDeptos = byId(results, "bat_clientes_por_departamento") ?? [];
  const alpCobertura = byId(results, "alp_cobertura_territorial_12m") ?? [];

  const unidadesLaNieve = {
    bat: {
      fuente: "dbo.clientes (Cia 1 + TipoNegocioBAT)",
      nota: "Subconjunto de la cobertura general de La Nieve: estos clientes ya están incluidos en empresas['La Nieve'].",
      departamentos: batDeptos.map((r) => ({
        departamento: r.departamento,
        clientes_total: num(r.clientes_total),
        clientes_activos: num(r.clientes_activos),
      })),
    },
    alpina: {
      fuente:
        "amovil.VentasALP_YP / amovil1.VentasALP_VCIO (compradores últimos 12 meses; boAfectaVenta = 'S')",
      nota: "Operación con esquema propio, NO incluida en dbo.clientes ni en la cobertura de empresas['La Nieve']. Sin campo de estado activo comparable: clientes = compradores del periodo.",
      sedes: Object.fromEntries(
        ["Yopal", "Villavicencio"].map((sede) => [
          sede,
          alpCobertura
            .filter((r) => r.sede === sede)
            .map((r) => ({
              departamento: r.departamento,
              municipio: r.municipio,
              clientes: num(r.clientes),
            })),
        ])
      ),
    },
    nestle_ecom: {
      fuente: "dbo.ObjetivoEfectividad_EcNestle_nv",
      nota: "Sin información territorial disponible: la unidad solo tiene objetivos de efectividad por ruta y no existe tabla de ventas propia en PORTAL_NIEVE.",
    },
  };

  return {
    _aviso:
      "Captura puntual de solo lectura generada manualmente. No es una fuente automática ni permanente para producción. Nombres normalizados (mayúsculas y espacios) únicamente en este archivo; la base no fue modificada.",
    fecha_extraccion: extractedAt,
    fuente: "dbo.clientes (Cia 1 = La Nieve, Cia 2 = Unimarka)",
    interpretacion_activos:
      "clientes_activos usa la hipótesis EstadoCliente = 1; pendiente de confirmación del negocio.",
    empresas,
    unidades_la_nieve: unidadesLaNieve,
  };
}

function toCsv(coverage) {
  const escape = (c) =>
    typeof c === "string" ? `"${c.replaceAll('"', '""')}"` : (c ?? "");
  const lines = [
    "empresa,departamento,municipio,clientes_total,clientes_activos",
  ];
  for (const [empresa, data] of Object.entries(coverage.empresas)) {
    for (const m of data.municipios) {
      lines.push(
        [empresa, m.departamento, m.municipio, m.clientes_total, m.clientes_activos]
          .map(escape)
          .join(",")
      );
    }
  }
  // Unidad BAT: nivel departamental (subconjunto de La Nieve, ver JSON).
  for (const d of coverage.unidades_la_nieve?.bat.departamentos ?? []) {
    lines.push(
      ["La Nieve — BAT", d.departamento, "", d.clientes_total, d.clientes_activos]
        .map(escape)
        .join(",")
    );
  }
  // Unidad Alpina: compradores últimos 12 meses; sin métrica de activos comparable.
  for (const [sede, rows] of Object.entries(
    coverage.unidades_la_nieve?.alpina.sedes ?? {}
  )) {
    for (const m of rows) {
      lines.push(
        [`La Nieve — Alpina (${sede})`, m.departamento, m.municipio, m.clientes, ""]
          .map(escape)
          .join(",")
      );
    }
  }
  return `# Captura puntual de solo lectura (${coverage.fecha_extraccion}). No es fuente automática de producción.\n${lines.join("\n")}\n`;
}

const extractedAt = new Date().toISOString();
console.log(`Extracción puntual iniciada: ${extractedAt}`);

const results = [];
await withConnection(async (pool) => {
  for (const { id, objetivo, sql } of QUERIES) {
    process.stdout.write(`- ${id} ... `);
    try {
      const rows = await runReadOnlyQuery(pool, sql);
      results.push({ id, objetivo, sql, rowCount: rows.length, rows });
      console.log(`${rows.length} filas`);
    } catch (error) {
      results.push({ id, objetivo, sql, error: error.message });
      console.log(`ERROR: ${error.message}`);
    }
  }
});

mkdirSync(outputDir, { recursive: true });

const queryResults = {
  _aviso:
    "Captura puntual de solo lectura generada manualmente. No es una fuente automática ni permanente para producción. Sin datos personales: solo agregados y metadata.",
  fecha_extraccion: extractedAt,
  base_de_datos: "PORTAL_NIEVE (SQL Server)",
  consultas: results.map((r) => ({
    ...r,
    rows: r.rows?.slice(0, MAX_ROWS_IN_RESULTS_FILE),
    truncado: (r.rowCount ?? 0) > MAX_ROWS_IN_RESULTS_FILE,
  })),
};
writeFileSync(
  resolve(outputDir, "query-results-current.json"),
  JSON.stringify(queryResults, null, 2)
);

const statistics = {
  _aviso:
    "Captura puntual de solo lectura generada manualmente. Cifras de referencia interna: requieren validación del negocio antes de publicarse en los sitios.",
  fecha_extraccion: extractedAt,
  base_de_datos: "PORTAL_NIEVE (SQL Server)",
  indicadores: buildStatistics(results, extractedAt),
};
writeFileSync(
  resolve(outputDir, "statistics-current.json"),
  JSON.stringify(statistics, null, 2)
);

const coverage = buildCoverage(results, extractedAt);
writeFileSync(
  resolve(outputDir, "department-coverage-current.json"),
  JSON.stringify(coverage, null, 2)
);
writeFileSync(
  resolve(outputDir, "department-coverage-current.csv"),
  toCsv(coverage)
);

const failed = results.filter((r) => r.error);
console.log(`\nArchivos escritos en ${outputDir}`);
console.log(
  `Consultas: ${results.length - failed.length} correctas, ${failed.length} con error.`
);
if (failed.length > 0) {
  for (const f of failed) console.log(`  * ${f.id}: ${f.error}`);
}
console.log("Conexión cerrada. Fin de la extracción puntual.");
