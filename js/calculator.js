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
    integral: { baseM2: 520, timeWeeksPer50m2: 4, name: "Reforma Integral de Vivienda" },
    bano: { baseFixed: 2800, baseM2: 120, timeWeeksPer50m2: 2, name: "Reforma Completa de Baño" },
    cocina: { baseFixed: 3600, baseM2: 150, timeWeeksPer50m2: 2.5, name: "Reforma Completa de Cocina" },
    pladur: { baseM2: 36, timeWeeksPer50m2: 1.5, name: "Tabiquería Pladur y Fosas LED" },
    suelos: { baseM2: 32, timeWeeksPer50m2: 1.5, name: "Solados y Pavimentos Porcelánicos" },
    pintura: { baseM2: 15, timeWeeksPer50m2: 1, name: "Pintura y Alisado de Gotelé" }
  },

  qualityMultipliers: {
    basico: { mult: 0.9, label: "Calidad Esencial (Económica)" },
    confort: { mult: 1.15, label: "Calidad Confort (Recomendada)" },
    premium: { mult: 1.45, label: "Alta Calidad Premium" },
    lujo: { mult: 1.9, label: "Diseño Exclusivo y Lujo" }
  },

  extrasPrices: {
    fontaneria: 800,
    electricidad: 1100,
    led: 450,
    desescombro: 350
  },

  calculate(config) {
    const { serviceType, areaM2, quality, extras = [] } = config;
    const service = this.rates[serviceType] || this.rates.integral;
    const qualityData = this.qualityMultipliers[quality] || this.qualityMultipliers.confort;

    let subtotalBase = 0;
    if (service.baseFixed) {
      subtotalBase = service.baseFixed + (service.baseM2 * (areaM2 / 6));
    } else {
      subtotalBase = service.baseM2 * areaM2;
    }

    // Aplicar multiplicador de calidad
    let totalEstimated = subtotalBase * qualityData.mult;

    // Sumar extras seleccionados
    let extrasTotal = 0;
    extras.forEach(extraKey => {
      if (this.extrasPrices[extraKey]) {
        extrasTotal += this.extrasPrices[extraKey];
      }
    });

    totalEstimated += extrasTotal;

    // Horquilla competitiva: precio base más bajo (-40%) hasta rango superior ajustado (-20%)
    // Proporciona una horquilla amplia, realista y muy atractiva para captar clientes directos
    const minRange = Math.round((totalEstimated * 0.60) / 50) * 50;
    const maxRange = Math.round((totalEstimated * 0.80) / 50) * 50;
    const averageEstimated = Math.round(((minRange + maxRange) / 2) / 50) * 50;

    // Desglose proporcional sobre el importe medio
    const manoDeObra = Math.round(averageEstimated * 0.55);
    const materiales = Math.round(averageEstimated * 0.35);
    const gestionResiduos = averageEstimated - manoDeObra - materiales;

    // Estimación de semanas
    const estimatedWeeks = Math.max(1, Math.round((areaM2 / 40) * service.timeWeeksPer50m2));

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

