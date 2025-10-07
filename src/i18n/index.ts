// src/i18n/index.ts
export type Language = 'pl' | 'en' | 'es' | 'de';

export const languages: Record<Language, string> = {
  pl: 'Polski',
  en: 'English',
  es: 'Español',
  de: 'Deutsch'
};

export const defaultLanguage: Language = 'pl';

// Import all translations synchronously
import plTranslations from './pl.json';
import enTranslations from './en.json';
import esTranslations from './es.json';
import deTranslations from './de.json';

const translations = {
  pl: plTranslations,
  en: enTranslations,
  es: esTranslations,
  de: deTranslations
};

// Get translation function
export function getTranslations(lang: Language = defaultLanguage) {
  return translations[lang] || translations[defaultLanguage];
}

// Helper function to get nested value from object using dot notation
export function getNestedValue(obj: any, path: string): string {
  const keys = path.split('.');
  let result = obj;

  for (const key of keys) {
    result = result?.[key];
  }

  return result || path;
}

// Main translation function
export function t(key: string, lang: Language = defaultLanguage): string {
  const translationObj = getTranslations(lang);
  return getNestedValue(translationObj, key);
}

// Create translator function for components
export function createTranslator(lang: Language = defaultLanguage) {
  const translationObj = getTranslations(lang);
  return function (key: string): string {
    return getNestedValue(translationObj, key);
  };
}

// URL helpers to preserve current language across internal navigation
export function normalizePath(path: string): string {
  if (!path) return '/';
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function stripLanguagePrefix(path: string): string {
  const secondary: Language[] = ['en', 'es', 'de'];
  for (const code of secondary) {
    const prefix = `/${code}`;
    if (path === prefix) return '/';
    if (path.startsWith(`${prefix}/`)) {
      const remainder = path.slice(prefix.length);
      return remainder ? remainder : '/';
    }
  }
  return path;
}

export function isExternalHref(href: string): boolean {
  return (
    /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
  );
}

export function localizeHref(href: string, lang: Language = defaultLanguage): string {
  if (!href) return href;
  if (isExternalHref(href)) return href;
  // Preserve hash fragments
  const [pathPart, hashPart] = href.split('#', 2);
  if (pathPart === '' && hashPart) return `#${hashPart}`; // pure hash
  const normalized = normalizePath(pathPart || '/');
  const unprefixed = stripLanguagePrefix(normalized);
  const localized = lang === defaultLanguage
    ? (unprefixed === '/' ? '/' : unprefixed)
    : (unprefixed === '/' ? `/${lang}` : `/${lang}${unprefixed}`);
  return hashPart ? `${localized}#${hashPart}` : localized;
}