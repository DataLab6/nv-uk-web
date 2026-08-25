const fs = require("node:fs");
const path = require("node:path");
const { loadEnvConfig } = require("@next/env");

loadEnvConfig(process.cwd());
const key = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY?.trim() ?? "";

function scan(directory) {
  const result = [];
  if (!fs.existsSync(directory)) return result;
  const pending = [directory];
  while (pending.length) {
    const current = pending.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      if (entry.isDirectory()) pending.push(fullPath);
      else if (/\.(?:js|map|html|txt)$/.test(entry.name)) {
        try {
          if (key && fs.readFileSync(fullPath, "utf8").includes(key)) {
            result.push(path.relative(process.cwd(), fullPath));
          }
        } catch {}
      }
    }
  }
  return result;
}

for (const app of ["la-nieve", "unimarka"]) {
  const matches = scan(path.join(process.cwd(), "apps", app, ".next"));
  console.log(`${app}: bundle_contiene_clave=${matches.length > 0}; coincidencias=${matches.length}`);
}
