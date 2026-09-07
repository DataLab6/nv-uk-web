import assert from "node:assert/strict";
import path from "node:path";
import { readFileSync } from "node:fs";
import vm from "node:vm";
import ts from "typescript";

const sent = [];
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
      if (name === "@next/env") return { loadEnvConfig: () => undefined };
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
      if (url.includes("siteverify")) {
        return Response.json({ success: true });
      }
      assert.equal(url, "https://api.resend.com/emails");
      sent.push(JSON.parse(options.body));
      return Response.json({ id: "email-id" });
    },
  });

  cache.set(file, loaded.exports);
  return loaded.exports;
}

const { handleContactRequest } = load(
  path.resolve("packages/site-kit/src/server/forms.ts")
);
const base = {
  website: "",
  turnstileToken: "valid-token",
  contactType: "general",
  name: "Ana Perez",
  email: "ana@example.com",
  phone: "3001234567",
  company: "",
  subject: "general",
  message: "Quiero conocer mas informacion.",
};

async function submit(overrides = {}) {
  return handleContactRequest(
    new Request("https://example.com/api/forms/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...base, ...overrides }),
    }),
    "unimarka"
  );
}

assert.equal((await submit()).status, 200);
assert.match(sent.at(-1).subject, /^\[Contacto general\]/);

assert.equal(
  (
    await submit({
      contactType: "client",
      company: "Tienda Central",
      city: "Bogota",
      clientCode: "C-123",
      subject: "orders",
    })
  ).status,
  200
);
assert.match(sent.at(-1).subject, /^\[Cliente\]/);
assert.match(sent.at(-1).html, /C-123/);

assert.equal(
  (await submit({ contactType: "general", subject: "orders" })).status,
  400
);
assert.equal(
  (
    await submit({
      contactType: "client",
      company: "",
      city: "Bogota",
      subject: "orders",
    })
  ).status,
  400
);
assert.equal(
  (
    await submit({
      contactType: "client",
      company: "Tienda Central",
      city: "",
      subject: "orders",
    })
  ).status,
  400
);

console.log(
  "Contact: general and client flows passed; conditional fields and subjects are enforced server-side."
);
