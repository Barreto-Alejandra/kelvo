import type { Locale } from '@/config';

/** Global, non-tool-specific UI strings. */
export const ui = {
  en: {
    'site.tagline': 'Single-purpose web tools that just work.',
    'site.intro':
      'Free online tools that do one thing well. No signup, no upload, no tracking — everything runs right in your browser.',
    'nav.allTools': 'All tools',
    'tab.all': 'All',
    'tab.generators': 'Generators',
    'tab.image': 'Image',
    'tab.filterAria': 'Filter tools by category',
    'home.heroTitle': 'Tiny web tools that just work',
    'home.heroSubtitle':
      'No signup. No upload. No tracking. Open it, use it, done — everything runs in your browser.',
    'home.section.generators': 'Generators',
    'home.section.image': 'Image tools',
    'home.privacyTitle': 'Private by design',
    'home.privacyBody':
      'Your files never leave your device. Every tool runs 100% in your browser using your own computer — nothing is uploaded to a server.',
    'badge.private': '100% in your browser',
    'badge.free': 'Free',
    'badge.noUpload': 'Nothing uploaded',
    'common.copy': 'Copy',
    'common.copied': 'Copied!',
    'common.download': 'Download',
    'common.clear': 'Clear',
    'common.dropHere': 'Drop an image here, or click to choose a file',
    'common.dropHint': 'Your image is processed locally and never uploaded.',
    'common.faq': 'Frequently asked questions',
    'common.relatedTools': 'Other tools',
    'common.backHome': 'All tools',
    'common.processedLocally': 'Processed locally in your browser. Nothing is uploaded.',
    'footer.privacy': 'No tracking. No cookies. No accounts.',
    'footer.madeWith': 'Built to be fast, private and free.',
    'lang.switch': 'Language',
    'lang.en': 'English',
    'lang.es': 'Español',
    'ad.label': 'Advertisement',
  },
  es: {
    'site.tagline': 'Herramientas web que hacen una sola cosa, y la hacen bien.',
    'site.intro':
      'Herramientas online gratis que hacen una sola cosa bien. Sin registro, sin subir nada, sin rastreo: todo funciona en tu navegador.',
    'nav.allTools': 'Todas las herramientas',
    'tab.all': 'Todas',
    'tab.generators': 'Generadores',
    'tab.image': 'Imagen',
    'tab.filterAria': 'Filtrar herramientas por categoría',
    'home.heroTitle': 'Herramientas web que simplemente funcionan',
    'home.heroSubtitle':
      'Sin registro. Sin subir nada. Sin rastreo. Entrás, la usás y listo: todo corre en tu navegador.',
    'home.section.generators': 'Generadores',
    'home.section.image': 'Herramientas de imagen',
    'home.privacyTitle': 'Privadas por diseño',
    'home.privacyBody':
      'Tus archivos nunca salen de tu dispositivo. Cada herramienta funciona 100% en tu navegador usando tu propia computadora: no se sube nada a ningún servidor.',
    'badge.private': '100% en tu navegador',
    'badge.free': 'Gratis',
    'badge.noUpload': 'No se sube nada',
    'common.copy': 'Copiar',
    'common.copied': '¡Copiado!',
    'common.download': 'Descargar',
    'common.clear': 'Limpiar',
    'common.dropHere': 'Arrastrá una imagen acá, o hacé clic para elegir un archivo',
    'common.dropHint': 'Tu imagen se procesa localmente y nunca se sube.',
    'common.faq': 'Preguntas frecuentes',
    'common.relatedTools': 'Otras herramientas',
    'common.backHome': 'Todas las herramientas',
    'common.processedLocally': 'Procesado localmente en tu navegador. No se sube nada.',
    'footer.privacy': 'Sin rastreo. Sin cookies. Sin cuentas.',
    'footer.madeWith': 'Hecho para ser rápido, privado y gratis.',
    'lang.switch': 'Idioma',
    'lang.en': 'English',
    'lang.es': 'Español',
    'ad.label': 'Publicidad',
  },
} satisfies Record<Locale, Record<string, string>>;

export type UIKey = keyof (typeof ui)['en'];

/** Returns a translation helper bound to a locale. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return ui[locale][key] ?? ui.en[key] ?? String(key);
  };
}
