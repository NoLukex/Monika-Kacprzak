# Architectural Patterns & Conventions

## Custom Hooks

### `useIntersection<T>(threshold?)` — [App.tsx:108-137](strona/src/App.tsx#L108-L137)

Generic IntersectionObserver hook returning `[ref, visible]`. Used for one-shot entrance animations. Respects `prefers-reduced-motion` by setting `visible = true` immediately.

### `useReveal<T>(direction, delay?, threshold?)` — [App.tsx:144-173](strona/src/App.tsx#L144-L173)

Variant that directly manipulates DOM classes (`reveal-section`, `is-visible`) on the ref element. Supports directions: `from-bottom`, `from-left`, `from-right`, `scale-hidden` and staggered delays (100–500ms).

**When to use which**: `useIntersection` when you need the boolean state for conditional rendering/class names in JSX. `useReveal` when you want the CSS class manipulation approach (cleaner JSX, animation defined in CSS).

## Component Patterns

### Section Component Pattern

All page sections follow a consistent structure:

```tsx
const SectionName = () => {
  const [ref, visible] = useIntersection();  // or useReveal()

  return (
    <section id="section-id" ref={ref} className="...">
      <div className={`... ${visible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* content */}
      </div>
    </section>
  );
};
```

Sections are defined as standalone function components within the same file ([App.tsx](strona/src/App.tsx)). No separate files per component — the entire landing page lives in one file.

### Data-as-Constants

Static content data is defined as module-level `const` objects/arrays, then mapped to JSX:
- `CONTACT` — [App.tsx:23-33](strona/src/App.tsx#L23-L33) — all external links and contact info
- `NAV_ITEMS` — [App.tsx:35-42](strona/src/App.tsx#L35-L42) — navigation links as `[href, label]` tuples
- `OFFER_ITEMS` — [App.tsx:44-75](strona/src/App.tsx#L44-L75) — service cards data
- `painPoints` — [App.tsx:471-492](strona/src/App.tsx#L471-L492) — customer pain point cards
- `VIDEOS` — [PortfolioPage.tsx:10-35](strona/src/PortfolioPage.tsx#L10-L35) — YouTube video entries

This keeps content separate from presentation logic, making it easy to update text without touching JSX.

### Reusable Brand Component

`PersonalMark` — [App.tsx:95-106](strona/src/App.tsx#L95-L106) and [PortfolioPage.tsx:37-42](strona/src/PortfolioPage.tsx#L37-L42) — renders the brand name + role with configurable emphasis. Duplicated across both files (not extracted to a shared module).

### Memoized Micro-components

`StatCard` uses `React.memo` for performance — [App.tsx:459-466](strona/src/App.tsx#L459-L466). Applied to small, frequently-rendered presentational components.

## Animation System

### CSS-Driven Animations

All animations are defined as CSS `@keyframes` in [index.css:200-278](strona/src/index.css#L200-L278):
- `fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `testimonialSwap`
- Shared easing: `cubic-bezier(0.22, 1, 0.36, 1)`
- Staggered delays via `.delay-{100,200,300,400,500}` utility classes

### Scroll Reveal System

`.reveal-section` classes with IntersectionObserver — [index.css:393-446](strona/src/index.css#L393-L446). Elements start hidden (`opacity: 0`, translated) and get `.is-visible` class when scrolled into view. Respects `prefers-reduced-motion` by disabling all transitions.

### Grain Texture Overlay

`.grain-overlay::after` — [index.css:185-195](strona/src/index.css#L185-L195) — SVG-based noise texture applied via `::after` pseudo-element for visual depth on hero sections.

## State Management

No external state management. All state is local component state via `useState`. No context providers, no Redux/Zustand. The app is small enough that component-level state suffices.

## Routing & Navigation

No client-side router. The app uses:
- **Anchor links** (`#o-mnie`, `#oferta`, etc.) for in-page navigation
- **Separate HTML page** (`portfolio.html`) for the portfolio section, built as a separate Vite entry point — [vite.config.ts:12-15](strona/vite.config.ts#L12-L15)
- **Scroll margin** CSS for proper anchor positioning — [index.css:52-116](strona/src/index.css#L52-L116)

## Mobile Patterns

- **Sticky CTA bar** — `.sticky-cta` class — [index.css:310-327](strona/src/index.css#L310-L327) — fixed bottom bar on mobile, hidden on desktop
- **Floating action button** — `.call-fab` class — [index.css:330-373](strona/src/index.css#L330-L373) — phone call FAB, hidden on mobile (replaced by sticky CTA)
- **Collapsible nav menu** — CSS `max-h-0` / `max-h-[32rem]` transition — [App.tsx:247-270](strona/src/App.tsx#L247-L270)
- **Safe area insets** — `env(safe-area-inset-bottom)` padding for notched devices

## Design Token System

Colors follow Material Design 3 naming: `primary`, `on-primary`, `primary-container`, `surface`, `surface-container-*`, etc. Defined in [index.css:4-24](strona/src/index.css#L4-L24). Three font families: `--font-sans` (DM Sans), `--font-display` (Cormorant Garamond), `--font-brand` (Bodoni Moda) — [index.css:27-29](strona/src/index.css#L27-L29).