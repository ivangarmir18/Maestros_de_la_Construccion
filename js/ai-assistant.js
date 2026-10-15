/**
 * ASISTENTE VIRTUAL IA - MAESTROS DE LA CONSTRUCCIÓN
 * Soporte con Google Gemini API + Base de Conocimiento Experta en Reformas en Valencia
 */

class ConstructionAIAssistant {
  constructor() {
    this.apiKey = localStorage.getItem('gemini_api_key') || '';
    this.history = [];
    this.isOpen = false;
    this.systemPrompt = `Eres "MaestroBot", el asistente técnico oficial de "Maestros de la Construcción", empresa líder de reformas y construcción en Valencia y alrededores (España).
Fundada por maestros artesanos con años de experiencia, especialistas en:
1. Alicatados en baños, suelos y cocinas (gres porcelánico, rectificados, azulejo artesanal y piedra rústica).
2. Trabajos de pladur y falsos techos con fosa de luz indirecta LED ambiental y nichos decorativos en salones y dormitorios.
3. Fontanería y grifería de alta eficiencia (saneamiento, platos de ducha de resina, cisternas empotradas).
4. Revestimientos, enlucidos y alisado de gotelé a llana con acabado fino.
5. Solados, pavimentos continuos y tarimas flotantes AC5.
6. Cerramientos, tabiquería y rehabilitación de fachadas.
7. Reformas integrales de pisos, viviendas unifamiliares y locales comerciales en toda la provincia de Valencia (Campanar, Ruzafa, Eixample, Torrent, Paterna, Burjassot, Bétera, Sagunto, etc.).

Tono: Cercano, muy profesional, experto en construcción, transparente y valenciano cordial.
Instrucciones:
- Responde siempre en español de forma concisa (máximo 2 o 3 párrafos).
- Ofrece siempre asesoramiento práctico y recuerda al usuario que la visita técnica para toma de medidas y presupuesto en Valencia es completamente GRATUITA y sin compromiso.
- Si preguntan por teléfono o contacto: Teléfono/WhatsApp 622 851 328.
- No inventes precios exactos sin ver la obra, pero puedes dar rangos orientativos de mercado (ej. baño completo 3.000€-5.000€, reforma integral 500€-750€/m²).`;

    this.localResponses = [
      {
        triggers: ["zona", "donde", "dónde", "valencia", "pueblo", "desplaz", "ciudades", "torrent", "paterna"],
        answer: "Operamos en toda la ciudad de **Valencia** (Ruzafa, Campanar, Ciutat Vella, El Carmen, Eixample, Poblats Marítims...) y toda el área metropolitana y provincia: **Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto y Manises**.<br><br>🚗 Nos desplazamos a tu vivienda o local para tomar medidas y asesorarte **sin coste ni compromiso**."
      },
      {
        triggers: ["precio", "cuanto", "cuánto", "coste", "cuesta", "tarifa", "metro", "m2", "presupuesto"],
        answer: "Cada proyecto es único, pero como referencia orientativa en Valencia:<br>• **Reforma integral de piso:** Entre 480€ y 750€/m² según calidades.<br>• **Baño completo con alicatado de piedra/porcelánico:** De 2.900€ a 4.900€.<br>• **Cocina completa:** De 3.800€ a 7.500€.<br>• **Pladur y fosa LED de salón:** Desde 38€/m².<br><br>💡 ¡Puedes probar nuestro **Simulador Interactivo de Presupuestos** en la web o escribirnos al WhatsApp **622 851 328**!"
      },
      {
        triggers: ["tiempo", "plazo", "tarda", "duracion", "duración", "semanas", "meses"],
        answer: "En Maestros de la Construcción el cumplimiento de plazos es sagrado por contrato:<br>• **Baño completo:** 7 a 10 días laborables.<br>• **Cocina completa:** 2 a 3 semanas.<br>• **Reforma integral de piso (70-100 m²):** Entre 5 y 8 semanas.<br><br>Coordinamos todos los gremios (albañiles, fontaneros, electricistas y pintores) para que no haya tiempos muertos."
      },
      {
        triggers: ["licencia", "permiso", "ayuntamiento", "declaracion", "obra mayor", "obra menor"],
        answer: "En Valencia la mayoría de reformas interiores (cambio de azulejos, suelos, fontanería o pladur) se tramitan mediante **Declaración Responsable** en el Ayuntamiento de Valencia o tu consistorio local, lo que permite empezar de forma inmediata tras el registro.<br><br>Si tocas muros de carga o fachada requiere proyecto técnico. Nosotros te asesoramos en todos los trámites para que estés 100% legal y tranquilo."
      },
      {
        triggers: ["pladur", "led", "luz", "salon", "techo", "fosa"],
        answer: "¡El pladur con iluminación integrada es una de nuestras grandes especialidades! Creamos frentes de salón a medida con hornacinas iluminadas, techos fonoabsorbentes con fosa perimetral de luz cálida o regulable (RGBW), e islas suspendidas con focos downlight empotrados. Transforma radicalmente cualquier estancia."
      },
      {
        triggers: ["contacto", "telefono", "teléfono", "whatsapp", "email", "llamar", "visita"],
        answer: "Puedes comunicarte directamente con Fabio Toro y el equipo de Maestros de la Construcción:<br>📞 **Teléfono / WhatsApp:** <a href='https://wa.me/34622851328' target='_blank' class='text-amber-400 font-bold underline'>622 851 328</a><br>✉️ **Email:** info@maestrosdelaconstruccion.es<br>📸 **Instagram:** @somosmaestrosdelaconstruccion<br><br>¿Quieres que te agendemos una visita esta misma semana?"
      }
    ];

    this.init();
  }

  init() {
    this.createWidgetDOM();
    this.bindEvents();
  }

  createWidgetDOM() {
    if (document.getElementById('ai-assistant-root')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'ai-assistant-root';
    wrapper.innerHTML = `
      <!-- Botón Flotante -->
      <button id="ai-chat-toggle" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-amber-300/40" aria-label="Abrir Asistente Virtual">
        <span class="relative flex h-3.5 w-3.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
        </span>
        <svg class="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path>
        </svg>
        <span class="text-sm font-bold tracking-wide hidden sm:inline">¿Dudas de tu obra? Pregunta a la IA</span>
      </button>

      <!-- Ventana de Chat Flotante -->
      <div id="ai-chat-modal" class="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[580px] bg-slate-900/95 backdrop-blur-xl border border-amber-500/30 rounded-2xl shadow-2xl z-50 flex flex-col hidden overflow-hidden transition-all duration-300">
        <!-- Header -->
        <div class="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/40 p-4 border-b border-white/10 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold text-lg">
              🔨
            </div>
            <div>
              <h4 class="font-bold text-white text-sm flex items-center gap-2">
                MaestroBot IA
                <span class="bg-amber-500/20 text-amber-300 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-amber-500/30">Gemini Powered</span>
              </h4>
              <p class="text-xs text-slate-400">Asesor de Obras & Reformas en Valencia</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="ai-key-config-btn" title="Configurar clave Gemini" class="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-white/5 rounded-lg transition-colors">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button id="ai-chat-close" class="p-1.5 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Panel de Clave Gemini (Oculto por defecto) -->
        <div id="ai-key-panel" class="p-3 bg-slate-950 border-b border-amber-500/20 text-xs hidden">
          <p class="text-slate-300 mb-2">Introduce tu clave API de <strong>Google AI Studio (Gemini)</strong> si quieres respuestas generadas en tiempo real por el modelo multimodal:</p>
          <div class="flex gap-2">
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." class="flex-1 bg-slate-800 border border-slate-700 rounded px-2.5 py-1.5 text-white text-xs focus:outline-none focus:border-amber-400">
            <button id="save-key-btn" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded text-xs transition">Guardar</button>
          </div>
          <p class="text-[10px] text-slate-500 mt-1">Si no tienes clave, no te preocupes: responderemos con nuestro motor experto integrado.</p>
        </div>

        <!-- Mensajes del Chat -->
        <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm max-h-[380px]">
          <div class="chat-bubble-bot p-3.5 shadow-sm text-slate-200">
            👋 ¡Hola! Soy el asistente inteligente de <strong>Maestros de la Construcción</strong>.
            <br><br>¿En qué puedo ayudarte hoy? Puedes preguntarme sobre costes de reformas en Valencia, tiempos de ejecución, pladur con iluminación o cómo tramitar permisos.
          </div>
        </div>

        <!-- Sugerencias rápidas -->
        <div class="px-3 py-2 bg-slate-950/60 border-t border-white/5 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
          <button class="quick-chip bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 transition">¿Qué zonas cubrís en Valencia?</button>
          <button class="quick-chip bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 transition">¿Cuánto cuesta reformar un baño?</button>
          <button class="quick-chip bg-slate-800 hover:bg-amber-500/20 hover:text-amber-300 text-slate-300 px-2.5 py-1 rounded-full border border-white/10 transition">¿Qué plazos tenéis?</button>
        </div>

        <!-- Input Box -->
        <form id="ai-chat-form" class="p-3 bg-slate-950 border-t border-white/10 flex items-center gap-2">
          <input type="text" id="ai-user-input" placeholder="Pregunta sobre reformas, precios, materiales..." class="flex-1 bg-slate-800/80 border border-slate-700 text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-400 placeholder-slate-400">
          <button type="submit" class="bg-amber-500 hover:bg-amber-400 text-slate-950 p-2.5 rounded-xl transition duration-200 flex-shrink-0">
            <svg class="w-5 h-5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(wrapper);
  }

  bindEvents() {
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const modal = document.getElementById('ai-chat-modal');
    const closeBtn = document.getElementById('ai-chat-close');
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-user-input');
    const configBtn = document.getElementById('ai-key-config-btn');
    const keyPanel = document.getElementById('ai-key-panel');
    const saveKeyBtn = document.getElementById('save-key-btn');
    const keyInput = document.getElementById('gemini-key-input');

    if (this.apiKey) {
      keyInput.value = this.apiKey;
    }

    toggleBtn?.addEventListener('click', () => {
      this.isOpen = !this.isOpen;
      modal.classList.toggle('hidden', !this.isOpen);
      if (this.isOpen) {
        input?.focus();
      }
    });

    closeBtn?.addEventListener('click', () => {
      this.isOpen = false;
      modal.classList.add('hidden');
    });

    configBtn?.addEventListener('click', () => {
      keyPanel.classList.toggle('hidden');
    });

    saveKeyBtn?.addEventListener('click', () => {
      const val = keyInput.value.trim();
      this.apiKey = val;
      localStorage.setItem('gemini_api_key', val);
      keyPanel.classList.add('hidden');
      this.addBotMessage('✅ Clave de Gemini API guardada correctamente. Ahora usaré el modelo de Google Gemini para responderte.');
    });

    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const text = chip.textContent;
        this.handleUserMessage(text);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const query = input.value.trim();
      if (!query) return;
      input.value = '';
      this.handleUserMessage(query);
    });
  }

  addUserMessage(text) {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-bubble-user p-3.5 text-slate-950 font-medium ml-auto max-w-[85%] text-sm shadow-md';
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  addBotMessage(html) {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-bubble-bot p-3.5 shadow-sm text-slate-200 max-w-[90%] text-sm';
    div.innerHTML = html;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  showTypingIndicator() {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'chat-bubble-bot p-3 text-slate-400 text-xs flex items-center gap-1.5 w-20';
    div.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0.4s]"></span>
    `;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  removeTypingIndicator() {
    document.getElementById('typing-indicator')?.remove();
  }

  async handleUserMessage(text) {
    this.addUserMessage(text);
    this.showTypingIndicator();

    if (this.apiKey) {
      try {
        const response = await this.callGeminiAPI(text);
        this.removeTypingIndicator();
        this.addBotMessage(response);
        return;
      } catch (err) {
        console.warn('Fallo en Gemini API, recurriendo a base de conocimiento local:', err);
      }
    }

    // Respuesta con motor experto local
    setTimeout(() => {
      this.removeTypingIndicator();
      const answer = this.getLocalAnswer(text);
      this.addBotMessage(answer);
    }, 650);
  }

  getLocalAnswer(query) {
    const lower = query.toLowerCase();
    for (const item of this.localResponses) {
      if (item.triggers.some(t => lower.includes(t))) {
        return item.answer;
      }
    }

    return `Entendido. Para darte el mejor asesoramiento técnico sobre <em>"${query}"</em> y ver tu vivienda o local en Valencia, te recomendamos coordinar una llamada o visita sin compromiso con Fabio Toro:<br><br>📲 <strong>WhatsApp directo:</strong> <a href="https://wa.me/34622851328" class="text-amber-400 font-bold underline" target="_blank">622 851 328</a><br>O si lo prefieres, puedes usar la pestaña de <strong>Presupuesto</strong> para calcular un coste aproximado.`;
  }

  async callGeminiAPI(userQuery) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.apiKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${this.systemPrompt}\n\nPregunta del usuario: ${userQuery}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 350
      }
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      throw new Error(`API error: ${res.statusText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      // Reemplazo básico de saltos de línea a <br> y negritas
      return candidate
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
    throw new Error('Respuesta vacía');
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  window.maestroAIAssistant = new ConstructionAIAssistant();
});
