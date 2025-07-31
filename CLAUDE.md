# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start development server at `localhost:4321` |
| `npm run build` | Build production site to `./dist/` |
| `npm run preview` | Preview build locally before deployment |
| `npm run astro` | Run Astro CLI commands |

## Project Architecture

This is a multilingual **Astro** landing page for Sportigio, a sports club communication app. The project uses:

- **Framework**: Astro with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Languages**: Polish (default), English, Spanish, German
- **Build Target**: Static site generation

### Key Architecture Patterns

**Internationalization (i18n)**
- Language-specific routes: `/`, `/en`, `/es`, `/de`
- Translation system in `src/i18n/` with JSON files for each language
- Default language is Polish (`pl`)
- Use `createTranslator(lang)` in components for translations

**Component Structure**
- Two layout systems exist:
  - `src/layouts/Layout.astro` - Basic layout with fonts and meta
  - `src/components/Layout.astro` - Enhanced layout with animations and interactivity
- Components follow Astro patterns with frontmatter and template sections
- All components use Tailwind CSS classes

**Styling System**
- Custom Tailwind config with Sportigio brand colors:
  - `primary`: #0B2360 (dark blue)
  - `secondary`: #01DFEC (cyan)
  - `accent`: #EA36E1 (magenta)
- Custom fonts: Inter (body), Poppins (headings)
- Predefined spacing, typography, and component tokens

### Critical Files

**Main Pages**
- `src/pages/index.astro` - Polish landing page (default)
- `src/pages/en.astro`, `src/pages/es.astro`, `src/pages/de.astro` - Localized versions
- `src/pages/pricing.astro` - Pricing page
- `src/pages/blog.astro` - Blog listing page
- `src/pages/blog/[id].astro` - Individual blog post pages

**Core Components**
- `src/components/LandingPage.astro` - Main landing page template
- `src/components/Navbar.astro` - Navigation with language switcher
- `src/components/Hero.astro` - Hero section with CTA
- `src/components/TestimonialCarousel.astro` - Customer testimonials

**API Integration**
- `src/utils/api.ts` - Blog API utilities for Sportigio CMS
- API base URL: `https://sportigio.com/api`
- **Known Issue**: Article IDs are off by 1 in the API (workaround implemented)

### Animation System

The project includes advanced animations via `src/components/Layout.astro`:
- Intersection Observer for scroll-triggered animations
- Parallax effects for floating elements
- 3D tilt effects for cards (`.card-3d`)
- Animated counters for statistics
- Magnetic button effects (`.btn-glow`)
- Dynamic particle generation

### Development Notes

- All text content should be internationalized using the i18n system
- Components should accept `lang` prop for translations
- Use existing Tailwind classes following the design system
- Follow TypeScript strict mode (configured in tsconfig.json)
- Prefer editing existing components over creating new ones
- Blog content is fetched from external API, not local files