/**
 * MAESTROS DE LA CONSTRUCCIÓN - VALENCIA
 * Lógica Principal: Selector de Tema, Slider Antes/Después, Filtros de Obras
 */

// 1. GESTOR DE TEMA (MODO CLARO POR DEFECTO / OSCURO OPCIONAL)
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  updateThemeToggleButtons();
}

function toggleTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  if (isDark) {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }
  updateThemeToggleButtons();
}

function updateThemeToggleButtons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcon = `<svg class="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>`;
  const moonIcon = `<svg class="w-4 h-4 text-stone-700 dark:text-stone-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>`;

  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    const slot = btn.querySelector('.theme-icon-slot');
    const label = btn.querySelector('.theme-label');
    if (slot) {
      slot.innerHTML = isDark ? sunIcon : moonIcon;
      if (label) {
        label.textContent = isDark ? 'MODO CLARO (ACTIVAR)' : 'MODO OSCURO (ACTIVAR)';
      }
    } else {
      btn.innerHTML = isDark ? sunIcon : moonIcon;
    }
  });
}

// Inicializar inmediatamente para evitar parpadeos
initTheme();

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar todos los botones de tema presentes en la página
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.addEventListener('click', toggleTheme);
  });

  // 2. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 3. Navbar Scroll Shadow Effect
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 15) {
        navbar.classList.add('shadow-md');
      } else {
        navbar.classList.remove('shadow-md');
      }
    });
  }

  // 4. FAQ Accordion Toggle
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      const isOpen = !content.classList.contains('hidden');

      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        icon?.classList.add('rotate-180');
      }
    });
  });

  // 5. Filtros de Galería de Obras
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach(b => {
          b.classList.remove('bg-amber-600', 'text-white', 'font-bold', 'border-amber-700', 'shadow-sm');
          b.classList.add('bg-stone-200/80', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300', 'border-stone-300', 'dark:border-stone-700');
        });
        btn.classList.add('bg-amber-600', 'text-white', 'font-bold', 'border-amber-700', 'shadow-sm');
        btn.classList.remove('bg-stone-200/80', 'dark:bg-stone-800', 'text-stone-700', 'dark:text-stone-300', 'border-stone-300', 'dark:border-stone-700');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 30);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96)';
            setTimeout(() => { item.classList.add('hidden'); }, 180);
          }
        });
      });
    });
  }

  // 6. Interactive Before / After Slider
  initBeforeAfterSlider();

  // 7. Interactive Hero Photo Showcase Switcher
  initHeroPhotoSwitcher();

  // 8. Contador & Analítica de Clics a WhatsApp
  initWhatsAppClickTracker();
});

// GESTIÓN Y SEGUIMIENTO DE CLICS A WHATSAPP
function initWhatsAppClickTracker() {
  const STORAGE_KEY = 'mdlc_wa_clicks';
  const VISIBLE_KEY = 'mdlc_wa_tracker_visible';

  function getClicks() {
    return parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);
  }

  function incrementClick() {
    const next = getClicks() + 1;
    localStorage.setItem(STORAGE_KEY, next.toString());
    updateBadgeUI(next);

    // Disparador opcional para Google Ads (gtag) si se activa en el futuro
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-CONVERSION_ID',
        'event_category': 'Contact',
        'event_label': 'WhatsApp Click'
      });
    }
    console.info(`[Analytics] Clic registrado a WhatsApp. Total acumulado: ${next}`);
  }

  // Interceptar todos los enlaces y botones que apunten a WhatsApp
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"], button[id*="whatsapp"]').forEach(el => {
    el.addEventListener('click', () => {
      incrementClick();
    });
  });

  // Interceptar envíos de formulario directo a WhatsApp
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', () => {
      incrementClick();
    });
  }

  function isVisible() {
    // Solo visible si el admin lo activó explícitamente o si la URL lleva ?admin=1
    const urlParams = new URLSearchParams(window.location.search);
    return localStorage.getItem(VISIBLE_KEY) === '1' || urlParams.get('admin') === '1';
  }

  function toggleBadgeVisibility(forceState) {
    const currentState = isVisible();
    const nextState = (typeof forceState === 'boolean') ? forceState : !currentState;

    localStorage.setItem(VISIBLE_KEY, nextState ? '1' : '0');
    const badge = document.getElementById('wa-tracker-badge');
    if (badge) {
      badge.style.display = nextState ? 'inline-flex' : 'none';
      if (nextState) {
        updateBadgeUI(getClicks());
      }
    }
    console.info(`[Analytics] Panel Leads WhatsApp ${nextState ? 'ACTIVADO' : 'OCULTO'}`);
  }

  // Atajo de teclado secreto: ALT + SHIFT + A
  window.addEventListener('keydown', (e) => {
    if (e.altKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      toggleBadgeVisibility();
    }
  });

  // Atajo móvil alternativo: 3 toques rápidos en el logo del footer
  const footerLogos = document.querySelectorAll('footer img[src*="logo.jpg"]');
  let tapCount = 0;
  let tapTimer = null;
  footerLogos.forEach(logo => {
    logo.addEventListener('click', () => {
      tapCount++;
      clearTimeout(tapTimer);
      if (tapCount >= 3) {
        tapCount = 0;
        toggleBadgeVisibility();
      } else {
        tapTimer = setTimeout(() => { tapCount = 0; }, 600);
      }
    });
  });

  // Inyectar panel de métricas (completamente oculto por defecto con display: none)
  function createTrackerBadge() {
    if (document.getElementById('wa-tracker-badge')) return;
    const badge = document.createElement('div');
    badge.id = 'wa-tracker-badge';
    const initiallyVisible = isVisible();
    badge.className = 'fixed bottom-4 left-4 z-50 bg-stone-900/95 dark:bg-stone-800/95 backdrop-blur-md text-white border border-amber-500/60 rounded-lg px-3 py-1.5 shadow-2xl font-mono-tech text-[10px] items-center gap-2 cursor-pointer transition select-none';
    badge.style.display = initiallyVisible ? 'inline-flex' : 'none';
    badge.title = 'Contador Secreto de Leads WhatsApp (Clic para resetear · Alt+Shift+A para ocultar)';
    
    badge.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0"></span>
      <span class="text-stone-300">LEADS WHATSAPP:</span>
      <strong id="wa-tracker-count" class="text-amber-400 font-bold text-xs">${getClicks()}</strong>
      <button type="button" id="wa-tracker-close" class="ml-1 text-stone-400 hover:text-white font-bold p-0.5 rounded leading-none text-xs" title="Ocultar (Alt+Shift+A)">✕</button>
    `;

    // Clic en la píldora para reiniciar el contador si se confirma
    badge.addEventListener('click', (e) => {
      if (e.target && e.target.id === 'wa-tracker-close') {
        e.stopPropagation();
        toggleBadgeVisibility(false);
        return;
      }
      if (confirm(`¿Quieres reiniciar el contador de clics a WhatsApp? (Total actual: ${getClicks()})`)) {
        localStorage.setItem(STORAGE_KEY, '0');
        updateBadgeUI(0);
      }
    });

    document.body.appendChild(badge);
  }

  function updateBadgeUI(count) {
    const countEl = document.getElementById('wa-tracker-count');
    if (countEl) countEl.textContent = count;
  }

  createTrackerBadge();
}

function initHeroPhotoSwitcher() {
  const photoBtns = document.querySelectorAll('.hero-photo-btn');
  const mainPhoto = document.getElementById('hero-main-photo');
  const photoTitle = document.getElementById('hero-photo-title');
  const photoDesc = document.getElementById('hero-photo-desc');
  const photoTag = document.getElementById('hero-photo-tag');
  const photoTime = document.getElementById('hero-photo-time');
  const photoStatus = document.getElementById('hero-photo-status');

  if (!photoBtns.length || !mainPhoto) return;

  photoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const img = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      const desc = btn.getAttribute('data-desc');
      const tag = btn.getAttribute('data-tag');
      const time = btn.getAttribute('data-time');
      const status = btn.getAttribute('data-status');

      // Actualizar estados visuales de los botones
      photoBtns.forEach(b => {
        b.classList.remove('active', 'border-2', 'border-amber-600', 'bg-amber-500/10');
        b.classList.add('border', 'border-stone-300', 'dark:border-stone-700');
        const span = b.querySelector('span');
        if (span) {
          span.classList.remove('text-amber-600', 'dark:text-amber-400');
          span.classList.add('text-stone-700', 'dark:text-stone-300');
        }
      });

      btn.classList.add('active', 'border-2', 'border-amber-600', 'bg-amber-500/10');
      btn.classList.remove('border-stone-300', 'dark:border-stone-700');
      const activeSpan = btn.querySelector('span');
      if (activeSpan) {
        activeSpan.classList.add('text-amber-600', 'dark:text-amber-400');
        activeSpan.classList.remove('text-stone-700', 'dark:text-stone-300');
      }

      // Animación suave de cambio de foto y textos
      mainPhoto.style.opacity = '0.3';
      if (photoTitle) photoTitle.style.opacity = '0.3';
      if (photoDesc) photoDesc.style.opacity = '0.3';

      setTimeout(() => {
        if (img) mainPhoto.src = img;
        if (title && photoTitle) photoTitle.textContent = title;
        if (desc && photoDesc) photoDesc.textContent = desc;
        if (tag && photoTag) photoTag.textContent = tag;
        if (time && photoTime) photoTime.textContent = time;
        if (status && photoStatus) photoStatus.textContent = status;

        mainPhoto.style.opacity = '1';
        if (photoTitle) photoTitle.style.opacity = '1';
        if (photoDesc) photoDesc.style.opacity = '1';
      }, 150);
    });
  });
}

function initBeforeAfterSlider() {
  const container = document.getElementById('ba-comparison');
  if (!container) return;

  const beforeBox = container.querySelector('.ba-before');
  const beforeImg = beforeBox?.querySelector('img');
  const sliderBar = container.querySelector('.ba-slider');
  if (!beforeBox || !sliderBar) return;

  let isDown = false;

  function syncImageWidth() {
    if (beforeImg && container) {
      beforeImg.style.width = container.offsetWidth + 'px';
    }
  }

  syncImageWidth();
  window.addEventListener('resize', syncImageWidth);

  function move(e) {
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    if (x < 15) x = 15;
    if (x > rect.width - 15) x = rect.width - 15;
    const percent = (x / rect.width) * 100;
    beforeBox.style.width = percent + '%';
    sliderBar.style.left = percent + '%';
  }

  container.addEventListener('mousedown', (e) => {
    isDown = true;
    move(e);
  });
  window.addEventListener('mouseup', () => isDown = false);
  window.addEventListener('mousemove', (e) => {
    if (isDown) move(e);
  });

  // Click directo para saltar a la posición
  container.addEventListener('click', (e) => {
    move(e);
  });

  // Touch eventos
  container.addEventListener('touchstart', (e) => {
    isDown = true;
    move(e);
  }, { passive: true });
  window.addEventListener('touchend', () => isDown = false);
  window.addEventListener('touchmove', (e) => {
    if (isDown) move(e);
  }, { passive: true });
}

