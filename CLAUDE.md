# Monika Kacprzak — Personal Trainer Website

## Project Overview

Marketing website for Monika Kacprzak, a medical personal trainer based in Poznań, Poland. The site showcases her services (1:1 training, diagnostics, training plans, mini groups), portfolio with embedded YouTube videos, client testimonials, and contact information. The goal is to convert visitors into consultation bookings.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 19 + TypeScript |
| Bundler | Vite 6 |
| Styling | Tailwind CSS v4 (via `@tailwindcss/vite` plugin) |
| Icons | lucide-react |
| Animations | Custom CSS keyframes + `motion` library |
| API | Google Gemini (`@google/genai`) |
| Fonts | Google Fonts (Bodoni Moda, Cormorant Garamond, DM Sans) |

## Key Directories

| Path | Purpose |
|------|---------|
| [strona/src/](strona/src/) | All application source code |
| [strona/src/App.tsx](strona/src/App.tsx) | Main landing page — hero, about, services, testimonials, contact |
| [strona/src/PortfolioPage.tsx](strona/src/PortfolioPage.tsx) | Separate portfolio page with YouTube video embeds |
| [strona/src/index.css](strona/src/index.css) | Tailwind imports, custom theme tokens, animations, utilities |
| [strona/public/](strona/public/) | Static assets (photos, logos, review screenshots) |
| [strona/vite.config.ts](strona/vite.config.ts) | Vite config — multi-page build, Tailwind plugin, path aliases |

## Commands

All commands run from the `strona/` directory:

```
npm run dev       # Start dev server (port 3000)
npm run build     # Production build → dist/
npm run preview   # Preview production build
npm run clean     # Remove dist/
npm run lint      # Type-check with tsc --noEmit
```

## Architecture Notes

- **Multi-page build**: Vite is configured with two entry points — `index.html` (main) and `portfolio.html` (portfolio). See [vite.config.ts:12-15](strona/vite.config.ts#L12-L15).
- **No client-side router**: Navigation uses anchor links (`#section-id`) and a separate `portfolio.html` page.
- **Design system**: Colors and typography are defined as CSS custom properties in `@theme` block at [index.css:4-32](strona/src/index.css#L4-L32), following Material Design 3 token naming.
- **Accessibility**: WCAG AA compliance — `prefers-reduced-motion` support, `:focus-visible` styles, `aria-label` on interactive elements.

## Additional Documentation

- [Architectural Patterns](.claude/docs/architectural_patterns.md) — Custom hooks, component patterns, animation system, data conventions
