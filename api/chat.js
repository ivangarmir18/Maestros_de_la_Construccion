/**
 * BACKEND SEGURO SERVERLESS PARA VERCEL (/api/chat)
 * Protege la API Key de Google Gemini en el servidor (Vercel Environment Variables)
 * Nadie desde el navegador ni inspeccionando código puede ver tu clave.
 */

export default async function handler(req, res) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  // Cabeceras de seguridad
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  try {
    const { message } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es obligatorio y debe ser texto.' });
    }

    // Sanitización básica y límite de caracteres (anti-abuso)
    const cleanMessage = message.trim().slice(0, 500);

    // Obtener la clave segura desde las variables de entorno de Vercel
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'No se ha configurado la variable GEMINI_API_KEY en Vercel todavía. Usando motor experto local.'
      });
    }

    const systemPrompt = `Eres "MaestroBot", el asistente técnico oficial de "Maestros de la Construcción", empresa de reformas y construcción en Valencia y alrededores (España).
Especialidades:
- Alicatados en baños, suelos y cocinas (gres porcelánico, rectificados y paños de piedra natural).
- Tabiquería de pladur, techos continuos con fosa de luz indirecta LED y hornacinas retroiluminadas.
- Fontanería y grifería de alta eficiencia, platos de ducha de resina a ras de suelo.
- Alisado de gotelé y pintura plástica mate.
- Reformas integrales en toda Valencia (Ruzafa, Campanar, Ciutat Vella, Torrent, Paterna, Burjassot, Bétera, Sagunto...).

Reglas de respuesta:
- Habla en español, de forma muy profesional, cordial y concisa (máximo 2 párrafos).
- Indica siempre que la visita técnica para toma de medidas y el presupuesto cerrado en Valencia son 100% GRATUITOS y sin compromiso.
- Teléfono / WhatsApp oficial: 622 851 328. Responsable: Fabio Toro.`;

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemPrompt}\n\nPregunta del cliente: ${cleanMessage}` }]
          }
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error llamando a Gemini API:', errorText);
      return res.status(200).json({
        fallback: true,
        error: 'Error temporal en el servicio de IA de Google'
      });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    // Devolver respuesta protegida al frontend
    return res.status(200).json({
      success: true,
      reply: replyText
    });

  } catch (error) {
    console.error('Error interno en /api/chat:', error);
    return res.status(500).json({ error: 'Error interno del servidor al procesar la solicitud' });
  }
}

