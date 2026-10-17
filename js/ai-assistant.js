/**
 * ASISTENTE TÉCNICO VIRTUAL - MAESTROS DE LA CONSTRUCCIÓN
 * Valencia, España | Tel: 722 851 328
 * Diseño Arquitectónico Responsivo, Cómodo en Móvil y Escritorio
 */

class ConstructionAIAssistant {
  constructor() {
    this.localKey = localStorage.getItem('gemini_api_key') || '';
    this.isOpen = false;

    this.localResponses = [
      {
        triggers: ["zona", "donde", "dónde", "valencia", "pueblo", "desplaz", "ciudades", "torrent", "paterna", "burjassot", "betera", "bétera", "sagunto"],
        answer: "Trabajamos en toda la ciudad de **Valencia** (Ruzafa, Campanar, Ciutat Vella, El Carmen, Eixample, Poblats Marítims...) y toda el área metropolitana y comarcas: **Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto y Manises**.<br><br>Nos desplazamos a tu vivienda para medir y asesorarte **sin coste ni compromiso**."
      },
      {
        triggers: ["precio", "cuanto", "cuánto", "coste", "cuesta", "tarifa", "metro", "m2", "presupuesto", "estimacion"],
        answer: "Precios de referencia reales en el mercado de Valencia:<br>• **Reforma de Baño Completo (alicatado porcelánico y plato resina):** De 2.900€ a 4.900€.<br>• **Pladur y Fosa LED de salón:** Desde 38€ a 55€/m² según diseño.<br>• **Alisado de paredes y eliminación de gotelé:** De 12€ a 18€/m² con masillado a espejo.<br>• **Reforma Integral de Vivienda:** De 480€ a 750€/m² (sujeta a disponibilidad de agenda).<br><br>Puedes usar nuestro **Simulador Interactivo de Presupuestos** en la web o escribirnos al WhatsApp <a href='https://wa.me/34722851328' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>722 851 328</a>."
      },
      {
        triggers: ["tiempo", "plazo", "tarda", "duracion", "duración", "semanas", "meses", "dias"],
        answer: "Fijamos plazos por escrito con compromiso de cumplimiento:<br>• **Reforma de baño completa:** 7 a 10 días laborables.<br>• **Fosas LED y techos de pladur:** 3 a 5 días.<br>• **Alisado y pintura de piso:** 5 a 8 días.<br>• **Reforma completa de piso:** Entre 5 y 8 semanas según proyecto.<br><br>Coordinamos todos los gremios directamente sin subcontratas externas."
      },
      {
        triggers: ["licencia", "permiso", "ayuntamiento", "declaracion", "obra mayor", "obra menor"],
        answer: "En Valencia la inmensa mayoría de reformas interiores (cambio de azulejos, suelos, sanitarios, electricidad y pladur) se tramitan mediante **Declaración Responsable** ante el Ayuntamiento, lo que te permite empezar la obra de inmediato una vez registrada.<br><br>Te asesoramos en la tramitación para tu total seguridad."
      },
      {
        triggers: ["pladur", "led", "luz", "salon", "techo", "fosa", "hornacina"],
        answer: "El pladur técnico con iluminación indirecta es una de nuestras máximas especialidades. Realizamos:<br>• Techos suspendidos con fosa perimetral para tira LED continua.<br>• Muebles de salón y frentes para TV con hornacinas a medida.<br>• Tabiques fonoabsorbentes con aislamiento acústico de lana de roca."
      },
      {
        triggers: ["bano", "baño", "ducha", "banera", "bañera", "alicatado", "plato"],
        answer: "En reformas de baños realizamos el cambio integral en 7-10 días:<br>• Sustitución de bañera por plato de ducha de resina antideslizante C3.<br>• Fontanería nueva multicapa y desagües de PVC.<br>• Alicatado porcelánico rectificado con niveladores milimétricos.<br>• Mamparas fijas con perfilería negra o cromada y grifería empotrada."
      },
      {
        triggers: ["contacto", "telefono", "teléfono", "whatsapp", "email", "llamar", "visita"],
        answer: "Puedes comunicarte directamente con el responsable técnico:<br>• **WhatsApp / Llamada directa:** <a href='https://wa.me/34722851328' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>722 851 328</a><br>• **Instagram:** <a href='https://instagram.com/somosmaestrosdelaconstruccion' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>@somosmaestrosdelaconstruccion</a><br><br>¿Quieres que pasemos por tu vivienda a tomar medidas?"
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
      <!-- Botón Flotante Disparador -->
      <button id="ai-chat-toggle" class="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex items-center gap-2.5 bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white font-bold px-4 py-3 rounded-lg shadow-xl border border-stone-700 dark:border-amber-400 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0" aria-label="Abrir asistente técnico">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
        </span>
        <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <span class="text-xs tracking-wider uppercase font-mono-tech hidden sm:inline">Oficina Técnica Virtual</span>
      </button>

      <!-- Modal de Chat Arquitectónico & Responsivo -->
      <div id="ai-chat-modal" class="fixed inset-x-2 bottom-3 top-14 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[420px] sm:h-[600px] sm:max-h-[85vh] bg-white dark:bg-[#181a20] border-2 border-stone-300 dark:border-stone-700 rounded-lg shadow-2xl z-50 flex flex-col hidden overflow-hidden transition-all duration-200">
        
        <!-- Header Técnico -->
        <div class="bg-stone-100 dark:bg-[#111317] p-3.5 px-4 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between flex-shrink-0">
          <div class="flex items-center gap-2.5">
            <div class="w-8 h-8 rounded bg-amber-600 text-white flex items-center justify-center font-black text-xs font-heading">
              MC
            </div>
            <div>
              <div class="flex items-center gap-2">
                <h4 class="font-bold text-stone-900 dark:text-white text-xs uppercase tracking-wider font-mono-tech">
                  Oficina Técnica
                </h4>
                <span class="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  En Línea
                </span>
              </div>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">Asesor de Obras & Reformas Valencia</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="ai-key-config-btn" title="Configurar clave Gemini" class="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-amber-400 rounded">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button id="ai-chat-close" class="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded" aria-label="Cerrar chat">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Panel de Clave Opcional -->
        <div id="ai-key-panel" class="p-3 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs hidden flex-shrink-0">
          <p class="text-stone-700 dark:text-stone-300 mb-1.5 font-medium">Clave directa Gemini API (Opcional):</p>
          <div class="flex gap-2">
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." class="flex-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-stone-900 dark:text-white text-xs">
            <button id="save-key-btn" class="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded text-xs transition">Guardar</button>
          </div>
        </div>

        <!-- Mensajes del Chat con Scroll Suave -->
        <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm bg-stone-50/50 dark:bg-[#15171d]">
          <div class="p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed text-xs sm:text-sm">
            Hola. Bienvenido al canal de consulta técnica de <strong>Maestros de la Construcción</strong> en Valencia.
            <br><br>Puedes consultarme sobre precios de reformas, pladur con iluminación LED, baños con plato de resina o plazos de obra. ¿Qué tienes en mente reformar?
          </div>
        </div>

        <!-- Sugerencias Rápidas Desplazables con el Dedo -->
        <div class="p-2.5 px-3 bg-stone-100 dark:bg-[#111317] border-t border-stone-200 dark:border-stone-800 flex gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-none flex-shrink-0">
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Reforma de Baño</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Pladur & Fosas LED</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Zonas en Valencia</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Plazos de Obra</button>
        </div>

        <!-- Formulario de Entrada Anclado -->
        <form id="ai-chat-form" class="p-3 bg-white dark:bg-[#181a20] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 flex-shrink-0">
          <input type="text" id="ai-user-input" placeholder="Pregunta sobre tu obra o reforma..." class="flex-1 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:outline-none focus:border-amber-600">
          <button type="submit" class="bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-md transition flex-shrink-0" aria-label="Enviar consulta">
            <svg class="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
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
    div.className = 'p-3 rounded-lg ml-auto max-w-[85%] text-xs sm:text-sm bg-amber-600 text-white font-medium shadow-sm';
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  addBotMessage(html) {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.className = 'p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed max-w-[90%] text-xs sm:text-sm';
    div.innerHTML = html;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
  }

  showTypingIndicator() {
    const box = document.getElementById('ai-chat-messages');
    const div = document.createElement('div');
    div.id = 'typing-indicator';
    div.className = 'p-2.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-400 text-xs flex items-center gap-1.5 w-16';
    div.innerHTML = `
      <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.2s]"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-bounce [animation-delay:0.4s]"></span>
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
        console.warn('Fallback a conocimiento técnico local:', err);
      }
    }

    // 3. Motor experto local especializado en Valencia
    setTimeout(() => {
      this.removeTypingIndicator();
      const answer = this.getLocalAnswer(text);
      this.addBotMessage(answer);
    }, 400);
  }

  getLocalAnswer(query) {
    const lower = query.toLowerCase();
    for (const item of this.localResponses) {
      if (item.triggers.some(t => lower.includes(t))) {
        return item.answer;
      }
    }

    return `Para valorar con precisión tu proyecto de <em>"${query}"</em> y ofrecerte un presupuesto cerrado sin compromiso, el oficial técnico puede visitar tu vivienda en Valencia:<br><br><strong>WhatsApp directo:</strong> <a href="https://wa.me/34722851328" class="text-amber-600 dark:text-amber-400 font-bold underline" target="_blank">722 851 328</a><br>También puedes calcular un coste estimado en nuestro <strong>Simulador Interactivo</strong>.`;
  }

  async callGeminiDirect(userQuery) {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${this.localKey}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `Eres el asesor técnico de Maestros de la Construcción en Valencia. Responde como un maestro de obra experimentado, serio, profesional y claro sobre reformas en Valencia (WhatsApp 722 851 328). Pregunta del cliente: ${userQuery}` }]
        }
      ],
      generationConfig: {
        temperature: 0.6,
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
