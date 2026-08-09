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

La sección newsletter incluye validación visual del campo email (formato y obligatoriedad).
La suscripción no está conectada a un endpoint real.

Para integrarla posteriormente:

1. Localiza el bloque `newsletter-form` en `index.html`
2. Reemplaza `e.preventDefault()` en `assets/js/main.js` por la llamada al servicio de newsletter (Mailchimp, MailerLite, etc.)
3. Añade el endpoint en el atributo `action` del formulario o mediante fetch
4. Actualiza el mensaje de éxito/error según la respuesta del servicio

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
