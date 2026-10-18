<div align="center">

  <img src="img/logo.jpg" alt="Maestros de la Construcción Logo" width="120" style="border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.15); margin-bottom: 12px;" />

  # 🏗️ Maestros de la Construcción
  ### *Artesanía Técnica, Reformas de Precisión y Trato Directo de Oficial a Propietario en Valencia*

  [![Sitio Web Oficial](https://img.shields.io/badge/🌐_Web-maestrosdelaconstruccion.es-d97706?style=for-the-badge)](https://www.maestrosdelaconstruccion.es)
  [![WhatsApp Contacto](https://img.shields.io/badge/📱_WhatsApp-722_851_328-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/34722851328)
  [![Vercel Deployment](https://img.shields.io/badge/▲_Despliegue-Vercel_Production-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)
  [![Seguridad OWASP](https://img.shields.io/badge/🔒_Seguridad-CSP_%2B_HSTS_%2B_Sanitizado-blue?style=for-the-badge)](vercel.json)

  <br />

  <p align="center">
    <b>Plataforma web de alto rendimiento</b> para <b>Maestros de la Construcción</b> en Valencia capital y comarcas colindantes.<br />
    Diseñada con estética arquitectónica técnica, cálculo de presupuestos en tiempo real, comparador visual antes/después, asistente de IA con Google Gemini y conexión directa con clientes a través de WhatsApp.
  </p>

</div>

---

## 📑 Tabla de Contenidos

- [✨ Características Principales](#-características-principales)
- [🛠️ Stack Tecnológico](#️-stack-tecnológico)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [🧮 Motor de Cálculo de Presupuestos](#-motor-de-cálculo-de-presupuestos)
- [🛡️ Seguridad y Buenas Prácticas (Hardening)](#️-seguridad-y-buenas-prácticas-hardening)
- [🤖 Asistente Técnico Virtual con IA](#-asistente-técnico-virtual-con-ia)
- [🚀 Despliegue y Configuración de Dominio](#-despliegue-y-configuración-de-dominio)
- [📍 SEO Local y Datos Estructurados](#-seo-local-y-datos-estructurados)
- [📞 Contacto de la Empresa](#-contacto-de-la-empresa)

---

## ✨ Características Principales

- **🎚️ Simulador Interactivo de Presupuestos:** Cálculo instantáneo con horquillas realistas por $m^2$, según estancia (baños, cocinas, pladur, suelos, pintura, integral) y nivel de acabados (Esencial, Confort, Premium, Lujo).
- **🔀 Slider Comparativo Antes / Después:** Comparador táctil e interactivo de obras reales (demolición vs. ducha terminada con porcelánico rectificado).
- **🤖 Oficina Técnica Virtual (IA Gemini):** Asistente conversacional con conocimiento técnico sobre normativas de Valencia y conexión opcional con Gemini 1.5 Flash.
- **🌓 Sistema Dual Dark / Light Mode:** Conmutador persistente (`localStorage`) con paleta arquitectónica (hormigón cálido `#f7f6f1`, pizarra oscura `#111317` y detalles ámbar obra `#d97706`).
- **📊 Analítica y Tracker de Clics a WhatsApp:** Registro automático de conversiones a WhatsApp con panel discreto accesible para administradores mediante el comando secreto **`Alt + Shift + A`**.
- **🤝 Enfoque "Te Hacemos la Vida Fácil":** Información clara sobre pintura, pequeñas reformas y coordinación integral de gremios (climatización / aire acondicionado, carpintería, fontanería especializada).
- **📱 Responsive & Mobile-First:** Experiencia fluida adaptada a smartphones, tablets y pantallas de escritorio de gran resolución.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
| :--- | :--- |
| **Frontend Core** | HTML5 Semántico, Vanilla JavaScript (ES6+ modular, cero dependencias pesadas) |
| **Estilos & UI** | Tailwind CSS CDN + [css/styles.css](css/styles.css) (CSS Variables, Glassmorphism, Micro-interacciones) |
| **Inteligencia Artificial** | Google Gemini API (`gemini-1.5-flash`) + Motor Experto Local Offline |
| **Despliegue & Hosting** | [Vercel](https://vercel.com/) (Edge Network, Clean URLs, compresión Brotli) |
| **Dominio & DNS** | Hostalia DNS ➔ Registros A y CNAME vinculados a Vercel SSL |
| **Seguridad Web** | CSP (Content Security Policy), HSTS 2 años, anti-clickjacking, sanitización anti-XSS |

---

## 📂 Estructura del Proyecto

```plaintext
Maestros_de_la_Construccion/
├── index.html                           # Landing page principal (Hero, 4 especialidades, Slider, Simulador, Footer)
├── obras.html                           # Galería interactiva filtrable de obras reales en Valencia
├── presupuesto.html                     # Simulador avanzado con desglose técnico (mano de obra, materiales, residuos)
├── donde-estamos.html                   # Mapa de cobertura geográfica en Valencia y municipios metropolitanos
├── faq.html                             # Preguntas frecuentes con Schema.org FAQPage JSON-LD
├── contacto.html                        # Formulario de valoración técnica con selector de reformas y WhatsApp
├── reforma-bano-valencia.html           # Landing técnica SEO: Reformas completas de baño
├── cambiar-banera-por-ducha-valencia.html # Landing técnica SEO: Cambio de bañera en 48 horas
├── alisar-paredes-quitar-gotele-valencia.html # Landing técnica SEO: Alisado y pintura sin polvo
├── pladur-techos-fosas-led-valencia.html    # Landing técnica SEO: Falsos techos y candilejas LED
├── vercel.json                          # Configuración de producción, headers de seguridad HTTP y caché
├── sitemap.xml                          # Mapa del sitio XML indexable para Google Search Console
├── robots.txt                           # Directivas de rastreo para robots y buscadores
├── css/
│   └── styles.css                       # Variables de tema, componentes personalizados y tipografías
├── js/
│   ├── main.js                          # Control de tema, slider antes/después, acordeón y tracker secreto
│   ├── calculator.js                    # Motor matemático y calibración de presupuestos por m²
│   └── ai-assistant.js                  # Widget conversacional de soporte con sanitización XSS
└── img/                                 # Fotografías reales de obras en Valencia, logos y favicons
```

---

## 🧮 Motor de Cálculo de Presupuestos

El archivo [`js/calculator.js`](js/calculator.js) implementa un modelo de tarificación adaptativo que refleja los costes reales de ejecución en Valencia:

- **Escalado Real por $m^2$:** En estancias húmedas (baños y cocinas) cada metro cuadrado adicional contempla no solo el piso, sino el alicatado perimetral vertical (paredes), impermeabilizaciones y tiempo de colocación.
- **Multiplicadores de Calidad:**
  - `Esencial (0.95)`: Soluciones funcionales y materiales económicos.
  - `Confort (1.25)`: Azulejo porcelánico rectificado C3 y grifería de marca habitual.
  - `Premium (1.65)`: Gran formato, fosa perimetral de luz continua y sanitarios compactos.
  - `Lujo (2.20)`: Diseños a medida, hornacinas integradas, mármol/porcelánicos especiales.
- **Exportación Automática a WhatsApp:** Genera un mensaje preformateado listo para enviar al oficial técnico.

---

## 🛡️ Seguridad y Buenas Prácticas (Hardening)

El sitio ha sido auditado y asegurado conforme a los estándares **OWASP**:

1. **Content Security Policy (CSP):**
   Encabezado HTTP restrictivo en [`vercel.json`](vercel.json) que bloquea scripts no autorizados, inyecciones de objetos y restringe los envíos de formularios.
2. **Protección Anti-Clickjacking & MIME-Sniffing:**
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
3. **Mitigación de Reverse Tabnabbing:**
   Todos los enlaces salientes (`target="_blank"`) incorporan de forma estricta el atributo `rel="noopener noreferrer"`.
4. **Sanitización contra Cross-Site Scripting (XSS):**
   En [`js/ai-assistant.js`](js/ai-assistant.js), todas las cadenas de texto del usuario o de las respuestas de API se procesan con `escapeHtml()` antes de cualquier renderizado en el DOM.

---

## 🤖 Asistente Técnico Virtual con IA

Ubicado en la esquina inferior derecha de la pantalla:
- **Modo Offline / Local:** Si no hay conexión o no se facilita API Key, responde mediante un motor heurístico entrenado con los precios, plazos y ordenanzas de obras de Valencia.
- **Modo Gemini Flash:** Permite enlazar una clave personal de Google AI Studio almacenada únicamente en el `localStorage` del cliente para generar respuestas dinámicas avanzadas.

---

## 🚀 Despliegue y Configuración de Dominio

### Despliegue en Vercel
1. Conecta este repositorio en [Vercel](https://vercel.com).
2. Framework Preset: **Other** (sitio estático HTML/CSS/JS).
3. Despliega con un clic; no requiere proceso de compilación (`build command: none`).

### Configuración DNS (Hostalia / Registrador)
Para vincular `maestrosdelaconstruccion.es`:
- **Registro A (Apex):** `@` ➔ `76.76.21.21`
- **Registro CNAME (www):** `www` ➔ `cname.vercel-dns.com`

---

## 📍 SEO Local y Datos Estructurados

- Marcado semántico **Schema.org** integrado:
  - `@type: HomeAndConstructionBusiness`
  - `@type: GeneralContractor`
  - `@type: FAQPage` (Rich Snippets en resultados de búsqueda)
- Coordenadas geográficas: `Valencia (39.4699, -0.3763)`
- Ficha de Google Business vinculada: [Ver en Google Maps](https://share.google/jS8YFrFA9vDX3dOp3)

---

## 📞 Contacto de la Empresa

- **Empresa:** Maestros de la Construcción
- **Área:** Valencia capital y área metropolitana (Torrent, Paterna, Burjassot, Bétera, Sagunto, etc.)
- **Teléfono / WhatsApp:** [+34 722 851 328](https://wa.me/34722851328)
- **Correo Oficial:** [contacto@maestrosdelaconstruccion.es](mailto:contacto@maestrosdelaconstruccion.es)
- **Instagram:** [@somosmaestrosdelaconstruccion](https://instagram.com/somosmaestrosdelaconstruccion)
- **Horario:** Lunes a Viernes de 07:00 a 17:00

---

<div align="center">
  <sub>© 2026 Maestros de la Construcción · Oficiales y Reformas en Valencia. Todos los derechos reservados.</sub>
</div>
