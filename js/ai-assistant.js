/**
 * ASISTENTE VIRTUAL INTELIGENTE CON GOOGLE GEMINI
 * Maestros de la Construcción - Valencia
 * Trato Directo de Oficial a Propietario | Tel/WhatsApp: 722 851 328
 */

const AI_SYSTEM_PROMPT = `Eres el Asesor Virtual oficial de "Maestros de la Construcción" en Valencia (España).
Tu misión es atender, asesorar y resolver dudas sobre reformas y obras con total naturalidad, criterio técnico y cercanía artesana, orientando al usuario para que solicite una visita técnica gratuita o contacte por WhatsApp.

IDENTIDAD Y VALOR DE LA EMPRESA:
- Hablas como un maestro de obra experimentado, serio, técnico y cercano. Hablas siempre en primera persona del plural ("nosotros", "nuestro equipo de oficiales").
- Modelo de negocio: "Directo de Oficial a Propietario". Sin comerciales intermediarios ni sobrecostes de empresa tradicional (un 30-40% más económicos y con control técnico directo a pie de obra).
- Más de 15 años de oficio real en reformas y albañilería en Valencia y comarcas.
- Cobertura: Valencia capital (todos los barrios: Ruzafa, Campanar, Benimaclet, El Carmen, Eixample, etc.) y área metropolitana (Torrent, Paterna, Burjassot, Godella, Mislata, Alaquàs, Bétera, Sagunto, Manises).

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
3. Obra limpia: protección obligatoria de zonas comunes, ascensores y suelos; retirada diaria de escombros a punto limpio homologado.
4. Horario de atención: Lunes a Viernes de 07:00 a 17:00.
5. Teléfono y WhatsApp oficial: 722 851 328. Correo: contacto@maestrosdelaconstruccion.es.

REGLAS DE CONVERSACIÓN Y DERIVACIÓN (MUY IMPORTANTE):
1. NO USES RESPUESTAS AUTOMATIZADAS NI FRASES CLICHÉ ROBÓTICAS. Genera respuestas vivas, naturales, dinámicas y personalizadas para cada consulta, como si hablaras por WhatsApp con un cliente de confianza.
2. Sé conciso y claro (máximo 2 a 3 párrafos cortos). Usa formato markdown limpio con negritas para destacar cifras y datos clave.
3. Si el usuario te saluda, dale la bienvenida amablemente como el asesor técnico de Maestros de la Construcción y pregúntale qué tiene en mente reformar.
4. Si preguntan dudas técnicas (diferencias de materiales, gotelé al temple vs plástico, platos de carga mineral, cuñas autonivelantes), asesórales con conocimiento constructivo real.
5. GUARDARRAÍL DE DERIVACIÓN (CUANDO SE SALE DEL GUIÓN O QUIERE CERRAR):
   En el momento en que el usuario pregunte por algo fuera de catálogo, solicite un presupuesto exacto cerrado final, pregunte por fechas exactas de inicio o detalles que requieran ver su vivienda en persona:
   Derívalo con total naturalidad hacia WhatsApp:
   "Para ver tu estancia y darte un presupuesto exacto cerrado sin compromiso, lo ideal es que nos envíes fotos o nos escribas por WhatsApp al **722 851 328**. También podemos acordar un día para pasar a medir sin ningún coste."
6. No inventes precios que contradigan las tarifas base de referencia.`;

class ConstructionAIAssistant {
  constructor() {
    this.localKey = localStorage.getItem('gemini_api_key') || '';
    this.isOpen = false;
    this.chatHistory = [];

    this.init();
  }

  init() {
    this.createWidgetDOM();
    this.bindEvents();
    this.updateStatusBadge();
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
                <span id="ai-status-pill" class="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono-tech">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  En Línea
                </span>
              </div>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">Asesor Virtual · IA Gemini 1.5</p>
            </div>
          </div>
          <div class="flex items-center gap-1">
            <button id="ai-key-config-btn" title="Configurar clave Google AI Studio" class="p-1.5 text-stone-400 hover:text-stone-700 dark:hover:text-amber-400 rounded transition">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
            </button>
            <button id="ai-chat-close" class="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded" aria-label="Cerrar chat">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>
        </div>

        <!-- Panel de Clave Google AI Studio -->
        <div id="ai-key-panel" class="p-3 bg-stone-100 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs hidden flex-shrink-0 space-y-2">
          <div class="flex items-center justify-between">
            <span class="text-stone-800 dark:text-stone-200 font-bold font-mono-tech">Clave Google AI Studio</span>
            <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer" class="text-amber-600 hover:underline text-[11px]">Obtener clave gratis →</a>
          </div>
          <div class="flex gap-2">
            <input type="password" id="gemini-key-input" placeholder="AIzaSy..." class="flex-1 bg-white dark:bg-stone-800 border border-stone-300 dark:border-stone-700 rounded px-2.5 py-1.5 text-stone-900 dark:text-white text-xs font-mono-tech">
            <button id="save-key-btn" class="bg-amber-600 hover:bg-amber-500 text-white font-bold px-3 py-1.5 rounded text-xs transition">Guardar</button>
          </div>
          <p class="text-[10px] text-stone-500 dark:text-stone-400">
            Tu clave se almacena de forma segura en tu navegador y activa respuestas inteligentes con todo el contexto del proyecto.
          </p>
        </div>

        <!-- Mensajes del Chat con Scroll Suave -->
        <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm bg-stone-50/50 dark:bg-[#15171d]">
          <div class="p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed text-xs sm:text-sm">
            Hola. Bienvenido a <strong>Maestros de la Construcción</strong> en Valencia.
            <br><br>Soy tu asesor virtual. Puedes consultarme cualquier duda técnica sobre reformas de baños, pladur, gotelé, cocinas, materiales o plazos de obra. ¿En qué proyecto estás pensando?
          </div>
        </div>

        <!-- Sugerencias Rápidas -->
        <div class="p-2.5 px-3 bg-stone-100 dark:bg-[#111317] border-t border-stone-200 dark:border-stone-800 flex gap-2 overflow-x-auto text-xs whitespace-nowrap scrollbar-none flex-shrink-0">
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Reforma de Baño</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Pladur & Fosas LED</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Tarifas Base</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Zonas en Valencia</button>
          <button class="quick-chip bg-white dark:bg-stone-800 hover:bg-amber-50 dark:hover:bg-stone-700 border border-stone-300 dark:border-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1.5 rounded font-medium transition active:scale-95">Visita Gratuita</button>
        </div>

        <!-- Formulario de Entrada Anclado -->
        <form id="ai-chat-form" class="p-3 bg-white dark:bg-[#181a20] border-t border-stone-200 dark:border-stone-800 flex items-center gap-2 flex-shrink-0">
          <input type="text" id="ai-user-input" placeholder="Pregunta sobre tu reforma o pide presupuesto..." class="flex-1 bg-stone-100 dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-stone-900 dark:text-white text-xs sm:text-sm rounded-md px-3.5 py-2.5 focus:outline-none focus:border-amber-600">
          <button type="submit" class="bg-amber-600 hover:bg-amber-500 text-white p-2.5 rounded-md transition flex-shrink-0" aria-label="Enviar consulta">
            <svg class="w-4 h-4 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(wrapper);
  }

  updateStatusBadge() {
    const pill = document.getElementById('ai-status-pill');
    if (!pill) return;
    if (this.localKey) {
      pill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Gemini IA Activa`;
      pill.className = "inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono-tech";
    } else {
      pill.innerHTML = `<span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> En Línea`;
      pill.className = "inline-flex items-center gap-1 text-[10px] text-amber-700 dark:text-amber-400 font-semibold bg-amber-100 dark:bg-amber-950/40 px-1.5 py-0.5 rounded font-mono-tech";
    }
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

    if (this.localKey && keyInput) {
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
      if (!keyPanel.classList.contains('hidden')) {
        keyInput?.focus();
      }
    });

    saveKeyBtn?.addEventListener('click', () => {
      const val = keyInput.value.trim();
      if (!val) {
        localStorage.removeItem('gemini_api_key');
        this.localKey = '';
        this.updateStatusBadge();
        keyPanel.classList.add('hidden');
        this.addBotMessage('Clave eliminada. El asistente responderá mediante el servidor o te pedirá configurar una clave.');
        return;
      }
      this.localKey = val;
      localStorage.setItem('gemini_api_key', val);
      this.updateStatusBadge();
      keyPanel.classList.add('hidden');
      this.addBotMessage('Clave de Google AI Studio guardada con éxito. Ya estoy conectado a Gemini en vivo.');
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
    div.className = 'p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed max-w-[92%] text-xs sm:text-sm';
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

    // Guardar en memoria de conversación
    this.chatHistory.push({ role: 'user', text });

    // 1. Intentar backend seguro Vercel (/api/chat)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: this.chatHistory })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          this.removeTypingIndicator();
          this.chatHistory.push({ role: 'model', text: data.reply });
          this.addBotMessage(this.formatMarkdown(data.reply));
          return;
        }
      }
    } catch (_) {
      // Continuar al cliente directo si el backend no está disponible
    }

    // 2. Si hay clave local de Google AI Studio, conectar directamente con Gemini
    if (this.localKey) {
      try {
        const reply = await this.callGeminiDirect(text);
        this.removeTypingIndicator();
        this.chatHistory.push({ role: 'model', text: reply });
        this.addBotMessage(this.formatMarkdown(reply));
        return;
      } catch (err) {
        console.warn('Error en Gemini Direct:', err.message);
        this.removeTypingIndicator();
        this.addBotMessage(`⚠️ <strong>Aviso de conexión:</strong> ${this.escapeHtml(err.message)}.<br><br>Puedes verificar tu clave de Google AI Studio en el icono de ajustes superior o contactar directamente al oficial por WhatsApp en el <a href="https://wa.me/34722851328" target="_blank" class="font-bold underline text-amber-600">722 851 328</a>.`);
        return;
      }
    }

    // 3. Si no hay clave configurada en Vercel ni en el navegador:
    this.removeTypingIndicator();
    this.showNoKeyPrompt(text);
  }

  showNoKeyPrompt(lastQuery) {
    const keyPanel = document.getElementById('ai-key-panel');
    const div = document.createElement('div');
    div.className = 'p-3.5 rounded-lg border border-amber-500/40 bg-amber-50/50 dark:bg-amber-950/20 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed text-xs sm:text-sm space-y-2';
    div.innerHTML = `
      <p class="font-bold text-amber-800 dark:text-amber-400">Asistente Virtual con IA:</p>
      <p class="text-xs text-stone-600 dark:text-stone-300">
        Si configuraste <code class="font-mono bg-stone-200 dark:bg-stone-800 px-1 py-0.5 rounded font-bold">GEMINI_API_KEY</code> en Vercel, el servidor necesita desplegar este nuevo commit para activarla automáticamente.
      </p>
      <p class="text-xs text-stone-600 dark:text-stone-300">
        También puedes introducir tu clave directamente pulsando el icono <strong>⚙️</strong> superior para usar la IA en vivo en tu navegador.
      </p>
      <div class="pt-1 flex flex-wrap gap-2">
        <button id="open-key-panel-btn" class="btn-cta-construction py-2 px-3 text-xs font-bold uppercase tracking-wider rounded">
          Introducir Clave Aquí
        </button>
        <a href="https://wa.me/34722851328?text=${encodeURIComponent('Hola, me gustaría consultar una duda sobre una reforma: ' + lastQuery)}" target="_blank" rel="noopener noreferrer" class="btn-secondary-construction py-2 px-3 text-xs font-bold uppercase tracking-wider rounded">
          Consultar por WhatsApp
        </a>
      </div>
    `;

    const box = document.getElementById('ai-chat-messages');
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;

    document.getElementById('open-key-panel-btn')?.addEventListener('click', () => {
      keyPanel?.classList.remove('hidden');
      document.getElementById('gemini-key-input')?.focus();
    });
  }

  async callGeminiDirect(userQuery) {
    const contents = [];

    // Incluir memoria conversacional previa
    this.chatHistory.slice(-8).forEach(item => {
      if (item && item.role && item.text) {
        contents.push({
          role: item.role === 'user' ? 'user' : 'model',
          parts: [{ text: item.text.slice(0, 800) }]
        });
      }
    });

    const payload = {
      systemInstruction: {
        parts: [{ text: AI_SYSTEM_PROMPT }]
      },
      contents,
      generationConfig: {
        temperature: 0.65,
        maxOutputTokens: 400,
        topP: 0.95
      }
    };

    let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(this.localKey.trim())}`;

    let response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const fbEndpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${encodeURIComponent(this.localKey.trim())}`;
      const fbResponse = await fetch(fbEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (fbResponse.ok) {
        response = fbResponse;
      }
    }

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      const msg = errData.error?.message || 'Error de autenticación con la clave de Google AI Studio';
      throw new Error(msg);
    }

    const data = await response.json();
    const candidate = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (candidate) {
      return candidate;
    }
    throw new Error('Respuesta vacía del modelo Gemini');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.maestroAIAssistant = new ConstructionAIAssistant();
});
