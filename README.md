# 🏗️ Maestros de la Construcción | Web Oficial

Sitio web oficial de **Maestros de la Construcción** (`maestrosdelaconstruccion.es`), empresa de reformas y construcción integral en **Valencia y alrededores**.

Desarrollada para ofrecer una doble experiencia de usuario (Bienvenida Visual inmersiva vs. Pestaña de Inicio ejecutiva y directa), posicionamiento local en Google Maps y Google Search (SEO), simulador interactivo de presupuestos con envío directo a WhatsApp y asistente virtual de atención al cliente con IA de Google Gemini.

---

## 🌟 Estructura del Proyecto

```
/
├── index.html              # Experiencia Visual de Bienvenida (Inmersiva, animaciones y storytelling)
├── inicio.html             # Pestaña de Inicio (Versión directa, escueta y pasiva corporativa)
├── obras.html              # Catálogo interactivo de trabajos reales y filtros por especialidad
├── presupuesto.html        # Simulador de presupuesto dinámico con desglose y exportación WhatsApp
├── donde-estamos.html      # Cobertura en Valencia y Google Maps interactivo (Local SEO)
├── contacto.html           # Formulario oficial, soporte, WhatsApp directo (622 851 328) y horarios
├── sitemap.xml             # Mapa del sitio optimizado para Google Search Console
├── robots.txt              # Directivas para Googlebot y motores de búsqueda
├── vercel.json             # Configuración de despliegue en Vercel (Clean URLs y headers)
├── css/
│   └── styles.css          # Sistema de diseño con variables, efectos glassmorphism y dark gold
├── js/
│   ├── main.js             # Lógica de navegación, acordeones FAQ y filtros de galería
│   ├── calculator.js       # Motor matemático del simulador de presupuesto (tarifas Valencia 2026)
│   └── ai-assistant.js     # Asistente virtual inteligente con soporte Gemini API y motor local
└── img/                    # Activos gráficos, logos y fotografías de obras reales
```

---

## 🚀 Despliegue en Vercel

1. Ve a [Vercel](https://vercel.com/) e inicia sesión con tu cuenta de GitHub.
2. Haz clic en **"Add New Project"** e importa el repositorio:
   `https://github.com/ivangarmir18/Maestros_de_la_Construccion.git`
3. Como es un proyecto web estático de alto rendimiento, **no requiere ningún comando de build**. Vercel lo detectará automáticamente y creará el despliegue al instante.
4. Pulsa en **Deploy**.

---

## 🌐 Configurar el Dominio en Hostalia (`maestrosdelaconstruccion.es`)

Para vincular el dominio comprado en **Hostalia** con el despliegue de **Vercel**:

1. En el panel de **Vercel** de tu proyecto, ve a:
   `Settings` ➔ `Domains` ➔ Añade `maestrosdelaconstruccion.es` y `www.maestrosdelaconstruccion.es`.
2. Vercel te indicará los registros DNS necesarios. Entra en tu panel de control de **Hostalia**:
   - Ve a la sección de **Gestión de DNS** del dominio `maestrosdelaconstruccion.es`.
   - Modifica o añade el registro **A** apuntando a: `76.76.21.21` (IP de Vercel).
   - Añade o modifica el registro **CNAME** para el subdominio `www` apuntando a: `cname.vercel-dns.com`.
3. Guarda los cambios. La propagación DNS tardará entre 10 minutos y un par de horas, tras lo cual Vercel emitirá automáticamente el certificado SSL (HTTPS) gratuito de Let's Encrypt.

---

## 🤖 Asistente de IA con Gemini API

El widget de chat flotante situado en la esquina inferior derecha:
- Viene precargado con un **motor de conocimiento técnico local** sobre obras, calidades, permisos municipales y zonas de Valencia.
- Si deseas que genere respuestas mediante el modelo **Google Gemini** en tiempo real:
  1. Haz clic en el icono de engranaje / llave en la cabecera del chat.
  2. Pega tu clave de API de **Google AI Studio**.
  3. Quedará guardada en el almacenamiento local del navegador (`localStorage`).

---

## 📍 Posicionamiento en Google Maps y Google Search (SEO)

- **Datos Estructurados (JSON-LD):** Configurados en todas las páginas con `@type: HomeAndConstructionBusiness` y `@type: GeneralContractor`, geolocalizados en Valencia (39.4699, -0.3763).
- **Google Search Console:** Una vez desplegado, sube `https://www.maestrosdelaconstruccion.es/sitemap.xml` a Google Search Console para indexar todas las URLs.
- **Google My Business / Google Maps:** Recomendado dar de alta la ficha en Google Maps vinculándola con la URL `https://www.maestrosdelaconstruccion.es/donde-estamos`.

---

## 📱 Contacto de la Empresa

- **Teléfono / WhatsApp:** +34 622 851 328
- **Instagram:** [@somosmaestrosdelaconstruccion](https://instagram.com/somosmaestrosdelaconstruccion)
- **Área de Cobertura:** Valencia Capital, Torrent, Paterna, Burjassot, Bétera, Sagunto y toda la provincia.
