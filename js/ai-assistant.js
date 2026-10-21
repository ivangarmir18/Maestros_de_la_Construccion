/**
 * ASISTENTE VIRTUAL INTELIGENTE CON GOOGLE GEMINI
 * Maestros de la Construcción - Valencia
 * Trato Directo de Oficial a Propietario | Tel/WhatsApp: 722 851 328
 */

class ConstructionAIAssistant {
  constructor() {
    this.isOpen = false;
    this.chatHistory = [];

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
        
        <!-- Header Técnico Limpio (Sin engranaje ni peticiones técnicas) -->
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
                <span class="inline-flex items-center gap-1 text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold bg-emerald-100 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded font-mono-tech">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  En Línea
                </span>
              </div>
              <p class="text-[11px] text-stone-500 dark:text-stone-400">Asesor Virtual de Reformas en Valencia</p>
            </div>
          </div>
          <button id="ai-chat-close" class="p-1.5 text-stone-500 hover:text-stone-900 dark:hover:text-white rounded" aria-label="Cerrar chat">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>

        <!-- Mensajes del Chat con Scroll Suave -->
        <div id="ai-chat-messages" class="flex-1 p-4 overflow-y-auto space-y-3.5 text-sm bg-stone-50/50 dark:bg-[#15171d]">
          <div class="p-3.5 rounded-lg border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 shadow-sm leading-relaxed text-xs sm:text-sm">
            Hola. Bienvenido a <strong>Maestros de la Construcción</strong> en Valencia.
            <br><br>Soy tu asesor virtual. Puedes consultarme cualquier duda sobre reformas de baños, pladur con iluminación LED, alisado de gotelé, cocinas o plazos de obra. ¿Qué tienes en mente reformar?
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

  bindEvents() {
    const toggleBtn = document.getElementById('ai-chat-toggle');
    const modal = document.getElementById('ai-chat-modal');
    const closeBtn = document.getElementById('ai-chat-close');
    const form = document.getElementById('ai-chat-form');
    const input = document.getElementById('ai-user-input');

    const toggleChat = () => {
      this.isOpen = !this.isOpen;
      if (this.isOpen) {
        modal.classList.remove('hidden');
        input?.focus();
      } else {
        modal.classList.add('hidden');
      }
    };

    toggleBtn?.addEventListener('click', toggleChat);
    closeBtn?.addEventListener('click', () => {
      this.isOpen = false;
      modal.classList.add('hidden');
    });

    document.querySelectorAll('.quick-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        const query = btn.textContent.trim();
        this.handleUserMessage(query);
      });
    });

    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;
      input.value = '';
      this.handleUserMessage(text);
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

    try {
      // Enviar historial previo (sin duplicar el turno actual)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: this.chatHistory })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && data.reply) {
          this.removeTypingIndicator();
          // Guardar en memoria conversacional local
          this.chatHistory.push({ role: 'user', text });
          this.chatHistory.push({ role: 'model', text: data.reply });
          this.addBotMessage(this.formatMarkdown(data.reply));
          return;
        }
      }
    } catch (e) {
      console.warn('Conexión con /api/chat no disponible:', e.message);
    }

    // Si el backend no responde o hay error temporal:
    this.removeTypingIndicator();
    this.addBotMessage(`
      Disculpa, en este momento el canal de asesoría automática está ocupado.
      <br><br>
      Para atenderte de inmediato y valorar tu proyecto sin esperas, habla directamente con un oficial por WhatsApp:
      <br><br>
      <a href="https://wa.me/34722851328?text=${encodeURIComponent('Hola, me gustaría consultar una duda sobre una reforma: ' + text)}" target="_blank" rel="noopener noreferrer" class="btn-cta-construction py-2 px-3 text-xs inline-block font-bold uppercase tracking-wider rounded">
        WhatsApp Directo: 722 851 328
      </a>
    `);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.maestroAIAssistant = new ConstructionAIAssistant();
});
