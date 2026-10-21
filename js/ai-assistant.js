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
        triggers: ["hola", "buenas", "buenos dias", "buenos días", "buenas tardes", "buenas noches", "hey", "saludos", "que tal", "qué tal", "ey", "inicio"],
        answer: "¡Hola! Bienvenido al canal de atención de <strong>Maestros de la Construcción</strong> en Valencia.<br><br>¿En qué tipo de obra o reforma te podemos asesorar?<br>• <strong>Baños y cambio de bañera por ducha</strong> (desde 590€ / 1.950€)<br>• <strong>Pladur técnico y techos con luz LED</strong> (desde 420€)<br>• <strong>Alisado de gotelé y pintura sin polvo</strong> (desde 450€)<br>• <strong>Cocinas completas y suelos porcelánicos</strong> (desde 2.600€)<br><br>Cuéntame qué tienes en mente o pregúntame por plazos, zonas y tarifas orientativas."
      },
      {
        triggers: ["zona", "donde", "dónde", "valencia", "pueblo", "desplaz", "ciudades", "torrent", "paterna", "burjassot", "betera", "bétera", "sagunto", "cobertura", "alrededores"],
        answer: "Trabajamos en toda la ciudad de **Valencia** (Ruzafa, Campanar, Ciutat Vella, El Carmen, Eixample, Benimaclet, Poblats Marítims...) y toda el área metropolitana: **Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto y Manises**.<br><br>Nos desplazamos a tu vivienda para medir y asesorarte **sin coste ni compromiso**."
      },
      {
        triggers: ["precio", "cuanto", "cuánto", "coste", "cuesta", "tarifa", "tarifas", "metro", "m2", "presupuesto", "estimacion"],
        answer: "Nuestras tarifas base directas de oficial para Valencia:<br>• **Cambio de Bañera por Ducha:** Desde 590€.<br>• **Reforma de Baño Completo:** Desde 1.950€.<br>• **Reforma de Cocina:** Desde 2.600€.<br>• **Pladur y Fosas LED:** Desde 26€/m² (estancia desde 420€).<br>• **Alisado de gotelé y pintura:** Desde 9€/m² (estancia desde 450€).<br>• **Suelos porcelánicos:** Desde 22€/m² (estancia desde 490€).<br>• **Reforma Integral de Vivienda:** Desde 18.500€.<br><br>Sin intermediarios ni comerciales. Puedes usar el simulador de la web o escribirnos al WhatsApp <a href='https://wa.me/34722851328' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>722 851 328</a>."
      },
      {
        triggers: ["tiempo", "plazo", "tarda", "duracion", "duración", "semanas", "meses", "dias", "días"],
        answer: "Fijamos plazos por escrito con compromiso estricto de cumplimiento:<br>• **Cambio de bañera por ducha:** 2 a 3 días.<br>• **Reforma de baño completa:** 7 a 10 días laborables.<br>• **Fosas LED y techos de pladur:** 3 a 6 días.<br>• **Alisado y pintura de piso:** 4 a 7 días.<br>• **Reforma de cocina:** 10 a 14 días.<br>• **Reforma integral de vivienda:** 4 a 8 semanas.<br><br>Coordinamos todos los gremios directamente para evitar parones en la obra."
      },
      {
        triggers: ["licencia", "permiso", "ayuntamiento", "declaracion", "declaración", "obra mayor", "obra menor"],
        answer: "En Valencia la inmensa mayoría de reformas interiores (azulejos, sanitarios, fontanería, pladur y pintura) se tramitan de forma ágil mediante **Declaración Responsable** ante el Ayuntamiento, permitiendo iniciar la obra de inmediato.<br><br>Nosotros te guiamos en la tramitación para tu total tranquilidad."
      },
      {
        triggers: ["pladur", "led", "luz", "salon", "salón", "techo", "fosa", "candileja", "hornacina"],
        answer: "El pladur técnico con iluminación indirecta es una de nuestras máximas especialidades:<br>• Techos suspendidos continuos con fosa perimetral para tira LED.<br>• Muebles de salón y frentes para TV con hornacinas a medida.<br>• Tabiques fonoabsorbentes con aislamiento de lana de roca.<br><br>Tarifas base desde **26€/m²** o techos de salón desde 420€."
      },
      {
        triggers: ["bano", "baño", "ducha", "banera", "bañera", "alicatado", "plato", "sanitario", "inodoro"],
        answer: "En reformas de baños ofrecemos dos soluciones clave:<br>• **Cambio de bañera por plato de ducha de resina C3:** Desde 590€ (ejecución limpia en 2-3 días).<br>• **Reforma integral de baño:** Desde 1.950€ (demolición, nueva fontanería multicapa, alicatado porcelánico rectificado con niveladores y montaje de sanitarios).<br><br>¿Te gustaría concertar una visita presencial gratuita para medir?"
      },
      {
        triggers: ["cocina", "cocinas", "fregadero", "encimera", "electrodomestico", "campana"],
        answer: "En reformas de cocinas en Valencia realizamos demolición, nuevas tomas de fontanería y electricidad, alicatado porcelánico y pavimento resistente desde **2.600€**. Plazo estimado de 10 a 14 días."
      },
      {
        triggers: ["pintura", "pintar", "gotele", "gotelé", "alisar", "alisado", "paredes lisas"],
        answer: "Realizamos alisado profesional de gotelé **sin polvo** (utilizamos lijadoras orbitales conectadas a sistemas de aspiración continua) y aplicación de pintura plástica lavable mate de primera marca. Tarifas desde **9€/m²** (o habitaciones desde 450€ / piso estándar desde 980€)."
      },
      {
        triggers: ["suelo", "suelos", "pavimento", "porcelanico", "porcelánico", "baldosa", "baldosas", "tarima", "rodapie", "rodapié"],
        answer: "Colocamos solados y pavimentos porcelánicos rectificados con cemento cola flexible C2TE S1 y nivelación milimétrica por cuñas desde **22€/m²** (estancias puntuales desde 490€)."
      },
      {
        triggers: ["visita", "medir", "cita", "quedar", "gratis", "gratuita", "desplazamiento", "venir", "casa", "piso"],
        answer: "Nos desplazamos **gratuitamente y sin ningún compromiso** a tu domicilio en Valencia capital y alrededores para verificar cotas, instalaciones y entregarte un presupuesto cerrado por escrito.<br><br>Puedes concertar tu visita ahora mismo por WhatsApp en el <a href='https://wa.me/34722851328' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>722 851 328</a>."
      },
      {
        triggers: ["aire", "climatizacion", "climatización", "carpinteria", "carpintería", "ventanas", "puertas", "gremios", "subcontrata"],
        answer: "Te hacemos la vida fácil: si tu reforma necesita trabajos complementarios como **aire acondicionado / climatización, carpintería de aluminio/PVC o electricidad general**, nosotros contactamos con nuestros instaladores de confianza y lo unificamos todo en un **único presupuesto cerrado**. Tú solo tratas con nosotros."
      },
      {
        triggers: ["quienes", "quiénes", "empresa", "oficial", "oficiales", "autonomo", "autónomo", "garantia", "garantía"],
        answer: "Somos **Maestros de la Construcción**, equipo de oficiales de albañilería y reformas con más de 15 años de oficio real en Valencia. No tenemos comerciales intermediarios: tratas directamente con el profesional que replantea y ejecuta la obra en tu vivienda, garantizando máxima calidad y precios directos de taller."
      },
      {
        triggers: ["contacto", "telefono", "teléfono", "whatsapp", "email", "llamar"],
        answer: "Puedes comunicarte directamente con el responsable técnico:<br>• **WhatsApp / Teléfono directo:** <a href='https://wa.me/34722851328' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>722 851 328</a><br>• **Correo:** <a href='mailto:contacto@maestrosdelaconstruccion.es' class='font-bold underline text-amber-600 dark:text-amber-400'>contacto@maestrosdelaconstruccion.es</a><br>• **Instagram:** <a href='https://instagram.com/somosmaestrosdelaconstruccion' target='_blank' class='font-bold underline text-amber-600 dark:text-amber-400'>@somosmaestrosdelaconstruccion</a><br><br>¿En qué podemos ayudarte hoy?"
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
        <span class="text-xs tracking-wider uppercase font-mono-tech hidden sm:inline">Atención al Cliente Virtual</span>
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
                  Atención al Cliente
                </h4>
                <span class="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  En Línea
                </span>
              </div>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">Asesor Virtual de Reformas Valencia</p>
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
            Hola. Bienvenido al canal de atención y consulta de <strong>Maestros de la Construcción</strong> en Valencia.
            <br><br>Puedes consultarme sobre tarifas base de reformas, pladur con iluminación LED, baños con plato de resina o plazos de obra. ¿Qué tienes en mente reformar?
          </div>
        </div>

        <!-- Sugerencias Rápidas Desplazables con el Dedo -->
        <div class="p-2.5 px-3 bg-stone-100 dark:bg-[#111317] border-t border-stone-200 dark:border-stone-800 flex gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-none flex-shrink-0">
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Reforma de Baño</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Pladur & Fosas LED</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Tarifas Base</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Zonas en Valencia</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Visita Gratuita</button>
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

  escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  formatMarkdown(rawText) {
    if (!rawText) return '';
    const safe = this.escapeHtml(rawText);
    return safe
      .replace(/\n\n/g, '<br><br>')
      .replace(/\n/g, '<br>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
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
          this.addBotMessage(this.formatMarkdown(data.reply));
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
        this.addBotMessage(this.formatMarkdown(response));
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
    const lower = (query || '').toLowerCase().trim();
    for (const item of this.localResponses) {
      if (item.triggers.some(t => lower.includes(t))) {
        return item.answer;
      }
    }

    return `Para poder orientarte con precisión sobre tu reforma en Valencia, indícanos qué estancia o trabajo tienes en mente (por ejemplo: reforma de baño, pladur con iluminación LED, alisado de gotelé, cocina o suelos), o consúltanos directamente:<br><br><strong>WhatsApp / Oficial directo:</strong> <a href="https://wa.me/34722851328" class="text-amber-600 dark:text-amber-400 font-bold underline" target="_blank" rel="noopener noreferrer">722 851 328</a><br>También puedes consultar nuestras tarifas en el <strong>Simulador Online</strong>.`;
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
      return candidate;
    }
    throw new Error('Respuesta vacía');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.maestroAIAssistant = new ConstructionAIAssistant();
});
