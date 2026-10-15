/**
 * MAESTROS DE LA CONSTRUCCIÓN - Lógica Principal e Interactividad
 * Soporte de Modo Claro / Modo Oscuro, Slider Antes/Después y Calculadora
 * Valencia, España
 */

// 1. GESTOR DE TEMA (MODO CLARO POR DEFECTO / OSCURO OPCIONAL)
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  // Por defecto MODO CLARO salvo que el usuario haya seleccionado explícitamente 'dark'
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
  document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
    btn.setAttribute('aria-label', isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
    btn.innerHTML = isDark
      ? `<!-- Icono Sol (Modo Claro) -->
         <svg class="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
         </svg>`
      : `<!-- Icono Luna (Modo Oscuro) -->
         <svg class="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
         </svg>`;
  });
}

// Ejecutar inmediatamente para evitar parpadeo
initTheme();

document.addEventListener('DOMContentLoaded', () => {
  // Inicializar botones de cambio de tema
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

  // 3. Navbar Scroll Glass Effect
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
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
          b.classList.remove('bg-amber-600', 'text-white', 'font-bold');
          b.classList.add('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');
        });
        btn.classList.add('bg-amber-600', 'text-white', 'font-bold');
        btn.classList.remove('bg-slate-100', 'dark:bg-slate-800', 'text-slate-600', 'dark:text-slate-300');

        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 40);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.96)';
            setTimeout(() => { item.classList.add('hidden'); }, 200);
          }
        });
      });
    });
  }

  // 6. Interactive Before / After Slider
  initBeforeAfterSlider();

  // 7. Calculadora de presupuestos
  initBudgetCalculatorUI();
});

function initBeforeAfterSlider() {
  const container = document.getElementById('ba-comparison');
  if (!container) return;

  const beforeBox = container.querySelector('.ba-before');
  const sliderBar = container.querySelector('.ba-slider');
  let isDown = false;

  function move(e) {
    if (!isDown) return;
    const rect = container.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    let x = clientX - rect.left;
    if (x < 10) x = 10;
    if (x > rect.width - 10) x = rect.width - 10;
    const percent = (x / rect.width) * 100;
    beforeBox.style.width = percent + '%';
    sliderBar.style.left = percent + '%';
  }

  container.addEventListener('mousedown', () => isDown = true);
  window.addEventListener('mouseup', () => isDown = false);
  container.addEventListener('mousemove', move);

  container.addEventListener('touchstart', () => isDown = true);
  window.addEventListener('touchend', () => isDown = false);
  container.addEventListener('touchmove', move);
}

function initBudgetCalculatorUI() {
  const calcForm = document.getElementById('budget-calculator-form');
  if (!calcForm || !window.BudgetCalculator) return;

  const areaSlider = document.getElementById('calc-area-slider');
  const areaDisplay = document.getElementById('calc-area-display');
  const serviceSelect = document.getElementById('calc-service-type');
  const qualityRadios = document.querySelectorAll('input[name="calc-quality"]');
  const extraCheckboxes = document.querySelectorAll('input[name="calc-extra"]');
  
  const totalDisplay = document.getElementById('calc-result-total');
  const rangeDisplay = document.getElementById('calc-result-range');
  const timeDisplay = document.getElementById('calc-result-time');
  const laborDisplay = document.getElementById('calc-result-labor');
  const materialsDisplay = document.getElementById('calc-result-materials');
  const wasteDisplay = document.getElementById('calc-result-waste');
  const whatsappBtn = document.getElementById('calc-whatsapp-btn');

  function updateCalculation() {
    const serviceType = serviceSelect?.value || 'integral';
    const areaM2 = parseInt(areaSlider?.value || 75, 10);
    
    let quality = 'confort';
    qualityRadios.forEach(r => {
      if (r.checked) quality = r.value;
    });

    const extras = [];
    extraCheckboxes.forEach(cb => {
      if (cb.checked) extras.push(cb.value);
    });

    if (areaDisplay) {
      areaDisplay.textContent = `${areaM2} m²`;
    }

    const res = window.BudgetCalculator.calculate({
      serviceType,
      areaM2,
      quality,
      extras
    });

    if (totalDisplay) totalDisplay.textContent = `${res.totalEstimated.toLocaleString('es-ES')} €`;
    if (rangeDisplay) rangeDisplay.textContent = `${res.minRange.toLocaleString('es-ES')} € - ${res.maxRange.toLocaleString('es-ES')} €`;
    if (timeDisplay) timeDisplay.textContent = `~${res.estimatedWeeks} semanas`;
    if (laborDisplay) laborDisplay.textContent = `${res.manoDeObra.toLocaleString('es-ES')} €`;
    if (materialsDisplay) materialsDisplay.textContent = `${res.materiales.toLocaleString('es-ES')} €`;
    if (wasteDisplay) wasteDisplay.textContent = `${res.gestionResiduos.toLocaleString('es-ES')} €`;

    if (whatsappBtn) {
      whatsappBtn.href = window.BudgetCalculator.generateWhatsAppUrl(res);
    }
  }

  areaSlider?.addEventListener('input', updateCalculation);
  serviceSelect?.addEventListener('change', updateCalculation);
  qualityRadios.forEach(r => r.addEventListener('change', updateCalculation));
  extraCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculation));

  updateCalculation();
}
