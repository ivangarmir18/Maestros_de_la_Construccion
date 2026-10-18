/**
 * SIMULADOR DE PRESUPUESTO INTERACTIVO
 * Maestros de la Construcción - Valencia
 */

const BudgetCalculator = {
  // Configuración realista de metros cuadrados según el tipo de estancia
  serviceConfigs: {
    bano: {
      min: 3, max: 15, defaultVal: 5, step: 1,
      name: "Reforma Completa de Baño",
      hintMin: "3 m² (Aseo)", hintMid: "6 m² (Baño Estándar)", hintMax: "15 m² (Baño Grande/Suite)"
    },
    cocina: {
      min: 5, max: 25, defaultVal: 10, step: 1,
      name: "Reforma Completa de Cocina",
      hintMin: "5 m² (Pequeña)", hintMid: "10 m² (Habitual)", hintMax: "25 m² (Cocina-Comedor)"
    },
    pintura: {
      min: 30, max: 220, defaultVal: 75, step: 5,
      name: "Pintura y Alisado de Gotelé",
      hintMin: "30 m² (1-2 Estancias)", hintMid: "75 m² (Piso Estándar)", hintMax: "220 m² (Piso Grande/Chalet)"
    },
    pladur: {
      min: 10, max: 80, defaultVal: 25, step: 5,
      name: "Tabiquería Pladur y Fosas LED",
      hintMin: "10 m² (Habitación)", hintMid: "25 m² (Salón)", hintMax: "80 m² (Varios Techos)"
    },
    suelos: {
      min: 15, max: 180, defaultVal: 60, step: 5,
      name: "Solados y Porcelánicos",
      hintMin: "15 m² (Cocina/Terraza)", hintMid: "60 m² (Planta Vivienda)", hintMax: "180 m² (Piso Completo)"
    },
    integral: {
      min: 40, max: 250, defaultVal: 80, step: 5,
      name: "Reforma Integral de Vivienda",
      hintMin: "40 m² (Estudio)", hintMid: "80 m² (Piso Estándar)", hintMax: "250 m² (Ático/Chalet)"
    }
  },

  // Precios base por servicio (en Valencia)
  rates: {
    integral: { baseM2: 580, timeWeeksPer50m2: 4, name: "Reforma Integral de Vivienda" },
    bano: { baseFixed: 2200, baseM2: 320, timeWeeksPer50m2: 2, name: "Reforma Completa de Baño" },
    cocina: { baseFixed: 2800, baseM2: 360, timeWeeksPer50m2: 2.5, name: "Reforma Completa de Cocina" },
    pladur: { baseM2: 44, timeWeeksPer50m2: 1.5, name: "Tabiquería Pladur y Fosas LED" },
    suelos: { baseM2: 38, timeWeeksPer50m2: 1.5, name: "Solados y Pavimentos Porcelánicos" },
    pintura: { baseM2: 18, timeWeeksPer50m2: 1, name: "Pintura y Alisado de Gotelé" }
  },

  qualityMultipliers: {
    basico: { mult: 0.95, label: "Calidad Esencial (Económica)" },
    confort: { mult: 1.25, label: "Calidad Confort (Recomendada)" },
    premium: { mult: 1.65, label: "Alta Calidad Premium" },
    lujo: { mult: 2.20, label: "Diseño Exclusivo y Lujo" }
  },

  extrasPrices: {
    fontaneria: 950,
    electricidad: 1300,
    led: 550,
    desescombro: 420
  },

  calculate(config) {
    const { serviceType, areaM2, quality, extras = [] } = config;
    const service = this.rates[serviceType] || this.rates.integral;
    const qualityData = this.qualityMultipliers[quality] || this.qualityMultipliers.confort;

    let subtotalBase = 0;
    if (service.baseFixed) {
      // El incremento por m2 refleja obra real (suelos, alicatado de paredes perimetrales y mano de obra)
      subtotalBase = service.baseFixed + (service.baseM2 * areaM2);
    } else {
      subtotalBase = service.baseM2 * areaM2;
    }

    // Aplicar multiplicador de calidad (los acabados altos/exclusivos escalan con más peso)
    let totalEstimated = subtotalBase * qualityData.mult;

    // Sumar extras seleccionados
    let extrasTotal = 0;
    extras.forEach(extraKey => {
      if (this.extrasPrices[extraKey]) {
        extrasTotal += this.extrasPrices[extraKey];
      }
    });

    totalEstimated += extrasTotal;

    // Horquilla de mercado equilibrada:
    // Los rangos más altos suben proporcionalmente más según calidades
    const minRange = Math.round((totalEstimated * 0.85) / 50) * 50;
    const maxRange = Math.round((totalEstimated * 1.15) / 50) * 50;
    const averageEstimated = Math.round(((minRange + maxRange) / 2) / 50) * 50;

    // Desglose proporcional sobre el importe medio
    const manoDeObra = Math.round(averageEstimated * 0.55);
    const materiales = Math.round(averageEstimated * 0.35);
    const gestionResiduos = averageEstimated - manoDeObra - materiales;

    // Estimación de semanas según superficie
    const estimatedWeeks = Math.max(1, Math.round((areaM2 / 35) * service.timeWeeksPer50m2));

    return {
      serviceName: service.name,
      qualityLabel: qualityData.label,
      areaM2,
      totalEstimated,
      minRange,
      maxRange,
      manoDeObra,
      materiales,
      gestionResiduos,
      estimatedWeeks
    };
  },

  generateWhatsAppUrl(result) {
    const phone = "34722851328";
    const text = `¡Hola Maestros de la Construcción! He realizado una simulación de presupuesto en vuestra web:
🏗️ *Tipo de obra:* ${result.serviceName}
📐 *Superficie aproximada:* ${result.areaM2} m²
💎 *Gama de calidades:* ${result.qualityLabel}
💰 *Presupuesto estimado:* Entre ${result.minRange.toLocaleString('es-ES')}€ y ${result.maxRange.toLocaleString('es-ES')}€
⏱️ *Plazo orientativo:* ~${result.estimatedWeeks} semanas

Me gustaría concertar una visita en Valencia o alrededores para que reviséis el proyecto y nos déis presupuesto exacto sin compromiso. ¡Gracias!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
};

// Exponer globalmente
window.BudgetCalculator = BudgetCalculator;

