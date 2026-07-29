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

La sección testimonios contiene contenido provisional.
Cada tarjeta incluye la etiqueta "Testimonio provisional" que debe eliminarse antes de publicar.

Para reemplazar con contenido real:

1. Localiza `<!-- ===== TESTIMONIALS ===== -->` en `index.html`
2. Cada `.testimonio-card` contiene:
   - `.testimonio-texto` — texto del testimonio
   - `.testimonio-perfil` — perfil o cargo de la persona
   - `.testimonio-avatar` — inicial en círculo (reemplazar por nombre completo si aplica)
3. El cliente debe proporcionar:
   - Texto del testimonio
   - Nombre y cargo/institucion
   - Autorización para publicación
4. Eliminar la clase `.testimonio-tag` del HTML cuando los testimonios sean reales
