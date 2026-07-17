# Despliegue en Vercel

Este monorepo contiene **dos sitios Next.js independientes** (`apps/la-nieve` y `apps/unimarka`) que comparten código a través de `packages/site-kit` mediante npm workspaces. Se despliegan como **dos proyectos separados de Vercel apuntando al mismo repositorio de GitHub**, cada uno con una carpeta raíz ("Root Directory") distinta. El paquete compartido no se despliega aparte: se resuelve dentro de cada build gracias al workspace.

Plataforma elegida: **Vercel**. Dominios: **pendientes de definir** — mientras tanto cada sitio queda accesible en su subdominio `*.vercel.app` autogenerado.

## Preparación ya incluida en el repo

- `package.json` (raíz): se agregó `"engines": { "node": ">=20.9.0" }` para fijar la versión mínima de Node compatible con Next.js 16, evitando ambigüedad en el runtime que use Vercel.
- `apps/la-nieve/vercel.json` y `apps/unimarka/vercel.json`: definen un `ignoreCommand` para que un cambio que solo afecte a una app (o a archivos fuera de `packages/site-kit`) no dispare un build innecesario del otro proyecto.
- No se agregó `output: "standalone"` en los `next.config.ts`: esa opción es para self-hosting con Docker/Node, no aplica en Vercel.
- No se requieren variables de entorno hoy: toda la configuración de marca vive en `apps/*/src/site.config.ts` (sin secretos). El script de exploración de base de datos (`scripts/database-exploration/`) es una herramienta manual aislada, fuera de los workspaces desplegables, y no participa en el build de ninguna app.

## Paso a paso: crear los dos proyectos en Vercel

Repetir estos pasos dos veces, una por cada sitio.

### 1. Distribuciones La Nieve

1. En el dashboard de Vercel: **Add New → Project** → importar el repo `DataLab6/nv-uk-web`.
2. **Root Directory**: `apps/la-nieve` (botón "Edit" junto a Root Directory en la pantalla de configuración).
3. **Framework Preset**: Next.js (detectado automáticamente).
4. **Build Command**: dejar el default (`next build`, ya definido en `apps/la-nieve/package.json`).
5. **Install Command**: dejar el default. Vercel detecta el `package-lock.json` en la raíz del repo y el campo `workspaces` de la raíz, e instala desde ahí automáticamente (necesario para resolver `@corporativo/site-kit`).
6. **Output Directory**: dejar el default (`.next`).
7. **Environment Variables**: ninguna requerida por ahora.
8. Nombrar el proyecto, por ejemplo `la-nieve` o `distribuciones-la-nieve`.
9. Deploy.

### 2. Unimarka

Repetir el mismo proceso con:

- **Root Directory**: `apps/unimarka`.
- Mismo Build/Install/Output Command (defaults).
- Nombre de proyecto, por ejemplo `unimarka`.

## Dominios (pendiente)

Mientras no haya dominios propios confirmados, cada proyecto queda accesible en su URL `*.vercel.app` (por ejemplo `la-nieve.vercel.app` y `unimarka.vercel.app`, según el nombre elegido al crear el proyecto).

Cuando se confirmen los dominios finales:

1. En cada proyecto de Vercel → **Settings → Domains** → agregar el dominio correspondiente (uno por sitio; no deben cruzarse).
2. Configurar los registros DNS que Vercel indique (`A`/`CNAME`) en el proveedor de DNS de cada dominio.
3. `site.config.ts` de cada app ya trae la metadata (título, descripción, `themeColor`, favicon) lista para producción; no requiere cambios al asignar el dominio.

## Verificación previa a cualquier despliegue

Antes de conectar los proyectos (o después de cambios importantes), correr en local:

```bash
npm install
npm run build
```

Esto compila ambas apps (`build:la-nieve` y `build:unimarka` vía `--workspaces`) exactamente como lo hará Vercel. Si esto falla en local, fallará igual en Vercel.

## Qué NO se hizo en esta preparación

- No se crearon los proyectos de Vercel (requiere acceso a la cuenta/dashboard del usuario).
- No se asignó ningún dominio (pendiente de definición).
- No se agregaron variables de entorno (no existen secretos ni integraciones backend activas).
- No se tocó la arquitectura del monorepo, los `next.config.ts`, ni ningún componente o página.
