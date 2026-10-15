/**
 * SIMULADOR DE PRESUPUESTO INTERACTIVO
 * Maestros de la Construcción - Valencia
 */

const BudgetCalculator = {
  // Precios base estimados por m² o unidad (Valencia 2026)
  rates: {
    integral: { baseM2: 520, timeWeeksPer50m2: 4, name: "Reforma Integral de Vivienda" },
    bano: { baseFixed: 3200, baseM2: 180, timeWeeksPer50m2: 2, name: "Reforma Completa de Baño" },
    cocina: { baseFixed: 4500, baseM2: 220, timeWeeksPer50m2: 2.5, name: "Reforma Completa de Cocina" },
    pladur: { baseM2: 42, timeWeeksPer50m2: 1.5, name: "Tabiquería Pladur e Iluminación LED" },
    suelos: { baseM2: 36, timeWeeksPer50m2: 1.5, name: "Solados y Alicatados Porcelánicos" },
    pintura: { baseM2: 18, timeWeeksPer50m2: 1, name: "Alisado de Gotelé y Pintura Plástica" }
  },

  qualityMultipliers: {
    basico: { mult: 0.9, label: "Calidad Esencial" },
    confort: { mult: 1.15, label: "Calidad Confort (Recomendada)" },
    premium: { mult: 1.45, label: "Alta Calidad Premium" },
    lujo: { mult: 1.9, label: "Diseño Exclusivo y Lujo" }
  },

  extrasPrices: {
    fontaneria: 950,
    electricidad: 1400,
    led: 550,
    desescombro: 450
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

    // Redondear a múltiplos de 50
    totalEstimated = Math.round(totalEstimated / 50) * 50;
    const minRange = Math.round((totalEstimated * 0.92) / 50) * 50;
    const maxRange = Math.round((totalEstimated * 1.08) / 50) * 50;

    // Desglose
    const manoDeObra = Math.round(totalEstimated * 0.55);
    const materiales = Math.round(totalEstimated * 0.35);
    const gestionResiduos = totalEstimated - manoDeObra - materiales;

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

