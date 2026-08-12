# Julián Aguilar — Homepage Oficial

Homepage premium para Julián Aguilar, conferencista, autor y consultor internacional.

## Estructura

- `index.html` — Página de inicio completa (16 secciones)
- `assets/css/styles.css` — Estilos completos con diseño responsive y animaciones
- `assets/js/main.js` — Interactividad (header, menú móvil, video modal, lightbox, scroll reveal)
- `assets/images/` — Logo, monograma, fotografías, ruta de transformación, portada del libro
- `assets/video/` — Video principal del libro, autobiografía

## Brand

- Azul Oxford: #0F2747
- Dorado premium: #D4AF37
- Tipografía: Montserrat (títulos), Lato (body)

## Newsletter

La sección newsletter valida el campo email (formato y obligatoriedad) y envía los datos
al correo oficial `julianaguilar@gmail.com` mediante una Serverless Function de Vercel.

Archivos:

- `api/newsletter.js` — Serverless Function que procesa el POST y envía el correo vía Resend
- `assets/js/main.js` — hace `fetch POST /api/newsletter`, muestra éxito/error, sin recargar la página

### Configuración en Vercel

Antes de que el formulario funcione en producción, define estas variables de entorno
en Vercel (Dashboard → Project → Settings → Environment Variables):

- `RESEND_API_KEY` — API key del servicio Resend (https://resend.com). El correo se
  envía desde `onboarding@resend.dev`; para enviar desde un dominio propio, verifica
  el dominio en Resend y actualiza el campo `from` en `api/newsletter.js`.
- `CONTACT_EMAIL` — opcional. Valor por defecto: `julianaguilar@gmail.com`

No se exponen credenciales en el frontend: el navegador solo hace POST a `/api/newsletter`.

## Notas

- Solo homepage generada (Etapa 1)
- Enlaces internos preparados para páginas futuras
- Sin frameworks externos
- Sin contenido inventado

## Testimonios

La sección testimonios muestra 6 testimonios en video con miniatura, botón play y título breve.

Para reemplazar o actualizar:

1. Localiza `<!-- ===== TESTIMONIALS ===== -->` en `index.html`
2. Cada `.testimonio-video` contiene:
   - `<img>` — miniatura/poster del video
   - `<video>` — archivo `testimonio1.mp4` a `testimonio6.mp4` en `assets/video/`
   - `<h4>` — título breve del testimonio
3. Si el cliente entrega videos nuevos, reemplaza los archivos en `assets/video/` y actualiza el `src` correspondiente
4. Para recortar el inicio de un video, recorta el archivo antes de subirlo o ajusta el atributo de tiempo en el modal de video
