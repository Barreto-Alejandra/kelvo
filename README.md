# Kelvo — herramientas web de un solo uso

Colección de herramientas online que hacen **una sola cosa bien**: sin registro, sin login, sin
suscripción y **sin subir nada a un servidor**. Todo se procesa en el navegador del usuario.
El objetivo del proyecto es **traer tráfico de Google** y monetizar con un anuncio discreto o una
futura versión "pro".

Bilingüe **español + inglés** (rutas `/es/` y `/en/`) con SEO internacional (hreflang) completo.

## Herramientas incluidas (8)

**Generadores**
- Generador de contraseñas (Web Crypto, medidor de fuerza)
- Generador de paletas de colores (armonías + bloqueo + barra espaciadora)
- Generador de códigos QR (PNG y SVG, sin marca de agua)
- Generador de nombres de usuario (4 estilos)

**Imagen** (100% en el navegador con Canvas)
- Comprimir imagen (JPG/WebP, antes/después)
- Redimensionar imagen (bloqueo de proporción)
- Convertir imagen (PNG ↔ JPG ↔ WebP)
- Ver tamaño de imagen (dimensiones, peso, proporción, megapíxeles)

## Stack

[Astro](https://astro.build) — genera **HTML estático** (ideal para que Google indexe), envía
**cero JavaScript por defecto** y solo carga el JS de la herramienta que se usa. Dependencias de
runtime mínimas y cargadas solo donde hacen falta: `qr-code-styling` (QR), `jspdf` (export PDF del
QR, perezoso) y `fflate` (ZIP del lote de imágenes en Pro). El resto usa APIs nativas del navegador
(Canvas, Web Crypto).

## Comandos

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo en http://localhost:4321
npm run build    # genera el sitio estático en dist/
npm run preview  # sirve dist/ localmente para probar el build
```

## Estructura

```
src/
  config.ts                 # nombre del sitio, idiomas, dominio, config de Pro
  i18n/
    ui.ts                   # textos globales (header, footer, botones) en es/en
    tools.ts                # ⭐ registro de herramientas: slugs, títulos, descripciones, FAQ (SEO)
    utils.ts                # helpers de rutas e idioma
  layouts/Layout.astro      # <head>, header, footer, helpers (toast/copiar)
  components/
    SEO.astro               # meta tags, canonical, hreflang, Open Graph, JSON-LD
    ToolShell.astro         # marco de cada herramienta (breadcrumb, FAQ, relacionadas)
    tools/*.astro           # las 8 herramientas (UI + lógica cliente)
  scripts/image-utils.ts    # lógica compartida de las herramientas de imagen
  pages/
    index.astro             # raíz: redirige según idioma del navegador
    [lang]/index.astro      # home por idioma
    [lang]/[slug].astro     # ⭐ una página por herramienta y por idioma (con su SEO/JSON-LD)
    robots.txt.ts           # robots.txt dinámico (usa tu dominio)
public/                     # favicon.svg, og.png
```

## Cómo agregar una herramienta nueva

1. Agregá su entrada en [`src/i18n/tools.ts`](src/i18n/tools.ts) con el `slug`, título,
   descripción y FAQ **en los dos idiomas** (esto es lo que rankea en Google).
2. Creá el componente en `src/components/tools/MiHerramienta.astro`.
3. Registralo en el mapa `COMPONENTS` de [`src/pages/[lang]/[slug].astro`](src/pages/%5Blang%5D/%5Bslug%5D.astro).

La página, el SEO, el sitemap y los hreflang se generan solos.

---

## 🚀 Deploy (paso a paso)

El build produce una carpeta **estática** (`dist/`) que se puede subir a cualquier hosting de
sitios estáticos. **Gratis** en Netlify, Vercel, Cloudflare Pages o GitHub Pages.

1. **Configurá tu dominio.** Copiá `.env.example` a `.env` y poné tu dominio real:
   ```
   SITE_URL=https://tudominio.com
   ```
   (También podés pasarlo inline: `SITE_URL=https://tudominio.com npm run build`.)

2. **Compilá:** `npm run build` → genera `dist/`.

3. **Subí `dist/`.** Opciones recomendadas:

   - **Netlify / Vercel / Cloudflare Pages:** conectá el proyecto y usá
     - Build command: `npm run build`
     - Publish/output directory: `dist`
     - Variables de entorno: `SITE_URL` (y `PRO_CHECKOUT_URL` / `PRO_STORE_ID` cuando actives Pro).
   - **Drag & drop:** en Netlify podés arrastrar la carpeta `dist/` directo a la web.

> Es un sitio estático: **no necesita servidor de Node** en producción.

### GitHub Pages (ya configurado)

El repo incluye [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que en cada push a
`main` compila y publica el sitio en GitHub Pages automáticamente. Como Pages sirve el proyecto en
un subpath (`/kelvo/`), el workflow define `BASE_PATH=/kelvo` y `SITE_URL` apuntando a
`https://barreto-alejandra.github.io`. Todos los enlaces y assets internos usan ese `base`
(ver `withBase()` en [`src/i18n/utils.ts`](src/i18n/utils.ts)), así que la vista previa funciona sin
links rotos. Al pasar a tu dominio propio, simplemente no definís `BASE_PATH` (queda en `/`) y todo
funciona en la raíz.

---

## 🔎 Que aparezca en Google (Search Console)

El SEO técnico ya está hecho: títulos y descripciones únicos por herramienta y por idioma,
**hreflang** es/en, canonical, Open Graph, **datos estructurados** (WebApplication, FAQPage,
BreadcrumbList) y `sitemap-index.xml` automático. Para que Google lo indexe:

1. Entrá a [Google Search Console](https://search.google.com/search-console) y **agregá tu
   propiedad** (dominio). Verificá la propiedad (DNS o etiqueta).
2. En **Sitemaps**, enviá: `https://tudominio.com/sitemap-index.xml`
3. Pedí indexación de algunas URLs clave con **Inspección de URLs**.
4. (Opcional pero recomendado) Creá una propiedad también en
   [Bing Webmaster Tools](https://www.bing.com/webmasters) y enviá el mismo sitemap.

**Tip de contenido:** el tráfico vive en los títulos/descripciones/FAQ de
[`src/i18n/tools.ts`](src/i18n/tools.ts). Apuntá a lo que la gente busca
("convertir png a jpg", "comprimir imagen", etc.). Cuanto mejor y más específico el texto,
mejor rankea.

---

## 💰 Monetización — Kelvo Pro (pago único, sin anuncios)

El modelo es un **pago único** (sin suscripción y **sin anuncios**) vía **Lemon Squeezy**, que
actúa de *Merchant of Record* (cobra el IVA por vos) y cuya **API de licencias funciona 100% desde
el navegador** — no hace falta servidor.

- Página de venta + activación: [`src/pages/[lang]/pro.astro`](src/pages/%5Blang%5D/pro.astro)
  (`/es/pro`, `/en/pro`), enlazada desde el footer.
- Estado de licencia (cliente): [`src/scripts/pro.ts`](src/scripts/pro.ts) — `isPro()`,
  `activateLicense(key)`, `deactivate()`. El flag se cachea en `localStorage` (`kelvo_pro`).
- **Para activarlo:** creá el producto en Lemon Squeezy y definí las variables `PRO_CHECKOUT_URL`
  y `PRO_STORE_ID` (ver [`.env.example`](.env.example)). Mientras `PRO_CHECKOUT_URL` esté vacío, la
  página `/pro` muestra "Próximamente" en vez del botón de compra.
- **Qué se cobra (aditivo, no se quita nada gratis):** la función Pro es el **procesamiento de
  imágenes por lotes + descarga en ZIP**, ya implementado en Comprimir, Redimensionar y Convertir
  (arrastrás varias imágenes a la vez y bajás un único ZIP). Todo se procesa en el navegador con
  `fflate`. Las herramientas siguen 100% gratis para una imagen.
- **Cómo funciona el gate:** las 3 herramientas de imagen aceptan varios archivos. Si el usuario
  **no** tiene Pro y suelta varios, ve un *upsell* hacia `/pro` (y se le procesa la primera imagen
  igual); si `isPro()` es verdadero, se activa el modo lote. La lógica compartida está en
  [`src/scripts/batch.ts`](src/scripts/batch.ts).

---

## Privacidad (parte del producto)

Ninguna herramienta sube archivos a un servidor: las imágenes se procesan con Canvas y las
contraseñas con Web Crypto, **todo en el dispositivo del usuario**. No hay cuentas, ni cookies, ni
tracking. Esto, además de ser correcto, es un argumento de venta y de SEO ("100% privado").

## Notas

- `npm audit` reporta 1 vulnerabilidad *moderate* en dependencias de build (no afecta el sitio
  estático en producción). Revisala con `npm audit` antes de un `npm audit fix` para no romper Astro.
- La imagen para compartir en redes está en `public/og.png` y se puede regenerar con
  `node scripts/gen-og.mjs`.
