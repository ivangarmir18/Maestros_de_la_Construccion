/**
 * BACKEND SERVERLESS PARA VERCEL (/api/chat)
 * Asistente Virtual Inteligente con Google Gemini
 * Maestros de la Construcción - Valencia
 */

const SYSTEM_PROMPT = `Eres el Asesor Virtual oficial de "Maestros de la Construcción" en Valencia (España).
Tu misión es atender, asesorar y resolver dudas sobre reformas y obras con naturalidad, seriedad y cercanía artesana, orientando al usuario para que solicite una visita técnica gratuita o contacte por WhatsApp.

IDENTIDAD Y VALOR DE LA EMPRESA:
- Hablas como un maestro de obra experimentado, serio, técnico y accesible. Hablas siempre en primera persona del plural ("nosotros", "nuestro equipo de oficiales").
- Modelo de negocio: "Directo de Oficial a Propietario". Sin comerciales, intermediarios ni sobrecostes de empresas tradicionales (30-40% más económicos y con control técnico directo).
- Más de 15 años de oficio real en reformas y albañilería en Valencia.
- Cobertura: Valencia capital (Ruzafa, Campanar, Benimaclet, El Carmen, Eixample, etc.) y toda el área metropolitana (Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto, Manises).

CATÁLOGO DE SERVICIOS Y TARIFAS BASE ORIENTATIVAS (Mercado Valencia):
- Cambio de bañera por plato de ducha de resina mineral C3 antideslizante: Desde 590 € (ejecución limpia en 2 a 3 días).
- Reforma completa de baño (alicatado porcelánico, sanitarios, nueva fontanería multicapa y plato de resina): Desde 1.950 € (estándar habitual ~2.450 €, baño grande ~3.200 €; plazo 7 a 10 días).
- Reforma completa de cocina (fontanería, alicatado porcelánico rectificado, electricidad y pavimentos): Desde 2.600 € (plazo 10 a 14 días).
- Tabiquería de Pladur técnico y falsos techos con fosa perimetral de luz LED indirecta: Desde 420 € o ~26 €/m² (plazo 3 a 6 días).
- Alisado de gotelé y pintura sin polvo (lijado orbital con aspiración conectada sin ensuciar la vivienda, 2 manos de pintura plástica lavable mate): Desde 450 € (estancia puntual) o ~9 €/m² (piso estándar ~980 €; plazo 4 a 7 días).
- Solados y pavimentos porcelánicos rectificados con cuñas autonivelantes y rodapié: Desde 490 € o ~22 €/m² (plazo 4 a 8 días).
- Reforma integral de vivienda: Desde 18.500 € o ~380 €/m² (plazo 4 a 8 semanas, sujeta a disponibilidad de agenda).
- Coordinación completa de gremios: Climatización / aire acondicionado, carpintería de aluminio/PVC, electricidad y cerrajería agrupados bajo un único presupuesto cerrado con nosotros como único responsable.

COMPROMISOS INNEGOCIABLES:
1. Visita técnica presencial y medición en Valencia: 100% GRATUITA y sin compromiso en el domicilio del cliente.
2. Presupuesto cerrado por escrito antes de iniciar la obra: sin sorpresas ni costes imprevistos.
3. Obra limpia: protección obligatoria de zonas comunes, ascensores y suelos; retirada diaria de escombros a vertedero homologado.
4. Horario de atención: Lunes a Viernes de 07:00 a 17:00.
5. Teléfono y WhatsApp oficial: 722 851 328. Correo: contacto@maestrosdelaconstruccion.es.

REGLAS DE CONVERSACIÓN Y DERIVACIÓN (MUY IMPORTANTE):
1. NO USES RESPUESTAS AUTOMATIZADAS NI FRASES CLICHÉ ROBÓTICAS. Genera respuestas vivas, naturales, como un profesional de confianza respondiendo una llamada o un mensaje.
2. Sé conciso y claro (máximo 2 a 3 párrafos cortos). Usa formato markdown limpio con negritas para destacar cifras y datos clave.
3. Si el usuario te saluda, dale la bienvenida amablemente como el asesor técnico de Maestros de la Construcción y pregúntale qué estancia o reforma tiene en mente.
4. Cuando el usuario pregunte dudas técnicas (diferencias de azulejos, impermeabilización de duchas, aislamiento acústico con lana de roca, gotelé al temple vs plástico), explícaselo con criterio técnico sólido.
5. GUARDARRAÍL DE DERIVACIÓN (CUANDO SE SALE DEL GUIÓN O QUIERE CERRAR):
   En el momento en que el usuario pregunte por algo fuera de catálogo, solicite un presupuesto final cerrado, pregunte por fechas exactas de inicio o detalles que requieran ver su vivienda en persona:
   Derívalo con total naturalidad hacia WhatsApp:
   "Para ver tu estancia y darte un presupuesto exacto cerrado sin compromiso, lo ideal es que nos envíes fotos o nos escribas por WhatsApp al **722 851 328**. También podemos acordar un día para pasar a medir sin ningún coste."
6. No inventes precios que contradigan las tarifas base de referencia.`;

async function getEndpoints(apiKey) {
  const priorityModels = [
    'gemini-3.8-flash',
    'gemini-3-flash',
    'gemini-2.5-flash',
    'gemini-2.0-flash',
    'gemini-2.0-flash-lite',
    'gemini-flash-latest',
    'gemini-1.5-flash-latest'
  ];

  const endpoints = [];
  for (const m of priorityModels) {
    endpoints.push(`https://generativelanguage.googleapis.com/v1beta/models/${m}:generateContent?key=${apiKey}`);
    endpoints.push(`https://generativelanguage.googleapis.com/v1/models/${m}:generateContent?key=${apiKey}`);
  }

  // Descubrimiento dinámico de modelos admitidos en la cuenta de Google AI Studio
  try {
    const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (listRes.ok) {
      const data = await listRes.json();
      if (Array.isArray(data.models)) {
        // Filtrar modelos conversacionales (descartar embedding, vision-only, aqa, deep-research)
        const validModels = data.models
          .filter(m => Array.isArray(m.supportedGenerationMethods) && m.supportedGenerationMethods.includes('generateContent'))
          .map(m => m.name.replace(/^models\//, ''))
          .filter(name => !name.includes('embedding') && !name.includes('research') && !name.includes('aqa'));

        // Ordenar: primero los modelos 'flash' rápidos, luego 'pro'
        validModels.sort((a, b) => {
          const aFlash = a.includes('flash') ? 2 : (a.includes('pro') ? 1 : 0);
          const bFlash = b.includes('flash') ? 2 : (b.includes('pro') ? 1 : 0);
          return bFlash - aFlash;
        });

        for (const name of validModels) {
          const url = `https://generativelanguage.googleapis.com/v1beta/models/${name}:generateContent?key=${apiKey}`;
          if (!endpoints.includes(url)) {
            endpoints.push(url);
          }
        }
      }
    }
  } catch (_) {}

  return endpoints;
}

export default async function handler(req, res) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();

  // GET diagnóstico
  if (req.method === 'GET') {
    if (!apiKey) {
      return res.status(200).json({ status: 'error', reason: 'No GEMINI_API_KEY configurada' });
    }
    try {
      const resp = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
      const text = await resp.text();
      let parsed;
      try { parsed = JSON.parse(text); } catch (_) { parsed = text; }
      return res.status(200).json({
        keyLength: apiKey.length,
        keyPrefix: apiKey.slice(0, 6) + '...',
        googleHttpStatus: resp.status,
        googleResponse: parsed
      });
    } catch (err) {
      return res.status(200).json({ error: err.message });
    }
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido. Utiliza POST.' });
  }

  try {
    const { message, history = [] } = req.body || {};

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'El mensaje es obligatorio.' });
    }

    const cleanMessage = message.trim().slice(0, 800);

    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'Clave GEMINI_API_KEY no configurada en el servidor.'
      });
    }

    // Construir contents alternando estrictamente
    const contents = [];

    if (Array.isArray(history)) {
      const validHistory = history
        .filter(item => item && (item.role === 'user' || item.role === 'model') && typeof item.text === 'string' && item.text.trim())
        .slice(-6);

      let lastRole = null;
      for (const item of validHistory) {
        const role = item.role === 'user' ? 'user' : 'model';
        if (contents.length === 0 && role !== 'user') continue;
        if (role === lastRole) continue;

        contents.push({
          role,
          parts: [{ text: item.text.trim().slice(0, 800) }]
        });
        lastRole = role;
      }

      if (contents.length > 0 && contents[contents.length - 1].role === 'user') {
        contents.pop();
      }
    }

    contents.push({
      role: 'user',
      parts: [{ text: cleanMessage }]
    });

    const payload = {
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 800,
        topP: 0.95
      }
    };

    const endpoints = await getEndpoints(apiKey);
    let successfulData = null;
    let lastError = null;

    for (const url of endpoints) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (resp.ok) {
          successfulData = await resp.json();
          break;
        } else {
          lastError = await resp.text();
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    // Fallback de compatibilidad sin systemInstruction
    if (!successfulData) {
      const directPayload = {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${SYSTEM_PROMPT}\n\nConsulta del cliente:\n${cleanMessage}` }]
          }
        ],
        generationConfig: { temperature: 0.65, maxOutputTokens: 400 }
      };

      for (const url of endpoints.slice(0, 4)) {
        try {
          const resp = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(directPayload)
          });
          if (resp.ok) {
            successfulData = await resp.json();
            break;
          }
        } catch (_) {}
      }
    }

    if (!successfulData) {
      console.error('Error definitivo llamando a Gemini API:', lastError);
      return res.status(200).json({
        fallback: true,
        error: 'No se pudo conectar con ningún modelo Gemini disponible',
        details: lastError
      });
    }

    const replyText = successfulData.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({
      success: true,
      reply: replyText
    });

  } catch (error) {
    console.error('Error interno en /api/chat:', error);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
