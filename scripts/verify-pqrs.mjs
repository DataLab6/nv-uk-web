import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import ts from "typescript";

// Isolated modules: no environment files, real email calls or database access.
const sent = [];
let rejectEmail = false;
const cache = new Map();
function load(file) {
  if (cache.has(file)) return cache.get(file);
  const loaded = { exports: {} };
  const source = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  vm.runInNewContext(source, {
    module: loaded,
    exports: loaded.exports,
    require: (name) => {
      if (name === "node:fs") return { existsSync: () => false };
      if (name === "node:path") return path;
      if (name === "@next/env")
        return {
          loadEnvConfig: () => {
            throw Error("Unexpected env read");
          },
        };
      return load(path.resolve(path.dirname(file), `${name}.ts`));
    },
    process: {
      cwd: () => process.cwd(),
      env: {
        RESEND_API_KEY: "test",
        TURNSTILE_SECRET_KEY: "test",
        NODE_ENV: "production",
      },
    },
    Request,
    Response,
    FormData,
    File,
    Buffer,
    URL,
    URLSearchParams,
    console: { error() {} },
    fetch: async (url, options) => {
      if (url.includes("siteverify"))
        return Response.json({
          success:
            new URLSearchParams(options.body).get("response") === "valid-token",
        });
      assert.equal(url, "https://api.resend.com/emails");
      if (rejectEmail) return new Response("Rejected", { status: 500 });
      sent.push(JSON.parse(options.body));
      return Response.json({ id: "email-id-not-a-radicado" });
    },
  });
  cache.set(file, loaded.exports);
  return loaded.exports;
}
const root = path.resolve("packages/site-kit/src");
const { handlePqrsRequest } = load(path.join(root, "server/forms.ts"));
const { validatePqrsFields } = load(path.join(root, "lib/formValidation.ts"));
const { PQRS_REQUEST_TYPES, PQRS_RELATIONSHIPS } = load(
  path.join(root, "config/pqrsFilingContent.ts")
);
const base = {
  tipoSolicitud: "Petición",
  relacion: "Cliente",
  causal: "Información",
  tipoSolicitante: "natural",
  nombres: "Ana",
  apellidos: "Perez",
  tipoDocumento: "Cédula de ciudadanía",
  numeroDocumento: "1234",
  email: "ana@example.com",
  emailConfirm: "ana@example.com",
  asunto: "Consulta",
  hechos: "Relato <script>no ejecutar</script>",
  aceptaTratamiento: "true",
  aceptaRespuestaCorreo: "true",
  aceptaVeracidad: "true",
  turnstileToken: "valid-token",
};
async function submit(values, brand = "la-nieve", files = []) {
  const body = new FormData();
  for (const [key, value] of Object.entries(values)) body.set(key, value);
  for (const file of files) body.append("attachments", file);
  return handlePqrsRequest(
    new Request("https://example.com/api/forms/pqrs", { method: "POST", body }),
    brand
  );
}
let cases = 0;
for (const brand of ["la-nieve", "unimarka"]) {
  for (const type of PQRS_REQUEST_TYPES)
    for (const relacion of PQRS_RELATIONSHIPS) {
      const values = {
        ...base,
        tipoSolicitud: type.title,
        relacion,
        repNombres: "INACTIVE",
      };
      assert.equal(Object.keys(validatePqrsFields(values)).length, 0);
      const response = await submit(values, brand);
      assert.equal(response.status, 200);
      assert.equal((await response.json()).radicado, undefined);
      const email = sent.at(-1);
      assert.equal(email.reply_to, base.email);
      assert.ok(email.html.includes(relacion));
      assert.ok(email.html.includes("Requerimiento explicado"));
      assert.ok(email.html.includes("&lt;script&gt;"));
      assert.ok(!email.html.includes("INACTIVE"));
      assert.ok(!email.html.includes("Objeto de la solicitud"));
      cases++;
    }
}
for (const patch of [
  { tipoSolicitud: "Sugerencias" },
  { relacion: "Inventado" },
  { causal: "" },
  { causal: "x".repeat(201) },
  { hechos: "" },
  { hechos: "x".repeat(4001) },
  { asunto: "x".repeat(151) },
  { emailConfirm: "otra@example.com" },
  { aceptaVeracidad: "false" },
  { numeroDocumento: "abc" },
  { nombres: "123" },
  { telefono: "1".repeat(16) },
  { tipoSolicitante: "inventado" },
  { tipoDocumento: "inventado" },
]) {
  const values = { ...base, ...patch };
  assert.ok(Object.keys(validatePqrsFields(values)).length > 0);
  const before = sent.length;
  assert.equal((await submit(values)).status, 400);
  assert.equal(sent.length, before);
  cases++;
}
const legalEntity = {
  ...base,
  tipoSolicitante: "juridica",
  razonSocial: "Empresa",
  nit: "123",
  repNombres: "Ana",
  repApellidos: "Perez",
  repTipoDocumento: base.tipoDocumento,
  repNumeroDocumento: "123",
};
assert.equal((await submit(legalEntity)).status, 200);
cases++;
assert.equal(
  (await submit({ ...base, tipoSolicitante: "apoderado" })).status,
  400
);
cases++;
assert.equal((await submit({ ...base, turnstileToken: "" })).status, 400);
assert.equal(
  (
    await submit(
      base,
      "la-nieve",
      Array.from({ length: 6 }, () => new File(["x"], "a.pdf"))
    )
  ).status,
  400
);
assert.equal(
  (await submit(base, "la-nieve", [new File(["x"], "a.exe")])).status,
  400
);
rejectEmail = true;
assert.equal((await submit(base)).status, 502);
console.log(
  `PQRS: ${cases + 4} cases passed; both brands, validation, email and failure paths. No external requests.`
);
