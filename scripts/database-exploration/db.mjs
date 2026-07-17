/**
 * Conexión compartida por las herramientas manuales de exploración.
 *
 * - Credenciales EXCLUSIVAMENTE por variables de entorno; nunca en código.
 * - Solo lectura: `assertReadOnly` rechaza cualquier sentencia que no empiece
 *   por SELECT/WITH, como defensa adicional al uso disciplinado.
 * - La conexión se abre al ejecutar manualmente y se cierra al terminar.
 * - Este módulo no debe ser importado por la aplicación web.
 */
import sql from "mssql";

export function readConfigFromEnv() {
  const {
    PORTAL_DB_SERVER,
    PORTAL_DB_PORT,
    PORTAL_DB_DATABASE,
    PORTAL_DB_USER,
    PORTAL_DB_PASSWORD,
    PORTAL_DB_TRUST_CERT,
  } = process.env;

  const missing = [
    ["PORTAL_DB_SERVER", PORTAL_DB_SERVER],
    ["PORTAL_DB_DATABASE", PORTAL_DB_DATABASE],
    ["PORTAL_DB_USER", PORTAL_DB_USER],
    ["PORTAL_DB_PASSWORD", PORTAL_DB_PASSWORD],
  ]
    .filter(([, value]) => !value)
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Faltan variables de entorno: ${missing.join(", ")}. ` +
        "Defínelas solo para la ejecución manual; no las guardes en archivos versionados."
    );
  }

  return {
    server: PORTAL_DB_SERVER,
    port: Number(PORTAL_DB_PORT ?? 1433),
    database: PORTAL_DB_DATABASE,
    user: PORTAL_DB_USER,
    password: PORTAL_DB_PASSWORD,
    connectionTimeout: 15_000,
    requestTimeout: 120_000,
    pool: { max: 1, min: 0 },
    options: {
      // El cifrado permanece activo. trustServerCertificate solo omite la
      // validación de CA (habitual con certificados autofirmados corporativos)
      // y puede desactivarse con PORTAL_DB_TRUST_CERT=false.
      encrypt: true,
      trustServerCertificate: PORTAL_DB_TRUST_CERT !== "false",
      readOnlyIntent: true,
    },
  };
}

export function assertReadOnly(query) {
  const normalized = query.trim().replace(/^﻿/, "").toLowerCase();
  if (!normalized.startsWith("select") && !normalized.startsWith("with")) {
    throw new Error(
      "Consulta rechazada: solo se permiten sentencias SELECT/WITH de lectura."
    );
  }
  const forbidden =
    /\b(insert|update|delete|merge|drop|alter|truncate|create|exec|execute|grant|revoke|into\s+#?\w)/i;
  if (forbidden.test(normalized)) {
    throw new Error(
      "Consulta rechazada: contiene palabras clave de escritura o ejecución."
    );
  }
}

export async function withConnection(run) {
  const pool = await sql.connect(readConfigFromEnv());
  try {
    return await run(pool);
  } finally {
    await pool.close();
  }
}

export async function runReadOnlyQuery(pool, query) {
  assertReadOnly(query);
  const result = await pool.request().query(query);
  return result.recordset ?? [];
}
