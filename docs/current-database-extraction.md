# Extracción puntual de datos actuales — PORTAL_NIEVE

> **Naturaleza de este trabajo:** extracción **manual, puntual y de solo lectura**. Primera ejecución: 2026-07-16. Segunda ejecución: **2026-07-17**, ampliada con las unidades de negocio de La Nieve (**BAT, Alpina y Nestlé Ecom**) que la primera pasada no cubría. No existe ninguna integración con los sitios web. Los archivos generados son una fotografía de referencia, no una fuente de datos de producción.

## Objetivo

Conocer qué datos reales existen hoy en la base `PORTAL_NIEVE` que puedan servir como referencia para dos secciones de los sitios corporativos de La Nieve y Unimarka:

1. La sección de **estadísticas** (actualmente usa cifras demostrativas marcadas como ejemplo en `site.config.ts`).
2. El **mapa interactivo de cobertura** (actualmente usa una lista provisional de departamentos marcada como demostración).

## Alcance

Explícitamente:

- **No** existe integración con la página: ningún componente, página ni configuración del sitio consume estos datos.
- **No** se creó ninguna API ni endpoint.
- **No** se creó ninguna sincronización ni proceso recurrente; no quedó nada ejecutándose.
- **No** se modificó la base de datos: solo se ejecutaron consultas `SELECT` (el módulo de conexión rechaza cualquier otra sentencia como defensa adicional).
- **No** se implementó autenticación de Microsoft, OAuth ni Entra ID; la conexión usa autenticación SQL clásica.
- **No** se exportaron datos personales: solo agregados, conteos y nombres geográficos/administrativos.

## Conexión utilizada

- Motor: **SQL Server** (host `gravity.lanieve.co`, puerto 1433, base `PORTAL_NIEVE`).
- Driver: **`mssql` 11.x** (Node.js, driver Tedious). El proyecto no tenía ningún driver de base de datos (es un sitio estático), así que se instaló de forma **aislada** en `scripts/database-exploration/` con su propio `package.json`; esa carpeta **no** pertenece a los workspaces del monorepo (`apps/*`, `packages/*`), por lo que la aplicación web no puede importarlo ni se ve afectada en `dev`/`build`.
- Ruta del script principal: `scripts/database-exploration/extract-current-statistics.mjs`.
- Módulos de apoyo: `scripts/database-exploration/db.mjs` (conexión + guardia de solo lectura) y `scripts/database-exploration/run-adhoc-query.mjs` (ejecutor manual de una consulta SELECT desde archivo).
- Variables de entorno (definidas solo en la sesión de ejecución manual; **no** están guardadas en ningún archivo):
  - `PORTAL_DB_SERVER`, `PORTAL_DB_PORT` (opcional, por defecto 1433), `PORTAL_DB_DATABASE`, `PORTAL_DB_USER`, `PORTAL_DB_PASSWORD`.
  - `PORTAL_DB_TRUST_CERT` (opcional): el cifrado TLS permanece activo; por defecto se omite la validación de CA (`trustServerCertificate: true`, habitual con certificados autofirmados corporativos). Poner `false` para exigir CA válida.
- La conexión usa `readOnlyIntent`, pool de una sola conexión y se cierra al terminar.

## Estado de la conexión

- **Exitosa.** Primera ejecución: **2026-07-16T20:06:27Z** (19/19 consultas correctas). Segunda ejecución: **2026-07-17T13:53:23Z** (**31/31** consultas correctas, incluyendo lecturas sobre los esquemas `amovil` y `amovil1` de Alpina).
- Sin errores de permisos detectados (lectura sobre `dbo`, `amovil`, `amovil1`, `sys` e `INFORMATION_SCHEMA`).

## Fuentes encontradas

Convención confirmada: sufijos `NV`/`_nv` = La Nieve, `UK`/`_uk` = Unimarka; `dbo.clientes.Cia`: **1 = La Nieve, 2 = Unimarka** (verificado con `dbo.centros_operativos`, que incluye "MINIMERCADO ESPECIALIZADO LA NIEVE" bajo cia 1, y con las magnitudes de cada tabla; existen cias 3–6 pequeñas, aparentemente otras figuras: 303, 179, 4 y 870 terceros).

Relevantes para estadísticas y mapa:

| Fuente | Filas aprox. | Uso potencial |
| --- | --- | --- |
| `dbo.clientes` | 160.563 | Clientes por compañía, estado y **departamento/municipio** (`f_desc_depto`, `f_desc_ciudad`). Contiene PII → solo agregados. |
| `dbo.VentasMSV_NV` / `dbo.VentasMSV_UK` | 12,0 M / 4,9 M | Ventas por fecha, documento, cliente. Vigentes al día (máx. fecha = hoy). |
| `dbo.RutaClienteActivos` | 69.472 | Rutas activas (vendedor) y clientes en ruta; ciudad en texto, sin departamento. |
| `dbo.pedidos_facturas` | 3,7 M | Pedidos y facturas con fecha y compañía. |
| `dbo.Bodegas` | 160 | Bodegas por compañía (posibles bodegas lógicas del ERP). |
| `dbo.centros_operativos` | 29 | Sedes/centros por compañía y regional (útil también para mapa de sedes). |
| `dbo.NMSVMaestraProductos` / `dbo.UMSVMaestraProductos` | 19.791 / 13.133 | Catálogo de productos con estado. |
| `dbo.NMSVMarca` / `dbo.UMSVMarca` | 612 / 386 | Marcas del catálogo interno (no equivale a "aliados"). |
| `dbo.NMSVCasasComerciales` / `dbo.UMSVCasasComerciales` | 127 / 93 | Casas comerciales (más cercano a "aliados", pero sin depurar). |
| `dbo.cartogramanv/uk`, `dbo.nv/uk_cartograma_comercial` | 157–351 | Estructura comercial (rutas, zonas, supervisores); todo varchar importado de SharePoint. |
| Esquema `extractor` (vistas `GBIvw_*`) | — | Vistas por casa comercial con `*_municipios`; confirma la dimensión municipal en el ecosistema BI. |

Fuentes de las **unidades de negocio de La Nieve** (añadidas el 2026-07-17):

| Fuente | Filas aprox. | Uso potencial |
| --- | --- | --- |
| `dbo.VentasBAT_NV` | 9,0 M | Ventas de la unidad **BAT** (mismo esquema que `VentasMSV_NV`); vigente al día. |
| `dbo.clientes.TipoNegocioBAT` | 75.682 terceros (Cia 1) | Marca los clientes BAT dentro de la maestra general → cobertura territorial BAT como subconjunto de La Nieve. |
| `dbo.BMSVMaestraProductos` / `dbo.BMSVMarca` | 1.104 / 21 | Catálogo de productos y marcas BAT. |
| `amovil.VentasALP_YP` / `amovil1.VentasALP_VCIO` | 7,4 M / 3,0 M | Ventas de la unidad **Alpina** (sedes Yopal y Villavicencio); traen `txDepartamento`/`txCiudad`. `boAfectaVenta = 'S'` marca las líneas que afectan venta. Contienen PII → solo agregados. |
| `amovil.ClientesALP_YP` / `amovil1.ClientesALP_VCIO` | 3.720 / 7.987 (corte vigente) | Maestra de clientes Alpina, fotografía diaria (`FechaCorte`); sin columna de departamento. Contiene PII → solo agregados. |
| `dbo.ObjetivoEfectividad_EcNestle_nv` | 339 | **Nestlé Ecom**: objetivos de efectividad por ruta (única fuente de la unidad). |
| `dbo.ECOM_NstlObjetivoMarcos` | 0 | Vacía a la fecha; confirma que Nestlé Ecom no tiene ventas propias en esta base. |

## Consultas probadas

Las 31 consultas (19 originales + 12 de las unidades BAT/Alpina/Nestlé Ecom), con su objetivo, SQL completo y resultado, quedaron registradas en `data/database-snapshot/query-results-current.json`. Resumen de las principales:

| Id | Objetivo | Resultado resumido | Advertencias |
| --- | --- | --- | --- |
| `meta_tablas` / `meta_vistas` | Inventario | 188 tablas, 189 vistas | — |
| `centros_operativos` | Mapear `cia` → empresa; sedes | 29 filas; cia 1 = La Nieve (19 CO), cia 2 = Unimarka (10 CO) | Dos CO comparten descripción "BOGOTA" |
| `clientes_resumen` | Filas vs terceros distintos | NV: 106.172 filas / 100.485 terceros; UK: 53.035 / 51.867 | La tabla tiene una fila por sucursal → usar `COUNT(DISTINCT IdTercero)` |
| `clientes_estado` | Semántica de `EstadoCliente` | Valores 1, 0 y NULL (NV: 57.616 / 34.577 / 13.979) | Hipótesis 1 = activo **no confirmada** por el negocio |
| `clientes_por_departamento` | Cobertura por departamento | 55 grupos (30 NV + 25 UK, incluye "SIN DEPARTAMENTO") | Texto libre; "BOGOTÁ" aparece como departamento |
| `clientes_por_municipio` | Granularidad municipal | 622 grupos agregados | Texto libre; posibles variantes del mismo municipio |
| `rutas_activas` | Rutas y clientes en ruta | NV: 217 rutas / 40.996 clientes en ruta; UK: 77 / 28.520 | Asume 1 código de vendedor = 1 ruta |
| `bodegas` | Bodegas por cia | NV: 126; UK: 34 | Posibles bodegas lógicas, no sedes físicas |
| `productos_*_estado` | Productos activos | NV: 19.791; UK: 13.133 (100 % "Activo") | Solo estado textual |
| `marcas_catalogo` | Marcas maestra | NV: 611; UK: 385 | Catálogo interno; **no** usar como aliados |
| `casas_comerciales` | Aproximación a aliados | NV: 127; UK: 93 | Muy superior a los aliados publicados (16/13); requiere depuración |
| `ventas_rango_fechas` | Vigencia de ventas | 2020-01 → **2026-07-16** en ambas | Datos al día |
| `ventas_*_por_anio` | Ventas 2025/2026 | Ver tabla de indicadores | Incluye todos los tipos de documento (con devoluciones) |
| `ventas_nv_tipos_documento_2026` | Facturas vs devoluciones | 48 tipos de documento (ETV, ETY, EMV, ETD…) | La semántica de cada tipo requiere validación del negocio |
| `clientes_con_compras_90d` | Actividad real | NV: 11.625 NIT; UK: 10.568 NIT | Contrasta fuertemente con EstadoCliente = 1 (ver abajo) |
| `pedidos_por_anio` | Pedidos 2025/2026 | Ver tabla | Comparadas filas vs distintos (hay duplicidad por remisiones) |
| `bat_ventas_rango_fechas` / `bat_ventas_por_anio` | Vigencia y ventas BAT | 2020-01 → 2026-07-17; 2025: 286.721 docs; 2026 YTD: 297.666 docs | Incluye todos los tipos de documento; valores sensibles |
| `bat_clientes_marcados` / `bat_clientes_con_compras_90d` | Clientes BAT | 75.682 marcados (Cia 1); 29.978 con compras en 90 días | El marcado también aparece en Cia 2 (7.013) y Cia 6 (197) — anomalía a aclarar |
| `bat_clientes_por_departamento` | Cobertura BAT | 27 departamentos (+ grupo "SIN DEPARTAMENTO") | Subconjunto de la cobertura NV |
| `bat_productos_estado` / `bat_marcas_catalogo` | Catálogo BAT | 1.103 productos activos; 21 marcas | Catálogo interno |
| `alp_clientes_snapshot` | Maestra Alpina | Yopal: 3.720 clientes / 8 rutas; Villavicencio: 7.987 / 32 (corte 2026-07-17) | Fotografía diaria; incluye cualquier estado |
| `alp_ventas_por_anio` | Ventas Alpina | Yopal 2025: 95.739 facturas; 2026 YTD: 64.860. Villavicencio 2026 YTD: 147.306 | Filtrado `boAfectaVenta = 'S'`; Villavicencio inicia 2026-01 (sin histórico 2025) |
| `alp_clientes_con_compras_90d` | Actividad Alpina | Yopal: 2.667; Villavicencio: 6.327 documentos distintos | Medida operativa directa |
| `alp_cobertura_territorial_12m` | Cobertura Alpina | Yopal: 6 deptos / 41 municipios; Villavicencio: 12 / 56 | Desde las ventas (la maestra no trae departamento) |
| `ecom_nestle_objetivos` | Nestlé Ecom | Última fecha 2026-07-01: 17 rutas, maestra 6.093 | Son objetivos, no ventas; única fuente de la unidad |

**Diferencias entre variantes (documentadas):**

- *Filas vs distintos en `clientes`*: 106.172 filas ≠ 100.485 terceros (NV) porque hay una fila por sucursal. Todos los indicadores exportados usan terceros distintos.
- *"Clientes activos"*: `EstadoCliente = 1` da 57.616 (NV, contando filas/sucursales), mientras que "con compras en 90 días" da 11.625 NIT distintos. Además de medir unidades distintas (sucursal vs NIT), sugieren definiciones de "activo" muy diferentes. **Ninguna cifra debe publicarse sin que el negocio defina el criterio.**
- *Pedidos*: en `pedidos_facturas` 2026 (NV) hay 631.294 filas vs 553.378 pedidos distintos vs 419.354 facturas distintas → hay múltiples remisiones por pedido; se exportó el conteo de pedidos distintos.

## Estadísticas actuales obtenidas

Extraídas el 2026-07-16 (detalle completo con fuente, columnas y observaciones en `data/database-snapshot/statistics-current.json`):

| Indicador | La Nieve | Unimarka | Periodo | Fuente | Confianza |
| --- | --- | --- | --- | --- | --- |
| Clientes registrados (terceros distintos) | 100.485 | 51.867 | Histórico | `dbo.clientes` | Alta (conteo) / media (interpretación) |
| Clientes con EstadoCliente = 1 | 57.616 | 31.826 | Actual | `dbo.clientes` | Media (semántica sin confirmar) |
| Clientes con compras en 90 días (NIT) | 11.625 | 10.568 | 90 días | `VentasMSV_*` | Alta |
| Departamentos con clientes | 29 | 24 | Histórico | `dbo.clientes` | Media-alta (texto libre) |
| Departamentos con clientes activos | 25 | 20 | Actual | `dbo.clientes` | Media |
| Municipios con clientes | 370 | 250 | Histórico | `dbo.clientes` | Media (texto libre) |
| Rutas comerciales activas | 217 | 77 | Actual | `RutaClienteActivos` | Media-alta |
| Clientes asignados a ruta | 40.996 | 28.520 | Actual | `RutaClienteActivos` | Media-alta |
| Bodegas registradas | 126 | 34 | Actual | `dbo.Bodegas` | Media |
| Productos en catálogo (activos) | 19.791 | 13.133 | Actual | Maestras de productos | Media-alta |
| Marcas en maestra (interno) | 611 | 385 | Actual | `NMSVMarca`/`UMSVMarca` | Baja para uso público |
| Casas comerciales | 127 | 93 | Actual | `*CasasComerciales` | Baja-media |
| Documentos de venta 2025 | 347.119 | 202.606 | 2025 | `VentasMSV_*` | Media |
| Documentos de venta 2026 (parcial) | 185.031 | 107.287 | 2026 YTD | `VentasMSV_*` | Media |
| Valor subtotal 2025 (COP, sensible) | ≈ 97.067 M | ≈ 77.400 M | 2025 | `VentasMSV_*` | Media; **no publicar sin aprobación** |
| Pedidos distintos 2025 | 750.097 | 233.555 | 2025 | `pedidos_facturas` | Media-alta |
| Pedidos distintos 2026 (parcial) | 553.378 | 101.308 | 2026 YTD | `pedidos_facturas` | Media-alta |
| Fecha máxima de ventas | 2026-07-16 | 2026-07-16 | Actual | `VentasMSV_*` | Alta |

Ningún dato se declara definitivo: cada indicador lleva su nivel de confianza y observaciones en el JSON.

### Unidades de negocio de La Nieve (añadidas el 2026-07-17)

BAT, Alpina y Nestlé Ecom hacen parte de La Nieve pero operan con fuentes separadas; sus cifras **no** están sumadas a las de la tabla anterior (salvo la cobertura BAT, que es un subconjunto de `dbo.clientes` Cia 1):

| Indicador | Valor | Periodo | Fuente | Confianza |
| --- | --- | --- | --- | --- |
| BAT — clientes marcados (TipoNegocioBAT, Cia 1) | 75.682 | Actual | `dbo.clientes` | Media-alta |
| BAT — clientes con compras en 90 días (NIT) | 29.978 | 90 días | `VentasBAT_NV` | Alta |
| BAT — documentos de venta 2025 / 2026 YTD | 286.721 / 297.666 | 2025–2026 | `VentasBAT_NV` | Media |
| BAT — valor subtotal 2025 (COP, sensible) | ≈ 122.881 M | 2025 | `VentasBAT_NV` | Media; **no publicar sin aprobación** |
| BAT — departamentos con clientes | 27 | Histórico | `dbo.clientes` | Media-alta |
| BAT — productos activos / marcas | 1.103 / 21 | Actual | `BMSV*` | Media-alta / baja para uso público |
| Alpina Yopal — clientes maestra / rutas | 3.720 / 8 | Corte 2026-07-17 | `amovil.ClientesALP_YP` | Media-alta |
| Alpina Villavicencio — clientes maestra / rutas | 7.987 / 32 | Corte 2026-07-17 | `amovil1.ClientesALP_VCIO` | Media-alta |
| Alpina Yopal — facturas 2025 / 2026 YTD | 95.739 / 64.860 | 2025–2026 | `amovil.VentasALP_YP` | Media |
| Alpina Villavicencio — facturas 2026 YTD | 147.306 | 2026 | `amovil1.VentasALP_VCIO` | Media (opera desde 2026-01) |
| Alpina — clientes con compras 90 días | Yopal 2.667 / Vcio 6.327 | 90 días | Ventas ALP | Alta |
| Alpina — cobertura 12 meses | Yopal 6 deptos / 41 mpios; Vcio 12 / 56 | 12 meses | Ventas ALP | Media-alta |
| Nestlé Ecom — rutas vigentes / maestra objetivo | 17 / 6.093 | Al 2026-07-01 | `ObjetivoEfectividad_EcNestle_nv` | Media (son objetivos, no ventas) |

**Limitación Nestlé Ecom:** no existe tabla de ventas ni de clientes propia de la unidad en `PORTAL_NIEVE` (`ECOM_NstlObjetivoMarcos` está vacía). Solo hay objetivos de efectividad por ruta. Si la unidad tiene ventas registradas en otro sistema o dentro de `VentasMSV_NV` bajo algún CO/canal específico, el negocio debe indicarlo.

**Anomalía documentada:** el marcado `TipoNegocioBAT` también aparece en clientes de Cia 2 (7.013) y Cia 6 (197); el indicador BAT usa solo Cia 1. Requiere aclaración del negocio.

## Datos territoriales obtenidos

- **Nivel geográfico disponible:** departamento (`f_desc_depto`) y municipio/ciudad (`f_desc_ciudad`) directamente en `dbo.clientes`, en texto libre. No hay códigos DANE visibles en esta tabla, ni coordenadas.
- **Departamentos encontrados:** 29 con clientes en La Nieve y 24 en Unimarka. Principales (clientes totales / activos):
  - La Nieve: Meta (22.939/11.370), Boyacá (22.937/11.854), Bogotá (17.185/14.112), Casanare (11.831/6.659), Cundinamarca, Magdalena, Córdoba, Cesar, Sucre, La Guajira, Guaviare…
  - Unimarka: Bogotá (25.889/20.339), Meta (11.748/7.307), Casanare (5.351/1.871), Boyacá (2.472/1.342), Cundinamarca, Guaviare, Vichada, Guainía, Santander, Arauca, Vaupés…
- **Municipios encontrados:** 370 (La Nieve) y 250 (Unimarka) nombres distintos, con conteos por municipio en los archivos exportados.
- **Campos disponibles:** por cliente existen también barrio, dirección y teléfono (**PII, no exportados**). `RutaClienteActivos` aporta ciudad (sin departamento). `centros_operativos` aporta las 29 sedes con regional.
- **Limitaciones:**
  - Campos de texto libre: puede haber variantes ortográficas del mismo municipio (los 114 "municipios" de Boyacá NV incluyen probablemente variantes); la normalización aplicada (mayúsculas/espacios) se hizo **solo en los archivos exportados**, la base no se tocó.
  - "BOGOTÁ" figura como departamento (es Distrito Capital); decidir cómo tratarlo en el mapa.
  - 13.980 filas NV y 5.648 UK quedaron en "SIN DEPARTAMENTO" (campo vacío o nulo).
  - No se encontró tabla de correspondencia municipio→departamento independiente; la relación viene dada por las dos columnas de `clientes`. No se usaron servicios externos ni se inventaron correspondencias.
- **Unidades de La Nieve (2026-07-17):**
  - BAT: cobertura departamental disponible como subconjunto de `dbo.clientes` (Cia 1 + `TipoNegocioBAT`): 27 departamentos; incluida en el JSON/CSV bajo `La Nieve — BAT`.
  - Alpina: la maestra `ClientesALP_*` no trae departamento; la cobertura se derivó de las **ventas de los últimos 12 meses** (`txDepartamento`/`txCiudad`): Yopal 6 departamentos / 41 municipios, Villavicencio 12 / 56. Ojo: los nombres vienen sin tilde ("BOYACA") a diferencia de `dbo.clientes` ("BOYACÁ"); al cruzar ambas fuentes hay que normalizar acentos.
  - Nestlé Ecom: sin información territorial disponible.

## Archivos exportados

Carpeta: `data/database-snapshot/` (regenerados el **2026-07-17T13:53:23Z**; todos incluyen la fecha de extracción y el aviso de captura puntual):

| Archivo | Formato | Contenido |
| --- | --- | --- |
| `statistics-current.json` | JSON | **49 indicadores** (31 originales + 18 de las unidades BAT/Alpina/Nestlé Ecom) con valor, periodo, fuente, columnas, consulta, confianza y observaciones. |
| `department-coverage-current.json` | JSON | Por empresa: departamentos (clientes totales/activos, nº de municipios) y detalle municipal; nueva clave `unidades_la_nieve` con la cobertura BAT (departamental) y Alpina (departamento/municipio por sede) y la nota de Nestlé Ecom. |
| `department-coverage-current.csv` | CSV | Detalle plano empresa/departamento/municipio/clientes_total/clientes_activos; incluye filas `La Nieve — BAT` (nivel departamental, municipio vacío) y `La Nieve — Alpina (sede)` (sin métrica de activos, columna vacía). |
| `query-results-current.json` | JSON | Las **31 consultas** con objetivo, SQL y resultados (limitados a 1.000 filas por consulta). |

Sin datos personales: únicamente agregados, nombres geográficos y descripciones administrativas.

## Advertencia de uso

**Estos archivos son una fotografía puntual del 2026-07-16.** No constituyen una fuente automática ni permanente para producción, no están conectados a ningún componente del sitio y no deben publicarse tal cual: cada cifra requiere validación y aprobación del negocio (especialmente definición de "cliente activo", semántica de tipos de documento de venta, valores monetarios y depuración de nombres territoriales).

## Cómo volver a ejecutar

```bash
cd scripts/database-exploration
npm install   # solo la primera vez; instala mssql de forma aislada

PORTAL_DB_SERVER=<host> \
PORTAL_DB_DATABASE=<base> \
PORTAL_DB_USER=<usuario> \
PORTAL_DB_PASSWORD=<contraseña> \
node extract-current-statistics.mjs
```

- Variables necesarias: las cuatro anteriores (más `PORTAL_DB_PORT` y `PORTAL_DB_TRUST_CERT` opcionales). Nunca guardarlas en archivos versionados.
- Archivos generados: los cuatro de `data/database-snapshot/` (se sobrescriben con una nueva fecha de extracción).
- Comportamiento esperado: imprime el progreso de las 31 consultas, escribe los archivos, cierra la conexión y termina. Si una consulta falla, registra el error en el JSON y continúa; si la conexión falla, termina con el mensaje de error exacto sin modificar nada.
- Consulta suelta de solo lectura: `node run-adhoc-query.mjs <archivo.sql>` (solo acepta SELECT/WITH).
