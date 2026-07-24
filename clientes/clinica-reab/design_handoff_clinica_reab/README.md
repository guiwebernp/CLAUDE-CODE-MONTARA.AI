# Handoff: Clínica Reab — Website Redesign

## Overview
Redesigned marketing site prototype for Clínica Reab, a physiotherapy clinic in Florianópolis (existing site: fisioterapiareab.com.br). Content (services, pathologies, blog posts, contact info) was extracted from the real current site. Goal: a modern, agency-quality single-page site to replace the outdated current one.

## About the Design Files
The file in this bundle (`Clinica Reab.dc.html`) is a **design reference built in HTML** — a working prototype showing the intended look, content, and interactions, not production code to copy line-for-line. The task is to **recreate this design in the target codebase's environment** (e.g. WordPress/Elementor since that's the current CMS, or a framework of your choice — React, plain HTML/CSS, etc.) using that environment's own conventions, asset pipeline, and CMS fields where applicable.

It runs on a small proprietary template runtime (`support.js`) that is **only for previewing in this tool** — do not port that runtime; treat the rendered page/behavior as the spec.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, copy, and interactions are intentional and should be recreated pixel-close. Placeholder content (marked explicitly, see below) should be swapped for real assets before launch.

## Screens / Views
Single long-scrolling homepage with these sections, in order:

1. **Nav** — fixed top bar. Transparent over hero, gains a translucent dark blurred background (`rgba(20,16,15,0.85)`, `backdrop-filter: blur(12px)`, shadow `0 2px 20px rgba(0,0,0,0.4)`) after ~12px scroll (JS scroll listener). Logo image (dark chip, `background:#111`, `border-radius:8px`, `padding:6px 14px 6px 8px`) at left, height 38px. Links: Sobre, Serviços, Estrutura, Patologias, Blog (anchor links to section ids). CTA pill button "Agendar avaliação" linking to WhatsApp.

2. **Hero** (`#topo`, `min-height:92vh`) — background looping video (`assets/hero-video.mp4`, autoplay/loop/muted/playsinline, `object-fit:cover`), with two dark scrim overlays for text legibility: a left-to-right gradient (`linear-gradient(90deg, rgba(20,16,15,0.85) 0%, rgba(20,16,15,0.55) 40%, rgba(20,16,15,0.1) 75%, rgba(20,16,15,0) 100%)`) and a subtle top/bottom gradient. A three.js particle wave (subtle, brand-rose colored `#8C4450`, low opacity ~0.5) sits above the video as an ambient effect. Eyebrow text, H1 (68px, Bricolage Grotesque 600, tracking -2px), supporting paragraph, two CTAs (filled pill + underlined text link). A stat bar pinned to the bottom of the hero shows 4 animated counters (18 anos, 15.000+ pacientes, 6 salas, "BIODEX 4 PRO") that count up via IntersectionObserver + requestAnimationFrame when scrolled into view.

3. **Sobre** (`#sobre`) — 5/6 column grid: left = heading + 2 paragraphs + text link; right = image placeholder (4:3, striped placeholder pattern) with an overlapping quote card (brand-rose background, white text) offset bottom-left.

4. **Serviços** (`#servicos`) — dark section (`background:#120E0D`). Asymmetric 12-column bento grid of 5 service cards (spans of 7/5/5/7/12 columns), each a full-card link to WhatsApp with an eyebrow label, heading, description, and "Saiba mais →". Last card (span 12) is the brand-rose "Biomecânica Funcional" feature card with an image placeholder.

5. **Estrutura** (`#estrutura`) — 5/7 grid, left column sticky, right = 4-image asymmetric grid of striped placeholders (clinic photos to be dropped in).

6. **Patologias** (`#patologias`) — dark alt section. Heading + live category filter pills (Todas / Articular / Joelho / Pé-Tornozelo / Quadril-Pelve) that filter a 3-column grid of 18 pathology cards (name, category tag, 3 symptom bullets, WhatsApp CTA with a pre-filled message naming that condition). Below the grid, a dark CTA bar ("Não encontrou sua condição?").

7. **Depoimentos** (`#depoimentos`) — **PLACEHOLDER SECTION.** The current live site loads testimonials via JavaScript; they could not be extracted. A visible placeholder note says so. 3 placeholder testimonial cards (1 large brand-rose "featured" + 2 smaller) with bracketed `[...]` text — replace with real Google Reviews content before launch.

8. **Blog** (`#blog`) — 3 real blog post cards pulled from the live site (title, image URL, link). "Ver todos os artigos" link to `/blog`.

9. **Footer / final CTA** — dark, split into a CTA (heading + WhatsApp button) and contact info (endereço, horário, telefone), plus a bottom bar with logo image and copyright line.

## Interactions & Behavior
- **Scroll reveal**: every element with `[data-reveal]` starts at `opacity:0; transform:translateY(26px)` and animates to visible (`opacity 1`, `translateY(0)`, 0.7s `cubic-bezier(0.16,1,0.3,1)`) via `IntersectionObserver` at 12% threshold, once per element.
- **Animated counters**: `[data-count]` spans count from 0 to their target number over 1.5s (`ease-out cubic`) when scrolled into view (40% threshold), formatted with `toLocaleString('pt-BR')`.
- **Nav scroll state**: background/blur/shadow toggle at `window.scrollY > 12`.
- **Pathology filter**: clicking a category pill sets local state and re-filters the grid client-side (no page reload).
- **Card hovers**: bento/pathology/blog cards lift on hover (`translateY(-4px)`) with an added shadow; CTA buttons lift slightly with a colored glow shadow.
- **Hero 3D**: three.js `Points` field (110×46 grid) animates a gentle sine-wave ripple continuously; re-sizes on window resize; cleaned up on unmount.
- **WhatsApp links**: every CTA/link deep-links to `https://api.whatsapp.com/send/?phone=<number>&text=<url-encoded message>&type=phone_number&app_absent=0` with a message pre-filled per context (general inquiry, pathology-specific, "talk to a physio").

## State Management
- `filter` (string): active pathology category, defaults to `'Todas'`.
- No server state / data fetching — all content is static in the template. A real implementation should likely pull services/pathologies/blog posts from the CMS rather than hardcoding.

## Design Tokens

**Colors**
- Background (base, near-black warm): `#14100F`
- Background (alt panel/dark section): `#120E0D`
- Card/chip surface: `#1F1917`
- Bento card surface: `#221A19` / border `#3a2c2b`
- Placeholder stripe: `#241C1B` / `#2b2220`
- Text (primary, light): `#F2E9E8`
- Text (secondary, muted light): `#B9ACA9`
- Text (tertiary/monospace labels): `#9c8f8c`
- Brand accent (deep rose, from logo): `#8C4450`
- Brand accent (lighter rose): `#B5525F`
- Warm highlight (biomecânica card eyebrow): `#e8b394`
- On-accent text: `#F7F5F0` (used only as text/icon color on colored/dark surfaces)

**Typography**
- Display/headings: "Bricolage Grotesque", 500–700 weight, tight tracking (-0.3px to -2px depending on size)
- Body: "Instrument Sans", 400–600 weight
- Scale: H1 68px / H2 42–46px / H3 22–30px / body 15–19px / eyebrow 13–15px

**Spacing / Radius**
- Section padding: 100–120px vertical, 56px horizontal
- Card radius: 6–8px; pill buttons: 999px (fully rounded)
- Grid gaps: 16–24px typical, 20px for bento

**Shadows**
- Card hover: `0 14–36px 30–36px rgba(0,0,0,0.35–0.45)`
- CTA hover glow: colored shadow matching the button's background at ~30–40% opacity

## Assets
- `assets/logo-reab.png` — clinic's real logo (white mark on black, PNG, provided by client)
- `assets/hero-video.mp4` — real looping clinic footage for the hero background (provided by client)
- Blog images are hotlinked from the live WordPress site (`fisioterapiareab.com.br/wp-content/uploads/...`) — should be migrated to the new host's own asset storage
- All other imagery (team/reception photo, clinic interior photos, BIODEX exam photo) is a **striped placeholder** with a monospace label describing what real photo belongs there — these must be replaced with real photography before launch
- Testimonials are placeholder text — replace with real Google Reviews content

## Files
- `Clinica Reab.dc.html` — the full design (markup + styles + interaction logic), single file
- `support.js` — preview-only runtime, not for production use
- `assets/` — logo and hero video referenced above
