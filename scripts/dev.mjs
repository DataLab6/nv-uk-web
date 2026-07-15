import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  ".."
);
const nextCli = path.join(
  repositoryRoot,
  "node_modules",
  "next",
  "dist",
  "bin",
  "next"
);

const applications = [
  { name: "Distribuciones La Nieve", directory: "apps/la-nieve", port: 3000 },
  { name: "Unimarka", directory: "apps/unimarka", port: 3001 },
];

if (!existsSync(nextCli)) {
  console.error(
    "No se encontró Next.js. Ejecuta `npm install` en la raíz del monorepo."
  );
  process.exitCode = 1;
} else {
  const processes = applications.map((application) => {
    const applicationRoot = path.join(repositoryRoot, application.directory);

    console.log(
      `[dev] ${application.name}: http://localhost:${application.port}`
    );

    const child = spawn(
      process.execPath,
      [nextCli, "dev", "--port", String(application.port)],
      {
        cwd: applicationRoot,
        env: process.env,
        stdio: "inherit",
        windowsHide: true,
        detached: process.platform !== "win32",
      }
    );

    return { ...application, child };
  });

  let shutdownPromise;

  function waitForExit(child, timeoutMs) {
    if (child.exitCode !== null || child.signalCode !== null) {
      return Promise.resolve(true);
    }

    return new Promise((resolve) => {
      const timeout = setTimeout(() => {
        child.removeListener("exit", onExit);
        resolve(false);
      }, timeoutMs);

      function onExit() {
        clearTimeout(timeout);
        resolve(true);
      }

      child.once("exit", onExit);
    });
  }

  async function stopProcessTree(child) {
    if (!child.pid || child.exitCode !== null || child.signalCode !== null) {
      return;
    }

    if (process.platform === "win32") {
      await new Promise((resolve) => {
        const taskkill = spawn(
          "taskkill",
          ["/pid", String(child.pid), "/t", "/f"],
          { stdio: "ignore", windowsHide: true }
        );

        taskkill.once("error", () => {
          child.kill();
          resolve();
        });
        taskkill.once("exit", resolve);
      });
      return;
    }

    try {
      process.kill(-child.pid, "SIGTERM");
    } catch {
      child.kill("SIGTERM");
    }

    if (await waitForExit(child, 5_000)) {
      return;
    }

    try {
      process.kill(-child.pid, "SIGKILL");
    } catch {
      child.kill("SIGKILL");
    }
  }

  function shutdown(exitCode) {
    if (!shutdownPromise) {
      shutdownPromise = Promise.allSettled(
        processes.map(({ child }) => stopProcessTree(child))
      ).then(() => {
        process.exitCode = exitCode;
      });
    }

    return shutdownPromise;
  }

  for (const { name, child } of processes) {
    child.once("error", (error) => {
      console.error(`[dev] No se pudo iniciar ${name}:`, error.message);
      void shutdown(1);
    });

    child.once("exit", (code, signal) => {
      if (shutdownPromise) {
        return;
      }

      const reason = signal ? `señal ${signal}` : `código ${code ?? 1}`;
      console.error(`[dev] ${name} se detuvo (${reason}).`);
      void shutdown(code && code > 0 ? code : 1);
    });
  }

  process.once("SIGINT", () => void shutdown(130));
  process.once("SIGTERM", () => void shutdown(143));
  process.once("SIGHUP", () => void shutdown(129));
}
