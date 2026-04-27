# Astro Gastro Academy — Koncept Designu

Statyczny prototyp strony kursów online dla AstroGastro Academy.

## Podgląd

Otwórz `index.html` w przeglądarce lub odwiedź deploy na Vercel.

## Struktura

- `index.html` — punkt wejścia
- `app.jsx` — router i kontroler widoków
- `components/shared.jsx` — wspólne komponenty (nawigacja, footer, karty)
- `pages/` — widoki:
  - `landing.jsx` — strona główna
  - `student.jsx` — dashboard studenta + odtwarzacz lekcji
  - `admin.jsx` — panel administratora
  - `design-system.jsx` — design system / styleguide
- `styles/tokens.css` — design tokeny (kolory, typografia)

## Technologia

- React 18 (UMD przez CDN)
- Babel Standalone (transpilacja JSX w przeglądarce)
- Czysty CSS z custom properties (design tokens)
- Bez bundlerów, bez build step — działa natychmiast

## Kolejne kroki

Po akceptacji koncepcji wizualnej przez klienta:
1. Migracja na hosting Cyberfolks (PHP/Laravel + MySQL)
2. Integracja z Google Workspace klienta (treści w Drive)
3. Synchronizacja z bazą newsletterową WordPress (n8n na mikr.us)
