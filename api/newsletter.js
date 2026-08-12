// Serverless Function de Vercel para el formulario newsletter.
//
// Envía los datos recibidos al correo julianaguilar@gmail.com mediante
// Resend (https://resend.com) usando una API key desde variable de entorno.
//
// Configuración en Vercel (Dashboard -> Project -> Settings -> Environment Variables):
//   RESEND_API_KEY = re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//   CONTACT_EMAIL  = julianaguilar@gmail.com
//
// No expone ninguna credencial en el frontend: el navegador solo hace
// POST a /api/newsletter y aquí se procesa el envío del lado servidor.

const RESEND_API_URL = 'https://api.resend.com/emails';
const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'julianaguilar@gmail.com';

export default async function handler(req, res) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, message: 'Método no permitido' });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ ok: false, message: 'Servicio no configurado' });
  }

  const { name = '', email = '' } = req.body || {};

  // Validación básica
  const emailOk = typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  if (!emailOk) {
    return res.status(400).json({ ok: false, message: 'Correo inválido' });
  }

  const subject = name
    ? `Nuevo suscriptor del sitio — ${name}`
    : 'Nuevo suscriptor del sitio';

  try {
    const response = await fetch(RESEND_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Contacto Web <contacto@julianaguilar.online>',
        to: [CONTACT_EMAIL],
        subject: subject,
        html: `
          <h3>Nuevo suscriptor</h3>
          <p><strong>Nombre:</strong> ${escapeHtml(name) || '—'}</p>
          <p><strong>Correo:</strong> ${escapeHtml(email)}</p>
        `
      })
    });

    if (!response.ok) {
      return res.status(502).json({ ok: false, message: 'Error al enviar el correo' });
    }

    return res.status(200).json({ ok: true, message: 'Suscripción registrada' });
  } catch (err) {
    return res.status(500).json({ ok: false, message: 'Error del servidor' });
  }
}

function escapeHtml(str) {
  return String(str || '').replace(/[&<>"']/g, function (c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c];
  });
}
