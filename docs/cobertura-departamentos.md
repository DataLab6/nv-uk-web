# Cobertura territorial por departamento — guía de lectura rápida

> Este documento es un **resumen legible para humanos** de los datos ya extraídos en `data/database-snapshot/department-coverage-current.json` (y descrito técnicamente en `docs/current-database-extraction.md`, que **no fue modificado**). Sirve como referencia para diseñar el mapa visual de cobertura. **No alimenta el sitio web** ni reemplaza las cifras oficiales usadas en la sección de estadísticas (`docs/progress.md`).

- **Fecha de la extracción:** 2026-07-16T20:06:27Z (fotografía puntual, no en vivo).
- **Fuente:** `dbo.clientes` en `PORTAL_NIEVE`. `Cia 1 = La Nieve`, `Cia 2 = Unimarka`.
- **Qué es "cliente":** un tercero (NIT) distinto registrado en el ERP con ese departamento/municipio en su ficha. **"Activo"** usa la hipótesis `EstadoCliente = 1`, **no confirmada** por el negocio (ver advertencia en `current-database-extraction.md`).
- **Departamento y municipio son texto libre** capturado por el ERP (no hay códigos DANE ni coordenadas). Puede haber variantes de escritura del mismo lugar.

---

## 1. Resumen general

| | La Nieve | Unimarka |
| --- | ---: | ---: |
| Departamentos con al menos 1 cliente (excluyendo "sin dato") | **29** | **24** |
| Departamentos oficiales de Colombia cubiertos (de 32, sin contar Bogotá D.C.) | 29 | 23 |
| Clientes con Bogotá D.C. asignado | 17.185 (14.112 activos) | 25.889 (20.339 activos) |
| Clientes sin departamento registrado ("SIN DEPARTAMENTO") | 13.980 | 5.648 |
| Municipios distintos con clientes | 370 | 250 |

**Unión de ambas marcas:** 30 divisiones territoriales con al menos un cliente (29 departamentos + Bogotá D.C.), es decir **todo el país excepto 3 departamentos**: **Chocó, Huila y San Andrés y Providencia** (sin ningún cliente registrado en ninguna de las dos marcas).

> Nota: la cifra "24 departamentos" usada en la sección de estadísticas del sitio (ver `docs/progress.md`) coincide exactamente con el conteo real de Unimarka, pero no con La Nieve (29) ni con la unión de ambas (30). Esto ya quedó documentado como contradicción a resolver.

---

## 2. Lista completa de los 33 departamentos/divisiones de Colombia y su cobertura

Orden alfabético, pensado para marcar directamente sobre un mapa. Columnas: clientes totales / clientes "activos" (hipótesis) / municipios distintos registrados en la base, por marca. `—` significa que la base no tiene ningún cliente con ese departamento.

| Departamento | La Nieve (total / activos / municipios) | Unimarka (total / activos / municipios) | Cobertura |
| --- | ---: | ---: | --- |
| Amazonas | 2 / 0 / 1 | 5 / 1 / 1 | Ambas (marginal) |
| Antioquia | 19 / 8 / 13 | 9 / 7 / 6 | Ambas (marginal) |
| Arauca | 84 / 45 / 4 | 42 / 19 / 4 | Ambas |
| Atlántico | 3 / 3 / 1 | 1 / 1 / 1 | Ambas (marginal) |
| Bogotá D.C.¹ | 17.185 / 14.112 / 1 | 25.889 / 20.339 / 1 | Ambas — fuerte |
| Bolívar | 5 / 4 / 2 | 2 / 2 / 1 | Ambas (marginal) |
| Boyacá | 22.937 / 11.854 / 114 | 2.472 / 1.342 / 102 | Ambas — fuerte |
| Caldas | 12 / 1 / 1 | 5 / 4 / 2 | Ambas (marginal) |
| Caquetá | 1 / 0 / 1 | — | Solo La Nieve (marginal) |
| Casanare | 11.831 / 6.659 / 17 | 5.351 / 1.871 / 18 | Ambas — fuerte |
| Cauca | 3 / 2 / 2 | 1 / 0 / 1 | Ambas (marginal) |
| Cesar | 1.454 / 1.321 / 18 | 6 / 0 / 1 | Ambas (UK marginal) |
| Chocó | — | — | Sin cobertura |
| Córdoba | 2.180 / 2.153 / 23 | — | Solo La Nieve |
| Cundinamarca | 2.374 / 2.084 / 59 | 311 / 151 / 51 | Ambas |
| Guainía | 82 / 35 / 2 | 68 / 42 / 3 | Ambas (marginal) |
| Guaviare | 684 / 337 / 4 | 212 / 84 / 3 | Ambas |
| Huila | — | — | Sin cobertura |
| La Guajira | 961 / 892 / 13 | — | Solo La Nieve |
| Magdalena | 2.191 / 2.049 / 11 | — | Solo La Nieve |
| Meta | 22.939 / 11.370 / 28 | 11.748 / 7.307 / 28 | Ambas — fuerte |
| Nariño | 2 / 2 / 1 | 1 / 1 / 1 | Ambas (marginal) |
| Norte de Santander | — | 1 / 1 / 1 | Solo Unimarka (marginal) |
| Putumayo | 1 / 0 / 1 | — | Solo La Nieve (marginal) |
| Quindío | 1 / 1 / 1 | — | Solo La Nieve (marginal) |
| Risaralda | 2 / 2 / 1 | 2 / 2 / 1 | Ambas (marginal) |
| San Andrés y Providencia | — | — | Sin cobertura |
| Santander | 106 / 64 / 11 | 52 / 32 / 10 | Ambas |
| Sucre | 1.408 / 1.408 / 24 | 2 / 0 / 1 | Ambas (UK marginal) |
| Tolima | 7 / 0 / 1 | 2 / 0 / 1 | Ambas (marginal) |
| Valle del Cauca | 13 / 5 / 5 | 6 / 3 / 3 | Ambas (marginal) |
| Vaupés | 45 / 17 / 3 | 36 / 15 / 3 | Ambas |
| Vichada | 147 / 98 / 7 | 117 / 78 / 6 | Ambas |

¹ Bogotá D.C. es Distrito Capital, no un departamento en sentido estricto; en la fuente aparece como una categoría propia dentro de `f_desc_depto`. Se incluye en la tabla porque el mapa de cobertura normalmente la representa.

**Sin ningún cliente en ninguna marca (3):** Chocó, Huila, San Andrés y Providencia.

---

## 3. Los 10 departamentos con más clientes (para jerarquía visual del mapa)

### La Nieve

| # | Departamento | Clientes totales | Clientes activos | Municipios |
| --- | --- | ---: | ---: | ---: |
| 1 | Meta | 22.939 | 11.370 | 28 |
| 2 | Boyacá | 22.937 | 11.854 | 114 |
| 3 | Bogotá D.C. | 17.185 | 14.112 | 1 |
| 4 | Casanare | 11.831 | 6.659 | 17 |
| 5 | Cundinamarca | 2.374 | 2.084 | 59 |
| 6 | Magdalena | 2.191 | 2.049 | 11 |
| 7 | Córdoba | 2.180 | 2.153 | 23 |
| 8 | Cesar | 1.454 | 1.321 | 18 |
| 9 | Sucre | 1.408 | 1.408 | 24 |
| 10 | La Guajira | 961 | 892 | 13 |

### Unimarka

| # | Departamento | Clientes totales | Clientes activos | Municipios |
| --- | --- | ---: | ---: | ---: |
| 1 | Bogotá D.C. | 25.889 | 20.339 | 1 |
| 2 | Meta | 11.748 | 7.307 | 28 |
| 3 | Casanare | 5.351 | 1.871 | 18 |
| 4 | Boyacá | 2.472 | 1.342 | 102 |
| 5 | Cundinamarca | 311 | 151 | 51 |
| 6 | Guaviare | 212 | 84 | 3 |
| 7 | Vichada | 117 | 78 | 6 |
| 8 | Guainía | 68 | 42 | 3 |
| 9 | Santander | 52 | 32 | 10 |
| 10 | Arauca | 42 | 19 | 4 |

---

## 4. "SIN DEPARTAMENTO" (dato faltante, no un lugar real)

- La Nieve: 13.980 clientes sin departamento registrado (0 marcados como activos).
- Unimarka: 5.648 clientes sin departamento registrado (2 marcados como activos).

No se trata de un departamento; es un vacío/valor nulo en el campo `f_desc_depto` del ERP. No debe representarse en el mapa como territorio.

---

## 5. Limitaciones a tener en cuenta para el mapa

- **Texto libre, no catálogo DANE:** los 114 "municipios" registrados para Boyacá en La Nieve, por ejemplo, casi seguramente incluyen variantes de escritura del mismo municipio (el detalle municipio a municipio está en el JSON original, no se repite aquí por ser 622 filas).
- **Bogotá D.C.** se maneja como un departamento en la fuente, aunque administrativamente es un distrito capital.
- **"Activos"** depende de una hipótesis de negocio no confirmada (`EstadoCliente = 1`); úsese con cautela si el mapa distingue cobertura "activa" vs. histórica.
- Estas cifras **no son las que aparecen en la sección de estadísticas del sitio** (24 departamentos / 85% del territorio, suministradas directamente por la empresa). Son datos internos del ERP, útiles solo como referencia de diseño para el mapa, no como fuente oficial de contenido publicado.
- Los datos son del 2026-07-16; si se necesita una fotografía más reciente, hay que volver a ejecutar el script descrito en `docs/current-database-extraction.md` (sección "Cómo volver a ejecutar").
