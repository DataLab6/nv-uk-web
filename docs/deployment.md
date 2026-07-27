# Despliegue en Vercel

Este monorepo contiene **dos sitios Next.js independientes** (`apps/la-nieve` y `apps/unimarka`) que comparten código a través de `packages/site-kit` mediante npm workspaces. Se despliegan como **dos proyectos separados de Vercel apuntando al mismo repositorio de GitHub**, cada uno con una carpeta raíz ("Root Directory") distinta. El paquete compartido no se despliega aparte: se resuelve dentro de cada build gracias al workspace.

Plataforma elegida: **Vercel**. Dominios: **pendientes de definir** — mientras tanto cada sitio queda accesible en su subdominio `*.vercel.app` autogenerado.

## Preparación ya incluida en el repo

- `package.json` (raíz): se agregó `"engines": { "node": ">=20.9.0" }` para fijar la versión mínima de Node compatible con Next.js 16, evitando ambigüedad en el runtime que use Vercel.
- No existen archivos `vercel.json`, middleware, redirects ni rewrites en el repositorio. La carpeta raíz y las variables de cada proyecto se configuran en el dashboard de Vercel; no se añadió configuración de despliegue innecesaria durante la optimización SEO.
- No se agregó `output: "standalone"` en los `next.config.ts`: esa opción es para self-hosting con Docker/Node, no aplica en Vercel.
- La configuración SEO usa variables de entorno por proyecto para no inventar dominios ni tokens. `NEXT_PUBLIC_SITE_URL` es obligatoria en producción; `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` es opcional. Ninguna contiene secretos: ambos valores terminan publicados en el HTML o en archivos rastreables.

## Variables de entorno SEO

Cada proyecto de Vercel debe configurar sus propios valores; no deben copiarse los de una marca a la otra.

| Variable                               | Producción  | Valor esperado                                                                                               |
| -------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`                 | Obligatoria | Origen HTTPS definitivo de esa marca, sin ruta, query ni hash; por ejemplo, el dominio confirmado del sitio. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Opcional    | Token exacto emitido por Google Search Console para la propiedad de esa marca.                               |

Si `NEXT_PUBLIC_SITE_URL` no existe durante un build local, cada app usa su origen de desarrollo (`http://localhost:3000` o `http://localhost:3001`). Ese fallback permite validar el proyecto localmente, pero no es correcto para un despliegue público: controla `metadataBase`, canonicals, Open Graph, Twitter, JSON-LD, `/robots.txt` y `/sitemap.xml`.

No se debe configurar `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` hasta que Google emita un token real. Al dejarla ausente no se genera ningún meta tag falso.

## Paso a paso: crear los dos proyectos en Vercel

Repetir estos pasos dos veces, una por cada sitio.

### 1. Distribuciones La Nieve

1. En el dashboard de Vercel: **Add New → Project** → importar el repo `DataLab6/nv-uk-web`.
2. **Root Directory**: `apps/la-nieve` (botón "Edit" junto a Root Directory en la pantalla de configuración).
3. **Framework Preset**: Next.js (detectado automáticamente).
4. **Build Command**: dejar el default (`next build`, ya definido en `apps/la-nieve/package.json`).
5. **Install Command**: dejar el default. Vercel detecta el `package-lock.json` en la raíz del repo y el campo `workspaces` de la raíz, e instala desde ahí automáticamente (necesario para resolver `@corporativo/site-kit`).
6. **Output Directory**: dejar el default (`.next`).
7. **Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL`: origen HTTPS definitivo de Distribuciones La Nieve. Si el proyecto todavía no tiene dominio, completar el primer despliegue técnico, copiar la URL `*.vercel.app` realmente asignada, configurar la variable y redesplegar antes de publicar o solicitar indexación.
   - `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: agregar solo si existe un token real para esta propiedad.
8. Nombrar el proyecto, por ejemplo `la-nieve` o `distribuciones-la-nieve`.
9. Deploy.

### 2. Unimarka

Repetir el mismo proceso con:

- **Root Directory**: `apps/unimarka`.
- Mismo Build/Install/Output Command (defaults).
- `NEXT_PUBLIC_SITE_URL`: origen HTTPS definitivo de Unimarka. Si aún no existe, aplicar el mismo ciclo de primer despliegue técnico, configuración de la URL asignada y redespliegue antes de publicar.
- `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION`: agregar solo si existe un token real para esta propiedad.
- Nombre de proyecto, por ejemplo `unimarka`.

## Dominios (pendiente)

Mientras no haya dominios propios confirmados, cada proyecto queda accesible en su URL `*.vercel.app` (por ejemplo `la-nieve.vercel.app` y `unimarka.vercel.app`, según el nombre elegido al crear el proyecto).

Cuando se confirmen los dominios finales:

1. En cada proyecto de Vercel → **Settings → Domains** → agregar el dominio correspondiente (uno por sitio; no deben cruzarse).
2. Configurar los registros DNS que Vercel indique (`A`/`CNAME`) en el proveedor de DNS de cada dominio.
3. Actualizar `NEXT_PUBLIC_SITE_URL` en el proyecto correspondiente para que coincida exactamente con el dominio canónico elegido (incluyendo la decisión entre `www` y sin `www`).
4. Hacer un nuevo despliegue y comprobar que canonical, `og:url`, `/robots.txt`, `/sitemap.xml` y los identificadores JSON-LD usan ese origen HTTPS.
5. Configurar en Vercel una única redirección de dominio hacia el origen canónico si también se conecta una variante (`www`/sin `www`). No se codifica esa redirección en el repositorio hasta conocer los dominios reales.

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
- No se asignaron valores reales a las variables SEO: los dominios finales y los tokens de Search Console siguen pendientes de confirmación externa.
- No se tocó la arquitectura del monorepo, los `next.config.ts`, ni ningún componente o página.
