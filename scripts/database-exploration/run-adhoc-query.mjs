/**
 * Ejecutor manual de UNA consulta de solo lectura, para exploración puntual.
 *
 * Uso:
 *   node run-adhoc-query.mjs ruta/a/consulta.sql
 *
 * - Solo acepta SELECT/WITH (ver assertReadOnly en db.mjs).
 * - Imprime el resultado como JSON y termina cerrando la conexión.
 * - No forma parte de la aplicación web ni de ningún flujo automático.
 */
import { readFileSync } from "node:fs";
import { runReadOnlyQuery, withConnection } from "./db.mjs";

const sqlPath = process.argv[2];
if (!sqlPath) {
  console.error("Uso: node run-adhoc-query.mjs <archivo.sql>");
  process.exit(1);
}

const query = readFileSync(sqlPath, "utf8");

try {
  const rows = await withConnection((pool) => runReadOnlyQuery(pool, query));
  console.log(JSON.stringify({ rowCount: rows.length, rows }, null, 2));
} catch (error) {
  console.error("ERROR:", error.message);
  process.exit(1);
}
