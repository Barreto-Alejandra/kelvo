import type { Locale } from '@/config';

export type Category = 'generators' | 'image';

export interface ToolContent {
  /** Localized URL slug (no language prefix), e.g. "password-generator". */
  slug: string;
  /** Short label for cards and navigation. */
  name: string;
  /** SEO <title> (without the brand suffix). */
  title: string;
  /** SEO meta description (~150 chars). */
  description: string;
  /** Page heading. */
  h1: string;
  /** One-paragraph intro under the heading. */
  intro: string;
  /** Comma-separated meta keywords (minor SEO signal). */
  keywords: string;
  /** FAQ entries — also emitted as FAQPage structured data. */
  faq: { q: string; a: string }[];
  /** Tool-specific UI labels read by the interactive component. */
  ui: Record<string, string>;
}

export interface Tool {
  id: string;
  category: Category;
  /** Inline SVG inner markup (24x24, stroke=currentColor). */
  icon: string;
  content: Record<Locale, ToolContent>;
}

const icons = {
  password:
    '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  palette:
    '<circle cx="13.5" cy="6.5" r=".8"/><circle cx="17" cy="10" r=".8"/><circle cx="8" cy="7" r=".8"/><circle cx="6.5" cy="12" r=".8"/><path d="M12 2C6.5 2 2 6.5 2 12a10 10 0 0 0 10 10c1 0 1.7-.8 1.7-1.7 0-.4-.2-.8-.5-1.1-.3-.3-.4-.6-.4-1.1 0-.9.7-1.6 1.6-1.6H16c3.3 0 6-2.7 6-6 0-5-4.5-9-10-9z"/>',
  qr: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3M21 14v.01M14 21h.01M17 21h4v-4"/>',
  user: '<circle cx="12" cy="7" r="4"/><path d="M5.5 21a6.5 6.5 0 0 1 13 0"/>',
  compress:
    '<path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3M3 16h3a2 2 0 0 1 2 2v3m13-5h-3a2 2 0 0 0-2 2v3"/>',
  resize: '<path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>',
  convert: '<path d="M16 3l4 4-4 4M20 7H8M8 21l-4-4 4-4M4 17h12"/>',
  ruler:
    '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h4M3 15h4M9 3v4M15 3v4"/>',
};

export const tools: Tool[] = [
  // ─────────────────────────────── GENERATORS ───────────────────────────────
  {
    id: 'password-generator',
    category: 'generators',
    icon: icons.password,
    content: {
      en: {
        slug: 'password-generator',
        name: 'Password Generator',
        title: 'Strong Password Generator — Free & Secure',
        description:
          'Generate strong, random, secure passwords instantly. Choose length and characters. 100% private — created in your browser, never sent anywhere.',
        h1: 'Password Generator',
        intro:
          'Create strong, truly random passwords in one click. Pick the length and which characters to include. Your password is generated on your device with cryptographically secure randomness and never leaves your browser.',
        keywords:
          'password generator, strong password, random password, secure password generator, create password',
        faq: [
          {
            q: 'Are these passwords safe to use?',
            a: 'Yes. Passwords are generated locally in your browser using the Web Crypto API (cryptographically secure randomness). Nothing is sent over the internet or stored.',
          },
          {
            q: 'How long should my password be?',
            a: 'For most accounts use at least 16 characters with a mix of upper- and lower-case letters, numbers and symbols. Longer is always stronger.',
          },
          {
            q: 'Do you store the passwords I generate?',
            a: 'No. There is no server involved. Once you close or refresh the page the password is gone unless you saved it yourself.',
          },
        ],
        ui: {
          length: 'Length',
          uppercase: 'Uppercase (A-Z)',
          lowercase: 'Lowercase (a-z)',
          numbers: 'Numbers (0-9)',
          symbols: 'Symbols (!@#$…)',
          excludeAmbiguous: 'Exclude similar characters (l, 1, O, 0)',
          generate: 'Generate password',
          strength: 'Strength',
          weak: 'Weak',
          fair: 'Fair',
          good: 'Good',
          strong: 'Strong',
          atLeastOne: 'Select at least one character type.',
        },
      },
      es: {
        slug: 'generador-de-contrasenas',
        name: 'Generador de contraseñas',
        title: 'Generador de Contraseñas Seguras — Gratis',
        description:
          'Generá contraseñas seguras y aleatorias al instante. Elegí la longitud y los caracteres. 100% privado: se crea en tu navegador y nunca se envía a ningún lado.',
        h1: 'Generador de contraseñas',
        intro:
          'Creá contraseñas fuertes y realmente aleatorias con un clic. Elegí la longitud y qué caracteres incluir. La contraseña se genera en tu dispositivo con aleatoriedad criptográficamente segura y nunca sale de tu navegador.',
        keywords:
          'generador de contraseñas, contraseña segura, contraseña aleatoria, crear contraseña, generador de claves',
        faq: [
          {
            q: '¿Son seguras estas contraseñas?',
            a: 'Sí. Se generan localmente en tu navegador usando la Web Crypto API (aleatoriedad criptográficamente segura). No se envía nada por internet ni se guarda.',
          },
          {
            q: '¿De qué largo debería ser mi contraseña?',
            a: 'Para la mayoría de las cuentas usá al menos 16 caracteres combinando mayúsculas, minúsculas, números y símbolos. Cuanto más larga, más fuerte.',
          },
          {
            q: '¿Guardan las contraseñas que genero?',
            a: 'No. No hay ningún servidor de por medio. Al cerrar o recargar la página la contraseña desaparece, salvo que la hayas guardado vos.',
          },
        ],
        ui: {
          length: 'Longitud',
          uppercase: 'Mayúsculas (A-Z)',
          lowercase: 'Minúsculas (a-z)',
          numbers: 'Números (0-9)',
          symbols: 'Símbolos (!@#$…)',
          excludeAmbiguous: 'Excluir caracteres similares (l, 1, O, 0)',
          generate: 'Generar contraseña',
          strength: 'Seguridad',
          weak: 'Débil',
          fair: 'Aceptable',
          good: 'Buena',
          strong: 'Fuerte',
          atLeastOne: 'Seleccioná al menos un tipo de carácter.',
        },
      },
    },
  },
  {
    id: 'color-palette-generator',
    category: 'generators',
    icon: icons.palette,
    content: {
      en: {
        slug: 'color-palette-generator',
        name: 'Color Palette Generator',
        title: 'Color Palette Generator — Create Hex Color Schemes',
        description:
          'Generate beautiful color palettes instantly. Lock colors you like, press space for new ones, copy hex codes. Free, no signup, runs in your browser.',
        h1: 'Color Palette Generator',
        intro:
          'Generate harmonious color palettes in a click. Lock the colors you like, hit the space bar to shuffle the rest, and copy any hex code instantly. Perfect for designers, developers and brand work.',
        keywords:
          'color palette generator, color scheme generator, hex colors, palette maker, random colors',
        faq: [
          {
            q: 'How do I keep a color I like?',
            a: 'Click the lock icon on any color. Locked colors stay put while you generate new variations for the rest of the palette.',
          },
          {
            q: 'How do I generate a new palette quickly?',
            a: 'Press the space bar (on desktop) or tap the Generate button. Locked colors are preserved.',
          },
          {
            q: 'Can I copy the hex codes?',
            a: 'Yes — click any color or its hex code to copy it to your clipboard.',
          },
        ],
        ui: {
          generate: 'Generate (Space)',
          harmony: 'Harmony',
          random: 'Random',
          analogous: 'Analogous',
          monochromatic: 'Monochromatic',
          complementary: 'Complementary',
          triadic: 'Triadic',
          lock: 'Lock',
          unlock: 'Unlock',
          copyHint: 'Click a color to copy its hex code',
        },
      },
      es: {
        slug: 'generador-de-paletas-de-colores',
        name: 'Generador de paletas',
        title: 'Generador de Paletas de Colores — Códigos Hex',
        description:
          'Generá paletas de colores armónicas al instante. Bloqueá los que te gusten, pulsá espacio para nuevas y copiá los códigos hex. Gratis y en tu navegador.',
        h1: 'Generador de paletas de colores',
        intro:
          'Generá paletas de colores armónicas con un clic. Bloqueá los colores que te gustan, pulsá la barra espaciadora para cambiar el resto y copiá cualquier código hex al instante. Ideal para diseño, desarrollo y branding.',
        keywords:
          'generador de paletas de colores, esquema de colores, colores hex, combinaciones de colores, paleta de colores',
        faq: [
          {
            q: '¿Cómo conservo un color que me gusta?',
            a: 'Hacé clic en el candado de cualquier color. Los colores bloqueados se mantienen mientras generás nuevas variaciones para el resto.',
          },
          {
            q: '¿Cómo genero una paleta nueva rápido?',
            a: 'Pulsá la barra espaciadora (en escritorio) o tocá el botón Generar. Los colores bloqueados se conservan.',
          },
          {
            q: '¿Puedo copiar los códigos hex?',
            a: 'Sí: hacé clic en cualquier color o en su código hex para copiarlo al portapapeles.',
          },
        ],
        ui: {
          generate: 'Generar (Espacio)',
          harmony: 'Armonía',
          random: 'Aleatoria',
          analogous: 'Análoga',
          monochromatic: 'Monocromática',
          complementary: 'Complementaria',
          triadic: 'Triádica',
          lock: 'Bloquear',
          unlock: 'Desbloquear',
          copyHint: 'Hacé clic en un color para copiar su código hex',
        },
      },
    },
  },
  {
    id: 'qr-code-generator',
    category: 'generators',
    icon: icons.qr,
    content: {
      en: {
        slug: 'qr-code-generator',
        name: 'QR Code Generator',
        title: 'QR Code Generator — Custom Colors, Logo & Shapes',
        description:
          'Create custom QR codes with your logo, colors, gradients and rounded shapes — for links, Wi-Fi, email, phone and contacts. Free, no watermark, in your browser.',
        h1: 'QR Code Generator',
        intro:
          'Turn a link, Wi-Fi network, email, phone number or contact card into a QR code — then make it yours with custom colors, gradients, dot and eye shapes, and your logo in the center. Everything runs in your browser: your data and your logo are never uploaded. Download as PNG or scalable SVG.',
        keywords:
          'qr code generator, custom qr code, qr code with logo, qr code colors, wifi qr code, vcard qr code, qr png svg',
        faq: [
          {
            q: 'Can I add my logo to the QR code?',
            a: 'Yes. Upload any image and it is placed in the center. The logo is processed locally and never uploaded, and the error-correction level is raised automatically so the code still scans.',
          },
          {
            q: 'Will a styled QR code still scan?',
            a: 'Yes, as long as there is enough contrast between the code and the background. If a heavily customized code is hard to read, raise the error-correction level or use less extreme colors.',
          },
          {
            q: 'What can I encode besides a link?',
            a: 'URLs and plain text, Wi-Fi networks (so people connect with one scan), email, phone numbers, SMS and contact cards (vCard).',
          },
          {
            q: 'Do these QR codes expire or have a watermark?',
            a: 'Never. They are static codes with no watermark and no limits — generate as many as you want, completely free.',
          },
        ],
        ui: {
          contentSection: 'Content',
          contentType: 'Type',
          typeUrl: 'URL',
          typeText: 'Text',
          typeWifi: 'Wi-Fi',
          typeEmail: 'Email',
          typePhone: 'Phone',
          typeSms: 'SMS',
          typeVcard: 'Contact',
          url: 'URL',
          text: 'Text',
          placeholder: 'https://example.com',
          wifiSsid: 'Network name (SSID)',
          wifiPassword: 'Password',
          wifiEnc: 'Encryption',
          wifiHidden: 'Hidden network',
          encWpa: 'WPA/WPA2',
          encWep: 'WEP',
          encNone: 'None',
          emailTo: 'To',
          emailSubject: 'Subject',
          emailBody: 'Message',
          phoneNumber: 'Phone number',
          smsNumber: 'Phone number',
          smsMessage: 'Message',
          vcFirst: 'First name',
          vcLast: 'Last name',
          vcOrg: 'Organization',
          vcTitle: 'Job title',
          vcPhone: 'Phone',
          vcEmail: 'Email',
          vcUrl: 'Website',
          styleSection: 'Style',
          presets: 'Quick styles',
          presetClassic: 'Classic',
          presetRounded: 'Rounded',
          presetDots: 'Dots',
          presetBranded: 'Branded',
          dotStyle: 'Dot style',
          cornerSquareStyle: 'Eye frame',
          cornerDotStyle: 'Eye center',
          shapeSquare: 'Square',
          shapeRounded: 'Rounded',
          shapeDots: 'Dots',
          shapeExtraRounded: 'Extra rounded',
          shapeClassy: 'Classy',
          shapeClassyRounded: 'Classy rounded',
          shapeDot: 'Dot',
          fg: 'Color',
          bg: 'Background',
          useGradient: 'Use gradient',
          gradientType: 'Gradient',
          gradLinear: 'Linear',
          gradRadial: 'Radial',
          color2: 'Second color',
          transparentBg: 'Transparent background',
          logo: 'Logo',
          addLogo: 'Add logo',
          removeLogo: 'Remove logo',
          logoSize: 'Logo size',
          errorCorrection: 'Error correction',
          ecLow: 'Low (7%)',
          ecMedium: 'Medium (15%)',
          ecQuartile: 'Quartile (25%)',
          ecHigh: 'High (30%)',
          ecLogoHint: 'Raised to High so the logo stays readable.',
          size: 'Size',
          downloadPng: 'Download PNG',
          downloadSvg: 'Download SVG',
          downloadJpg: 'Download JPG',
          downloadPdf: 'Download PDF',
          empty: 'Add content above to create your QR code.',
        },
      },
      es: {
        slug: 'generador-de-codigos-qr',
        name: 'Generador de QR',
        title: 'Generador de Códigos QR — Con Logo, Colores y Formas',
        description:
          'Creá códigos QR personalizados con tu logo, colores, degradados y formas redondeadas — para enlaces, Wi-Fi, email, teléfono y contactos. Gratis y en tu navegador.',
        h1: 'Generador de códigos QR',
        intro:
          'Convertí un enlace, una red Wi-Fi, un email, un teléfono o una tarjeta de contacto en un código QR, y hacelo tuyo con colores, degradados, formas de puntos y de ojos, y tu logo en el centro. Todo corre en tu navegador: tus datos y tu logo nunca se suben. Descargalo como PNG o SVG escalable.',
        keywords:
          'generador de códigos qr, código qr personalizado, código qr con logo, qr con colores, qr wifi, qr vcard, qr png svg',
        faq: [
          {
            q: '¿Puedo ponerle mi logo al código QR?',
            a: 'Sí. Subí cualquier imagen y se coloca en el centro. El logo se procesa localmente y nunca se sube, y el nivel de corrección de errores sube automáticamente para que el código siga escaneándose.',
          },
          {
            q: '¿Un QR con diseño sigue escaneándose?',
            a: 'Sí, mientras haya suficiente contraste entre el código y el fondo. Si un código muy personalizado cuesta leerse, subí el nivel de corrección de errores o usá colores menos extremos.',
          },
          {
            q: '¿Qué puedo codificar además de un enlace?',
            a: 'URLs y texto, redes Wi-Fi (para conectarse con un escaneo), email, teléfonos, SMS y tarjetas de contacto (vCard).',
          },
          {
            q: '¿Estos códigos QR caducan o tienen marca de agua?',
            a: 'Nunca. Son códigos estáticos, sin marca de agua y sin límites: generá todos los que quieras, totalmente gratis.',
          },
        ],
        ui: {
          contentSection: 'Contenido',
          contentType: 'Tipo',
          typeUrl: 'URL',
          typeText: 'Texto',
          typeWifi: 'Wi-Fi',
          typeEmail: 'Email',
          typePhone: 'Teléfono',
          typeSms: 'SMS',
          typeVcard: 'Contacto',
          url: 'URL',
          text: 'Texto',
          placeholder: 'https://ejemplo.com',
          wifiSsid: 'Nombre de red (SSID)',
          wifiPassword: 'Contraseña',
          wifiEnc: 'Seguridad',
          wifiHidden: 'Red oculta',
          encWpa: 'WPA/WPA2',
          encWep: 'WEP',
          encNone: 'Ninguna',
          emailTo: 'Para',
          emailSubject: 'Asunto',
          emailBody: 'Mensaje',
          phoneNumber: 'Número de teléfono',
          smsNumber: 'Número de teléfono',
          smsMessage: 'Mensaje',
          vcFirst: 'Nombre',
          vcLast: 'Apellido',
          vcOrg: 'Organización',
          vcTitle: 'Cargo',
          vcPhone: 'Teléfono',
          vcEmail: 'Email',
          vcUrl: 'Sitio web',
          styleSection: 'Estilo',
          presets: 'Estilos rápidos',
          presetClassic: 'Clásico',
          presetRounded: 'Redondeado',
          presetDots: 'Puntos',
          presetBranded: 'Con marca',
          dotStyle: 'Estilo de puntos',
          cornerSquareStyle: 'Marco del ojo',
          cornerDotStyle: 'Centro del ojo',
          shapeSquare: 'Cuadrado',
          shapeRounded: 'Redondeado',
          shapeDots: 'Puntos',
          shapeExtraRounded: 'Muy redondeado',
          shapeClassy: 'Elegante',
          shapeClassyRounded: 'Elegante redondeado',
          shapeDot: 'Punto',
          fg: 'Color',
          bg: 'Fondo',
          useGradient: 'Usar degradado',
          gradientType: 'Degradado',
          gradLinear: 'Lineal',
          gradRadial: 'Radial',
          color2: 'Segundo color',
          transparentBg: 'Fondo transparente',
          logo: 'Logo',
          addLogo: 'Agregar logo',
          removeLogo: 'Quitar logo',
          logoSize: 'Tamaño del logo',
          errorCorrection: 'Corrección de errores',
          ecLow: 'Baja (7%)',
          ecMedium: 'Media (15%)',
          ecQuartile: 'Alta (25%)',
          ecHigh: 'Máxima (30%)',
          ecLogoHint: 'Subida a Máxima para que el logo se lea.',
          size: 'Tamaño',
          downloadPng: 'Descargar PNG',
          downloadSvg: 'Descargar SVG',
          downloadJpg: 'Descargar JPG',
          downloadPdf: 'Descargar PDF',
          empty: 'Agregá contenido arriba para crear tu código QR.',
        },
      },
    },
  },
  {
    id: 'username-generator',
    category: 'generators',
    icon: icons.user,
    content: {
      en: {
        slug: 'username-generator',
        name: 'Username Generator',
        title: 'Username Generator — Cool & Available Name Ideas',
        description:
          'Generate cool, unique username ideas for gaming, social media and more. Pick a style, add numbers, copy your favorite. Free and instant in your browser.',
        h1: 'Username Generator',
        intro:
          'Out of ideas for a username? Generate dozens of unique, catchy names for gaming, social media or new accounts. Pick a style, optionally add numbers, and copy your favorite in one click.',
        keywords:
          'username generator, cool usernames, gamertag generator, name ideas, random username',
        faq: [
          {
            q: 'Are these usernames available?',
            a: 'They are randomly generated ideas, so most are uncommon — but always check availability on the site or game you want to use them on.',
          },
          {
            q: 'Can I use these for gaming?',
            a: 'Absolutely. The "gamer" style is built for gamertags, but every style works for games, social media or forums.',
          },
          {
            q: 'How do I get more options?',
            a: 'Just press Generate again — you get a fresh batch of ideas every time.',
          },
        ],
        ui: {
          style: 'Style',
          fun: 'Fun',
          gamer: 'Gamer',
          professional: 'Professional',
          aesthetic: 'Aesthetic',
          addNumbers: 'Add numbers',
          generate: 'Generate usernames',
        },
      },
      es: {
        slug: 'generador-de-nombres-de-usuario',
        name: 'Generador de nombres',
        title: 'Generador de Nombres de Usuario — Ideas Originales',
        description:
          'Generá nombres de usuario originales para juegos, redes sociales y más. Elegí un estilo, agregá números y copiá tu favorito. Gratis y al instante.',
        h1: 'Generador de nombres de usuario',
        intro:
          '¿Sin ideas para un nombre de usuario? Generá decenas de nombres únicos y llamativos para juegos, redes sociales o cuentas nuevas. Elegí un estilo, agregá números si querés y copiá tu favorito con un clic.',
        keywords:
          'generador de nombres de usuario, nombres para juegos, gamertag, ideas de nombres, nombre de usuario aleatorio',
        faq: [
          {
            q: '¿Estos nombres de usuario están disponibles?',
            a: 'Son ideas generadas al azar, así que la mayoría son poco comunes, pero siempre verificá la disponibilidad en el sitio o juego donde los quieras usar.',
          },
          {
            q: '¿Sirven para juegos?',
            a: 'Totalmente. El estilo «gamer» está pensado para gamertags, pero todos los estilos sirven para juegos, redes o foros.',
          },
          {
            q: '¿Cómo consigo más opciones?',
            a: 'Pulsá Generar otra vez: cada vez obtenés un lote nuevo de ideas.',
          },
        ],
        ui: {
          style: 'Estilo',
          fun: 'Divertido',
          gamer: 'Gamer',
          professional: 'Profesional',
          aesthetic: 'Estético',
          addNumbers: 'Agregar números',
          generate: 'Generar nombres',
        },
      },
    },
  },
  // ─────────────────────────────── IMAGE TOOLS ──────────────────────────────
  {
    id: 'compress-image',
    category: 'image',
    icon: icons.compress,
    content: {
      en: {
        slug: 'compress-image',
        name: 'Compress Image',
        title: 'Compress Image — Reduce JPG, PNG & WebP Size',
        description:
          'Compress JPG, PNG and WebP images to a smaller file size without uploading. Adjust quality, see before/after, download. 100% private, in your browser.',
        h1: 'Compress Image',
        intro:
          'Shrink JPG, PNG and WebP images to a smaller file size right in your browser. Drag in a photo, adjust the quality, and download the optimized result. Your image is never uploaded to a server.',
        keywords:
          'compress image, image compressor, reduce image size, compress jpg, compress png, shrink photo',
        faq: [
          {
            q: 'Is my image uploaded anywhere?',
            a: 'No. Compression happens entirely in your browser using your device. Your photo never touches a server.',
          },
          {
            q: 'Will compression reduce quality?',
            a: 'You control it. Higher quality keeps more detail and a larger file; lower quality saves more space. The preview shows the exact result and file size before you download.',
          },
          {
            q: 'What formats are supported?',
            a: 'JPG, PNG and WebP. You can also export as WebP for the smallest size.',
          },
        ],
        ui: {
          quality: 'Quality',
          outputFormat: 'Output format',
          original: 'Original',
          compressed: 'Compressed',
          saved: 'Saved',
          chooseAnother: 'Choose another image',
        },
      },
      es: {
        slug: 'comprimir-imagen',
        name: 'Comprimir imagen',
        title: 'Comprimir Imagen — Reducir Peso de JPG, PNG y WebP',
        description:
          'Comprimí imágenes JPG, PNG y WebP a menor tamaño sin subir nada. Ajustá la calidad, mirá el antes/después y descargá. 100% privado, en tu navegador.',
        h1: 'Comprimir imagen',
        intro:
          'Reducí el peso de imágenes JPG, PNG y WebP directamente en tu navegador. Arrastrá una foto, ajustá la calidad y descargá el resultado optimizado. Tu imagen nunca se sube a un servidor.',
        keywords:
          'comprimir imagen, reducir tamaño imagen, compresor de imágenes, comprimir jpg, comprimir png, reducir peso foto',
        faq: [
          {
            q: '¿Mi imagen se sube a algún lado?',
            a: 'No. La compresión ocurre totalmente en tu navegador, usando tu dispositivo. Tu foto nunca pasa por un servidor.',
          },
          {
            q: '¿La compresión baja la calidad?',
            a: 'Vos la controlás. Más calidad conserva más detalle y un archivo más grande; menos calidad ahorra más espacio. La vista previa muestra el resultado y el peso exactos antes de descargar.',
          },
          {
            q: '¿Qué formatos soporta?',
            a: 'JPG, PNG y WebP. También podés exportar como WebP para el menor tamaño posible.',
          },
        ],
        ui: {
          quality: 'Calidad',
          outputFormat: 'Formato de salida',
          original: 'Original',
          compressed: 'Comprimida',
          saved: 'Ahorro',
          chooseAnother: 'Elegir otra imagen',
        },
      },
    },
  },
  {
    id: 'resize-image',
    category: 'image',
    icon: icons.resize,
    content: {
      en: {
        slug: 'resize-image',
        name: 'Resize Image',
        title: 'Resize Image — Change Width & Height Online',
        description:
          'Resize images to exact pixel dimensions online. Lock the aspect ratio, set width/height, download instantly. No upload — runs 100% in your browser.',
        h1: 'Resize Image',
        intro:
          'Change an image to exact pixel dimensions in seconds. Drop in your photo, set the width and height (keep the aspect ratio locked if you like), and download. Everything happens in your browser.',
        keywords:
          'resize image, image resizer, change image size, resize photo, scale image, image dimensions',
        faq: [
          {
            q: 'Does resizing upload my image?',
            a: 'No. Your image is resized locally in your browser and never sent to any server.',
          },
          {
            q: 'How do I keep the proportions?',
            a: 'Turn on "Lock aspect ratio" and changing the width updates the height automatically (and vice-versa) so the image is not stretched.',
          },
          {
            q: 'What format will I get back?',
            a: 'By default you keep the original format. You can also export to PNG, JPG or WebP.',
          },
        ],
        ui: {
          width: 'Width (px)',
          height: 'Height (px)',
          lockRatio: 'Lock aspect ratio',
          outputFormat: 'Output format',
          keepOriginal: 'Keep original',
          chooseAnother: 'Choose another image',
        },
      },
      es: {
        slug: 'redimensionar-imagen',
        name: 'Redimensionar imagen',
        title: 'Redimensionar Imagen — Cambiar Ancho y Alto Online',
        description:
          'Redimensioná imágenes a píxeles exactos online. Bloqueá la proporción, definí ancho/alto y descargá al instante. Sin subir nada: 100% en tu navegador.',
        h1: 'Redimensionar imagen',
        intro:
          'Cambiá una imagen a dimensiones exactas en segundos. Soltá tu foto, definí el ancho y el alto (mantené la proporción bloqueada si querés) y descargá. Todo ocurre en tu navegador.',
        keywords:
          'redimensionar imagen, cambiar tamaño imagen, escalar imagen, ajustar tamaño foto, dimensiones imagen, achicar imagen',
        faq: [
          {
            q: '¿Redimensionar sube mi imagen?',
            a: 'No. Tu imagen se redimensiona localmente en tu navegador y nunca se envía a ningún servidor.',
          },
          {
            q: '¿Cómo mantengo las proporciones?',
            a: 'Activá «Bloquear proporción» y al cambiar el ancho se ajusta el alto automáticamente (y al revés) para que la imagen no se deforme.',
          },
          {
            q: '¿En qué formato lo recibo?',
            a: 'Por defecto conservás el formato original. También podés exportar a PNG, JPG o WebP.',
          },
        ],
        ui: {
          width: 'Ancho (px)',
          height: 'Alto (px)',
          lockRatio: 'Bloquear proporción',
          outputFormat: 'Formato de salida',
          keepOriginal: 'Mantener original',
          chooseAnother: 'Elegir otra imagen',
        },
      },
    },
  },
  {
    id: 'convert-image',
    category: 'image',
    icon: icons.convert,
    content: {
      en: {
        slug: 'convert-image',
        name: 'Convert Image',
        title: 'Convert Image — JPG, PNG & WebP Converter',
        description:
          'Convert images between JPG, PNG and WebP in your browser. No upload, no watermark, no signup. Fast and 100% private — download in one click.',
        h1: 'Image Converter',
        intro:
          'Convert images between JPG, PNG and WebP without uploading anything. Drop in a file, pick the target format, and download the converted image instantly. Fast, private and free.',
        keywords:
          'convert image, image converter, png to jpg, jpg to png, webp converter, change image format',
        faq: [
          {
            q: 'Which conversions are supported?',
            a: 'You can convert freely between JPG, PNG and WebP — for example PNG to JPG, JPG to WebP, or WebP to PNG.',
          },
          {
            q: 'Is my file uploaded to a server?',
            a: 'No. The conversion runs entirely in your browser, so your image stays on your device.',
          },
          {
            q: 'Why convert to WebP?',
            a: 'WebP usually produces a much smaller file than JPG or PNG at the same quality, which makes pages load faster.',
          },
        ],
        ui: {
          convertTo: 'Convert to',
          quality: 'Quality',
          chooseAnother: 'Choose another image',
        },
      },
      es: {
        slug: 'convertir-imagen',
        name: 'Convertir imagen',
        title: 'Convertir Imagen — Conversor JPG, PNG y WebP',
        description:
          'Convertí imágenes entre JPG, PNG y WebP en tu navegador. Sin subir nada, sin marca de agua, sin registro. Rápido y 100% privado: descargá en un clic.',
        h1: 'Conversor de imágenes',
        intro:
          'Convertí imágenes entre JPG, PNG y WebP sin subir nada. Soltá un archivo, elegí el formato de destino y descargá la imagen convertida al instante. Rápido, privado y gratis.',
        keywords:
          'convertir imagen, conversor de imágenes, png a jpg, jpg a png, conversor webp, cambiar formato imagen',
        faq: [
          {
            q: '¿Qué conversiones soporta?',
            a: 'Podés convertir libremente entre JPG, PNG y WebP: por ejemplo PNG a JPG, JPG a WebP o WebP a PNG.',
          },
          {
            q: '¿Mi archivo se sube a un servidor?',
            a: 'No. La conversión corre totalmente en tu navegador, así que tu imagen se queda en tu dispositivo.',
          },
          {
            q: '¿Por qué convertir a WebP?',
            a: 'WebP suele generar un archivo mucho más liviano que JPG o PNG con la misma calidad, lo que hace que las páginas carguen más rápido.',
          },
        ],
        ui: {
          convertTo: 'Convertir a',
          quality: 'Calidad',
          chooseAnother: 'Elegir otra imagen',
        },
      },
    },
  },
  {
    id: 'image-size',
    category: 'image',
    icon: icons.ruler,
    content: {
      en: {
        slug: 'image-size',
        name: 'Image Size Checker',
        title: 'Image Size Checker — Dimensions & File Size',
        description:
          'Check any image’s pixel dimensions, file size, aspect ratio and megapixels instantly. No upload — drag a photo and see the details in your browser.',
        h1: 'Image Size Checker',
        intro:
          'Find out the exact dimensions, file size, aspect ratio and megapixels of any image. Just drag in a photo — the details appear instantly and nothing is uploaded.',
        keywords:
          'image size, image dimensions, check image size, photo resolution, aspect ratio, megapixels',
        faq: [
          {
            q: 'What information does this show?',
            a: 'The width and height in pixels, the file size, the aspect ratio (e.g. 16:9) and the total megapixels.',
          },
          {
            q: 'Is my image uploaded?',
            a: 'No. The file is read locally in your browser to display its properties — it is never sent anywhere.',
          },
          {
            q: 'Which image formats work?',
            a: 'Any format your browser can display, including JPG, PNG, WebP, GIF and SVG.',
          },
        ],
        ui: {
          dimensions: 'Dimensions',
          fileSize: 'File size',
          aspectRatio: 'Aspect ratio',
          megapixels: 'Megapixels',
          fileType: 'Type',
          fileName: 'File name',
          chooseAnother: 'Choose another image',
        },
      },
      es: {
        slug: 'tamano-de-imagen',
        name: 'Ver tamaño de imagen',
        title: 'Ver Tamaño de Imagen — Dimensiones y Peso',
        description:
          'Conocé al instante las dimensiones en píxeles, el peso, la proporción y los megapíxeles de cualquier imagen. Sin subir nada: arrastrá una foto y mirá los datos.',
        h1: 'Ver tamaño de imagen',
        intro:
          'Averiguá las dimensiones exactas, el peso, la proporción y los megapíxeles de cualquier imagen. Solo arrastrá una foto: los datos aparecen al instante y no se sube nada.',
        keywords:
          'tamaño de imagen, dimensiones de imagen, ver tamaño foto, resolución imagen, proporción de aspecto, megapíxeles',
        faq: [
          {
            q: '¿Qué información muestra?',
            a: 'El ancho y alto en píxeles, el peso del archivo, la proporción de aspecto (ej. 16:9) y el total de megapíxeles.',
          },
          {
            q: '¿Se sube mi imagen?',
            a: 'No. El archivo se lee localmente en tu navegador para mostrar sus propiedades; nunca se envía a ningún lado.',
          },
          {
            q: '¿Qué formatos funcionan?',
            a: 'Cualquier formato que tu navegador pueda mostrar, incluyendo JPG, PNG, WebP, GIF y SVG.',
          },
        ],
        ui: {
          dimensions: 'Dimensiones',
          fileSize: 'Peso',
          aspectRatio: 'Proporción',
          megapixels: 'Megapíxeles',
          fileType: 'Tipo',
          fileName: 'Nombre',
          chooseAnother: 'Elegir otra imagen',
        },
      },
    },
  },
];

/** Look up a tool by id. */
export function getTool(id: string): Tool | undefined {
  return tools.find((t) => t.id === id);
}

/** All tools in a category. */
export function toolsByCategory(category: Category): Tool[] {
  return tools.filter((t) => t.category === category);
}
