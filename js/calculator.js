/**
 * TARIFAS BASE Y SIMULADOR DE PRESUPUESTO ORIENTATIVO
 * Maestros de la Construcción - Valencia
 * Precios directos de oficial sin sobrecostes comerciales
 */

const BudgetCalculator = {
  services: {
    ducha: {
      id: "ducha",
      name: "Cambio de Bañera por Plato de Ducha",
      badge: "TRABAJO RÁPIDO",
      unit: "obra",
      timeText: "2 a 3 días",
      description: "Demolición y desescombro de bañera, instalación de plato de ducha de resina mineral antideslizante clase 3, adaptación de fontanería y alicatado cerámico de la zona húmeda.",
      sizes: {
        pequeno: { label: "Hueco estándar (hasta 120 cm)", price: 590 },
        medio: { label: "Hueco mediano (120 a 150 cm)", price: 690 },
        grande: { label: "Bañera amplia o gran formato (160+ cm)", price: 820 }
      }
    },
    bano: {
      id: "bano",
      name: "Reforma Completa de Baño",
      badge: "MÁS SOLICITADO",
      unit: "estancia",
      timeText: "7 a 10 días",
      description: "Demolición y desescombro, renovación de fontanería y desagües, alicatado de paredes y suelo en porcelánico, plato de ducha de resina, mampara y montaje de sanitarios.",
      sizes: {
        pequeno: { label: "Aseo o baño pequeño (hasta 3 m²)", price: 1950 },
        medio: { label: "Baño estándar habitual (4 a 6 m²)", price: 2450 },
        grande: { label: "Baño amplio o suite (7 a 12 m²)", price: 3200 }
      }
    },
    cocina: {
      id: "cocina",
      name: "Reforma de Cocina",
      badge: "ALBAÑILERÍA Y FONTANERÍA",
      unit: "estancia",
      timeText: "10 a 14 días",
      description: "Picado de azulejos antiguos, desescombro, nuevas tomas de agua y desagüe para fregadero y electrodomésticos, alicatado porcelánico rectificado y solado resistente.",
      sizes: {
        pequeno: { label: "Cocina pequeña / compacta (hasta 6 m²)", price: 2600 },
        medio: { label: "Cocina estándar habitual (7 a 11 m²)", price: 3400 },
        grande: { label: "Cocina espaciosa / con isla (12 a 20 m²)", price: 4400 }
      }
    },
    pladur: {
      id: "pladur",
      name: "Tabiques Pladur y Fosas de Luz LED",
      badge: "ESPECIALIDAD",
      unit: "obra",
      timeText: "3 a 6 días",
      description: "Estructura metálica galvanizada, placas de yeso laminado (PYL), aislamiento térmico/acústico con lana de roca, encintado y candilejas perimetrales para tiras LED indirectas.",
      sizes: {
        pequeno: { label: "Habitación o techo puntual (~15 m²)", price: 420 },
        medio: { label: "Salón o 2 estancias con fosa LED (~35 m²)", price: 950 },
        grande: { label: "Techos continuos vivienda completa (~70 m²)", price: 1850 }
      }
    },
    pintura: {
      id: "pintura",
      name: "Alisado de Gotelé y Pintura Plástica",
      badge: "ACABADO PERFECTO",
      unit: "obra",
      timeText: "4 a 7 días",
      description: "Tendido de masilla de renovación de alta adherencia en capas cruzadas, lijado mecánico con aspiración sin polvo y 2 manos de pintura plástica lavable mate de primera marca.",
      sizes: {
        pequeno: { label: "1 o 2 habitaciones (~40 m² pared)", price: 450 },
        medio: { label: "Piso estándar habitual (~100 m² pared)", price: 980 },
        grande: { label: "Piso grande o vivienda completa (~180 m² pared)", price: 1690 }
      }
    },
    suelos: {
      id: "suelos",
      name: "Solados y Pavimentos Porcelánicos",
      badge: "DURABILIDAD",
      unit: "obra",
      timeText: "4 a 8 días",
      description: "Comprobación y nivelación de base, colocación de gres porcelánico rectificado con cemento cola flexible C2TE S1 y sistema de nivelación por cuñas, rejuntado y rodapiés.",
      sizes: {
        pequeno: { label: "Estancia o terraza puntual (~20 m²)", price: 490 },
        medio: { label: "Planta de vivienda (~60 m²)", price: 1390 },
        grande: { label: "Vivienda completa (~100 m²)", price: 2250 }
      }
    },
    integral: {
      id: "integral",
      name: "Reforma Integral de Vivienda",
      badge: "LLAVE EN MANO",
      unit: "vivienda",
      timeText: "4 a 8 semanas",
      description: "Coordinación completa de albañilería, fontanería, electricidad, tabiquería pladur, carpinterías y pintura. Contacto directo con el oficial a pie de obra.",
      sizes: {
        pequeno: { label: "Estudio / Apartamento (~50 m²)", price: 18500 },
        medio: { label: "Piso habitual (~80 m²)", price: 28500 },
        grande: { label: "Ático o chalet (~120 m²)", price: 39500 }
      }
    }
  },

  getInfo(serviceKey, sizeKey = "medio") {
    const service = this.services[serviceKey] || this.services.bano;
    const sizeData = service.sizes[sizeKey] || service.sizes.medio;
    return {
      serviceKey: service.id,
      serviceName: service.name,
      badge: service.badge,
      timeText: service.timeText,
      description: service.description,
      sizeLabel: sizeData.label,
      startingPrice: sizeData.price,
      basePriceFormatted: sizeData.price.toLocaleString("es-ES") + " €"
    };
  },

  generateWhatsAppUrl(info) {
    const phone = "34722851328";
    const text = `¡Hola Maestros de la Construcción! He visto vuestras tarifas base en la web:
🏗️ *Servicio de interés:* ${info.serviceName}
📐 *Envergadura / Tipo:* ${info.sizeLabel}
💰 *Tarifa orientativa base:* Desde ${info.basePriceFormatted}
⏱️ *Plazo estimado:* ~${info.timeText}

Me gustaría concertar una visita técnica gratuita en Valencia o alrededores para medir y cerrar presupuesto exacto sin compromiso. ¡Gracias!`;

    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  }
};

window.BudgetCalculator = BudgetCalculator;
