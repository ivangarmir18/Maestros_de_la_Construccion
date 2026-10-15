/**
 * ASISTENTE VIRTUAL - MAESTROS DE LA CONSTRUCCIÓN
 * Iconografía Vectorizada Profesional (SVG) y Soporte Modo Claro / Modo Oscuro
 */

class ConstructionAIAssistant {
  constructor() {
    this.localKey = localStorage.getItem('gemini_api_key') || '';
    this.isOpen = false;

    this.localResponses = [
      {
        triggers: ["zona", "donde", "dónde", "valencia", "pueblo", "desplaz", "ciudades", "torrent", "paterna", "burjassot", "betera", "bétera", "sagunto"],
        answer: "Operamos en toda la ciudad de **Valencia** (Ruzafa, Campanar, Ciutat Vella, El Carmen, Eixample, Poblats Marítims...) y toda el área metropolitana y comarcas: **Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto y Manises**.<br><br>Nos desplazamos a tu vivienda o local para tomar medidas y asesorarte **sin coste ni compromiso**."
      },
      {
        triggers: ["precio", "cuanto", "cuánto", "coste", "cuesta", "tarifa", "metro", "m2", "presupuesto", "estimacion"],
        answer: "Como referencia orientativa de mercado en Valencia:<br>• **Reforma integral de vivienda:** De 480€ a 750€/m² según acabados.<br>• **Baño completo con alicatado de piedra/porcelánico:** De 2.900€ a 4.900€.<br>• **Cocina completa:** De 3.800€ a 7.500€.<br>• **Pladur y fosa LED de salón:** Desde 38€/m².<br><br>Puedes probar nuestro **Simulador Interactivo de Presupuestos** en la web o escribirnos al WhatsApp **622 851 328**."
      },
      {
        triggers: ["tiempo", "plazo", "tarda", "duracion", "duración", "semanas", "meses"],
        answer: "En Maestros de la Construcción el cumplimiento de plazos se fija por contrato con penalización por retraso:<br>• **Baño completo:** 7 a 10 días laborables.<br>• **Cocina completa:** 2 a 3 semanas.<br>• **Reforma integral (70-100 m²):** Entre 5 y 8 semanas.<br><br>Coordinamos todos los gremios internamente para evitar paradas."
      },
      {
        triggers: ["licencia", "permiso", "ayuntamiento", "declaracion", "obra mayor", "obra menor"],
        answer: "En Valencia la mayoría de reformas interiores (azulejos, pavimentos, fontanería o pladur) se tramitan mediante **Declaración Responsable** ante el consistorio, lo que permite empezar inmediatamente tras el registro.<br><br>Nosotros te guiamos en la gestión de las tasas y licencias para tu total tranquilidad."
      },
      {
        triggers: ["pladur", "led", "luz", "salon", "techo", "fosa"],
        answer: "El pladur con iluminación integrada es una de nuestras señas de identidad. Fabricamos frentes de salón a medida con hornacinas iluminadas, techos suspendidos con fosa perimetral de luz continua y molduras fonoabsorbentes."
      },
      {
        triggers: ["contacto", "telefono", "teléfono", "whatsapp", "email", "llamar", "visita"],
        answer: "Puedes comunicarte directamente con el equipo técnico de Maestros de la Construcción:<br>• **WhatsApp / Llamada directa:** <a href='https://wa.me/34622851328' target='_blank' class='text-amber-600 dark:text-amber-400 font-bold underline'>622 851 328</a><br>• **Instagram:** <a href='https://instagram.com/somosmaestrosdelaconstruccion' target='_blank' class='text-amber-600 dark:text-amber-400 font-bold underline'>@somosmaestrosdelaconstruccion</a><br><br>¿Deseas concertar una visita técnica presencial en tu vivienda?"
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
      <button id="ai-chat-toggle" class="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold px-4 py-3.5 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 border border-slate-700 dark:border-amber-300" aria-label="Consultar asesor técnico">
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
        </span>
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span class="text-xs font-bold tracking-wide hidden sm:inline">Asesor Técnico Virtual</span>
      </button>

      <!-- Ventana de Chat Flotante -->
      <div id="ai-chat-modal" class="fixed bottom-24 right-4 sm:right-6 w-[92vw] sm:w-[420px] max-h-[580px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl z-50 flex flex-col hidden overflow-hidden transition-all duration-300">
        <!-- Header -->
        <div class="bg-slate-50 dark:bg-slate-950 p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-full bg-amber-100 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <div>
              <h4 class="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                Asesor Técnico Maestros
                <span class="bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded-full">En línea</span>
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400">Atención técnica en Valencia</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="ai-key-config-btn" title="Configuración de clave" class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-amber-400 rounded-lg">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button id="ai-chat-close" class="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Panel de Clave Opcional -->
        <div id="ai-key-panel" class="p-3 bg-slate-100 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 text-xs hidden">
          <p class="text-slate-600 dark:text-slate-300 mb-1.5"><strong>Configurar clave de Gemini API:</strong></p>
          <div class="flex gap-2">
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." class="flex-1 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded px-2.5 py-1.5 text-slate-900 dark:text-white text-xs">
            <button id="save-key-btn" class="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded text-xs transition">Guardar</button>
          </div>
        </div>

        <!-- Mensajes del Chat -->
        <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm max-h-[380px] bg-slate-50/50 dark:bg-slate-900">
          <div class="chat-bubble-bot p-3.5 shadow-sm text-slate-800 dark:text-slate-200">
            Bienvenido al canal de consulta técnica de <strong>Maestros de la Construcción</strong>.
            <br><br>¿En qué podemos ayudarte? Puedes consultar sobre precios de reformas por metro cuadrado en Valencia, tiempos de ejecución, pladur con iluminación indirecta o gestión de licencias.
          </div>
        </div>

        <!-- Sugerencias rápidas sin emojis -->
        <div class="px-3 py-2 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex gap-1.5 overflow-x-auto text-[11px] whitespace-nowrap scrollbar-none">
          <button class="quick-chip bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition">Zonas de actuación en Valencia</button>
          <button class="quick-chip bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition">Precio reforma de baño</button>
          <button class="quick-chip bg-slate-100 hover:bg-amber-100 dark:bg-slate-800 dark:hover:bg-amber-500/20 text-slate-700 dark:text-slate-300 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700 transition">Plazos de ejecución</button>
        </div>

        <!-- Input Box -->
        <form id="ai-chat-form" class="p-3 bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input type="text" id="ai-user-input" placeholder="Escribe tu consulta sobre obras o reformas..." class="flex-1 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-amber-500">
          <button type="submit" class="bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-xl transition flex-shrink-0" aria-label="Enviar mensaje">
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

    if (this.localKey) {
      keyInput.value = this.localKey;
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
      this.localKey = val;
      localStorage.setItem('gemini_api_key', val);
      keyPanel.classList.add('hidden');
      this.addBotMessage('Clave guardada correctamente.');
    });

    document.querySelectorAll('.quick-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        this.handleUserMessage(chip.textContent);
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
    div.className = 'chat-bubble-user p-3.5 ml-auto max-w-[85%] text-sm shadow-sm';
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  addBotMessage(html) {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.className = 'chat-bubble-bot p-3.5 shadow-sm max-w-[90%] text-sm';
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
      <span class="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></span>
      <span class="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-2 h-2 rounded-full bg-amber-500 animate-bounce [animation-delay:0.4s]"></span>
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

    // 1. Intentar backend Vercel
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          this.removeTypingIndicator();
          const formatted = data.reply
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
          this.addBotMessage(formatted);
          return;
        }
      }
    } catch (err) {
      // Continuar con fallback
    }

    // 2. Clave directa local si existe
    if (this.localKey) {
      try {
        const response = await this.callGeminiDirect(text);
        this.removeTypingIndicator();
        this.addBotMessage(response);
        return;
      } catch (err) {
        console.warn('Fallback a conocimiento local:', err);
      }
    }

    // 3. Motor experto local
    setTimeout(() => {
      this.removeTypingIndicator();
      const answer = this.getLocalAnswer(text);
      this.addBotMessage(answer);
    }, 500);
  }

  getLocalAnswer(query) {
    const lower = query.toLowerCase();
    for (const item of this.localResponses) {
      if (item.triggers.some(t => lower.includes(t))) {
        return item.answer;
      }
    }

    return `Para asesorarte con precisión sobre <em>"${query}"</em> y valorar tu vivienda en persona, te sugerimos agendar una visita técnica gratuita con Fabio Toro:<br><br><strong>WhatsApp directo:</strong> <a href="https://wa.me/34622851328" class="text-amber-600 dark:text-amber-400 font-bold underline" target="_blank">622 851 328</a><br>También puedes utilizar nuestro <strong>Simulador de Presupuestos</strong> en la web.`;
  }

  async callGeminiDirect(userQuery) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.localKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `Eres el asesor técnico de Maestros de la Construcción en Valencia. Responde de forma cordial, seria, experta y concisa sobre reformas en Valencia (WhatsApp 622 851 328). Pregunta: ${userQuery}` }]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 300
      }
    };

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Error en API directa');
    const data = await res.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return candidate
        .replace(/\n\n/g, '<br><br>')
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    }
    throw new Error('Respuesta vacía');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.maestroAIAssistant = new ConstructionAIAssistant();
});
