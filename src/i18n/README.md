# System Internacjonalizacji (i18n) - Sportigio

## 📖 Opis

System i18n umożliwia łatwe tłumaczenie całej aplikacji na różne języki. Obecnie obsługujemy:
- **🇵🇱 Polski (pl)** - język domyślny
- **🇬🇧 Angielski (en)** 
- **🇪🇸 Hiszpański (es)**
- **🇩🇪 Niemiecki (de)**

## 📁 Struktura plików

```
src/i18n/
├── index.ts       # Helper functions i system
├── pl.json        # Polskie tłumaczenia (główne)
├── en.json        # Angielskie tłumaczenia
├── es.json        # Hiszpańskie tłumaczenia
├── de.json        # Niemieckie tłumaczenia
└── README.md      # Ta dokumentacja
```

## 🚀 Jak używać w komponentach

### 1. Import w komponencie Astro

```astro
---
import { createTranslator, type Language } from '../i18n';

export interface Props {
  lang?: Language;
}

const { lang = 'pl' } = Astro.props;
const t = createTranslator(lang);
---

<h1>{t('hero.title')}</h1>
<p>{t('hero.subtitle')}</p>
<button>{t('common.try_free')}</button>
```

### 2. Przekazywanie języka do komponentów

```astro
<!-- W stronie głównej -->
<Hero lang={lang} />
<TestimonialCarousel lang={lang} />
```

### 3. Tworzenie stron w różnych językach

```astro
<!-- src/pages/en.astro -->
---
import LandingPage from '../components/LandingPage.astro';
const lang = 'en';
---
<LandingPage lang={lang} />
```

## 🔧 Dodawanie nowych tłumaczeń

### 1. Dodaj klucz w pl.json (język główny)
```json
{
  "new_section": {
    "title": "Nowy tytuł",
    "description": "Opis sekcji"
  }
}
```

### 2. Dodaj odpowiedniki w innych językach
```json
// en.json
{
  "new_section": {
    "title": "New Title", 
    "description": "Section description"
  }
}
```

### 3. Użyj w komponencie
```astro
<h2>{t('new_section.title')}</h2>
<p>{t('new_section.description')}</p>
```

## 📝 Struktura kluczy

### Organizacja tłumaczeń:
- `common.*` - wspólne elementy (przyciski, linki)
- `navigation.*` - menu i nawigacja
- `hero.*` - sekcja hero
- `testimonials.*` - opinie klientów
- `pricing.*` - strona cennika
- `features.*` - funkcje produktu

### Przykłady kluczy:
- `common.try_free` → "Wypróbuj za darmo"
- `hero.title` → "Komunikacja klubu w 1 prostej"
- `testimonials.ai_summary` → "AI PODSUMOWANIE"

## ✅ Najlepsze praktyki

1. **Zawsze dodawaj tłumaczenia w pl.json najpierw**
2. **Używaj dot notation** dla zagnieżdżonych obiektów
3. **Grupuj podobne tłumaczenia** razem
4. **Używaj opisowych nazw kluczy**
5. **Testuj wszystkie języki** po dodaniu nowych tekstów

## 🔄 Workflow dodawania nowego języka

1. Stwórz plik `{kod_języka}.json`
2. Dodaj język do `languages` w `index.ts`
3. Skopiuj strukturę z `pl.json` 
4. Przetłumacz wszystkie teksty
5. Stwórz stronę `src/pages/{kod}.astro`
6. Testuj nowy język

## 🛠️ Narzędzia pomocnicze

### Funkcje dostępne:
- `t(key, lang)` - pobierz tłumaczenie
- `createTranslator(lang)` - stwórz translator dla komponentu
- `getTranslations(lang)` - pobierz wszystkie tłumaczenia
- `getNestedValue(obj, path)` - pobierz zagnieżdżoną wartość

### TypeScript support:
- `Language` type dla bezpieczeństwa typów
- Auto-complete dla dostępnych języków
- Sprawdzanie typów w IDE

## 🚨 Częste problemy

1. **Brakujący klucz** - funkcja zwróci sam klucz
2. **Nieistniejący język** - fallback do polskiego
3. **Nieprawidłowa ścieżka** - sprawdź dot notation

Gotowe! 🎉 Teraz możesz łatwo zarządzać tłumaczeniami w całej aplikacji. 