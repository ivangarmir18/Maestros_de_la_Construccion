/**
 * MAESTROS DE LA CONSTRUCCIÓN - Lógica Principal e Interactividad
 * Valencia, España
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // 2. Navbar Scroll Glass Effect
  const navbar = document.getElementById('main-nav');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-xl', 'bg-slate-950/95');
        navbar.classList.remove('bg-slate-950/70');
      } else {
        navbar.classList.remove('shadow-xl', 'bg-slate-950/95');
        navbar.classList.add('bg-slate-950/70');
      }
    });
  }

  // 3. FAQ Accordion Toggle
  document.querySelectorAll('.faq-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const content = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      
      const isOpen = !content.classList.contains('hidden');
      
      // Cerrar otros
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      if (!isOpen) {
        content.classList.remove('hidden');
        icon?.classList.add('rotate-180');
      }
    });
  });

  // 4. Filtro de Galería de Obras (si existe)
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0 && galleryItems.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        // Actualizar estados visuales de botones
        filterBtns.forEach(b => {
          b.classList.remove('bg-amber-500', 'text-slate-950', 'font-bold');
          b.classList.add('bg-slate-800', 'text-slate-300');
        });
        btn.classList.add('bg-amber-500', 'text-slate-950', 'font-bold');
        btn.classList.remove('bg-slate-800', 'text-slate-300');

        // Filtrar elementos
        galleryItems.forEach(item => {
          const category = item.getAttribute('data-category');
          if (filter === 'all' || category === filter) {
            item.classList.remove('hidden');
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            setTimeout(() => { item.classList.add('hidden'); }, 200);
          }
        });
      });
    });
  }

  // 5. Inicialización de la Calculadora de Presupuestos (si está en la página)
  initBudgetCalculatorUI();
});

function initBudgetCalculatorUI() {
  const calcForm = document.getElementById('budget-calculator-form');
  if (!calcForm || !window.BudgetCalculator) return;

  const areaSlider = document.getElementById('calc-area-slider');
  const areaDisplay = document.getElementById('calc-area-display');
  const serviceSelect = document.getElementById('calc-service-type');
  const qualityRadios = document.querySelectorAll('input[name="calc-quality"]');
  const extraCheckboxes = document.querySelectorAll('input[name="calc-extra"]');
  
  // Elementos de resultados
  const totalDisplay = document.getElementById('calc-result-total');
  const rangeDisplay = document.getElementById('calc-result-range');
  const timeDisplay = document.getElementById('calc-result-time');
  const laborDisplay = document.getElementById('calc-result-labor');
  const materialsDisplay = document.getElementById('calc-result-materials');
  const wasteDisplay = document.getElementById('calc-result-waste');
  const whatsappBtn = document.getElementById('calc-whatsapp-btn');

  function updateCalculation() {
    const serviceType = serviceSelect?.value || 'integral';
    const areaM2 = parseInt(areaSlider?.value || 70, 10);
    
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

  // Event Listeners
  areaSlider?.addEventListener('input', updateCalculation);
  serviceSelect?.addEventListener('change', updateCalculation);
  qualityRadios.forEach(r => r.addEventListener('change', updateCalculation));
  extraCheckboxes.forEach(cb => cb.addEventListener('change', updateCalculation));

  // Cálculo inicial
  updateCalculation();
}

