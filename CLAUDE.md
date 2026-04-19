# CLAUDE.md — PB&J Agency Landing Page

## Project Overview

Build a single-page landing page for **PB&J**, a white-glove talent agency that represents surgeons. The site will be hosted on **GitHub Pages** via the Astro static output adapter.

This page is NOT a funnel. It's a filter. It should feel like walking into an exclusive private club — premium, confident, understated. The right people will know they belong. Everyone else will know this isn't for them.

---

## Technical Stack

- **Framework:** Astro (static output — `output: 'static'`)
- **Hosting:** GitHub Pages (deploy from `/dist` via GitHub Actions)
- **Styling:** SCSS (scoped per component where needed, global tokens in `src/styles/tokens.scss`)
- **Animations:** GSAP + ScrollTrigger (installed via npm)
- **Smooth scroll:** Lenis (installed via npm, integrated with GSAP ScrollTrigger)
- **Carousel:** Swiper.js (installed via npm, used for any horizontal scroll sections)
- **Fonts:** Google Fonts (Cormorant Garamond + Montserrat) or self-hosted
- **Icons:** Inline SVG — no icon font libraries
- **Mobile responsive** — must look great on iPhone and desktop
- **Browser support:** Modern browsers only (Chrome, Safari, Firefox, Edge)

---

## Design Reference

This site is inspired by **smithandsaint.com** — a boutique talent agency for athletes and creators. We are adapting their design system and interaction patterns for a medical/surgical audience.

### Animation Patterns (from Smith & Saint research)

- **Logo:** slides in from left (`translateX(-30px) → 0`, fade in) on page load via GSAP
- **Nav:** full-screen overlay slides in from right (`translateX(100vw) → 0`) on MENU click via GSAP
- **Entrance animations:** content blocks fade up (`opacity 0 → 1`, `y: 8 → 0`) on scroll via GSAP ScrollTrigger
- **Hero pin:** hero section uses GSAP ScrollTrigger `pin: true` so content scrolls over it
- **Smooth scroll:** Lenis wired into GSAP's ticker (`gsap.ticker.add`) and ScrollTrigger (`ScrollTrigger.normalizeScroll`)

### Nav Overlay (full-screen)

- `position: fixed`, `inset: 0`, `z-index: 150`, background: `var(--burgundy-deep)`
- Slides in from right: `gsap.to('.nav', { x: 0, duration: 0.6, ease: 'power3.inOut' })`
- Three zones: top bar (logo + close), main nav links (44px serif, `line-height: 0.9`), footer row (email · social · legal)
- Menu trigger: text "MENU" + single `18px × 1px` line (not a 3-bar hamburger)

### Text Scale (SCSS utility classes)

```scss
.text-display  { font-size: 44px; letter-spacing: -0.88px; line-height: 0.9; text-transform: uppercase; }
.text-sub      { font-size: 24px; letter-spacing: -0.72px; line-height: 1.1; }
.text-label    { font-size: 15px; letter-spacing: 0.3px;  text-transform: uppercase; }
.text-caption  { font-size: 14px; letter-spacing: 0.56px; text-transform: uppercase; }
.text-small    { font-size: 12px; }
```

### Layout Utilities

```scss
.wrap { padding: 0 24px; }  // standard side gutters
```

### Key Design Principles (steal from Smith&Saint)

1. **Minimal navigation** — Use a hamburger menu only. No visible nav bar. The content speaks for itself.
2. **Logo-as-hero** — The hero section should be the PB&J logo on a full-viewport dark/premium background. No headline in the hero. Let the brand breathe.
3. **Bold manifesto statement** — One section with a large, serif, bold tagline that captures PB&J's positioning. This is the centerpiece of the page. Think: "Intentionally small. Unshakably strong." but for surgeons.
4. **Generous whitespace** — Let every section breathe. No cramming. Cream/off-white backgrounds between sections.
5. **Elegant serif typography** — Use a premium serif for headlines/statements and a clean sans-serif for body text.
6. **Outlined CTA buttons** — Simple bordered buttons, no filled/gradient buttons. Text like "Learn More" not "GET STARTED NOW."
7. **Color shift for footer** — The footer section should shift to a darker/richer background color to create visual weight at the bottom.

### What NOT to Do

- No stock photos of doctors with stethoscopes and crossed arms
- No "hero image with headline overlay" pattern — that's every healthcare site
- No blue-and-white clinical look — this is luxury, not a hospital website
- No animations that slow down load time
- No pricing section, no "how it works" steps, no FAQ accordion
- No chatbot widget, no popup, no cookie banner
- No testimonial carousels with headshots and star ratings

---

## Page Structure (4 sections + footer)

### Section 1: Hero
- Full viewport height (100vh)
- Dark, premium background color (from brand palette)
- PB&J logo centered, large, white
- Small text in top-left corner showing location/time (e.g., "NEW YORK, NY" or city of choice) — subtle, like Smith&Saint
- Hamburger menu icon top-right labeled "MENU"
- No headline, no CTA, no subtext. Just the logo.

### Section 2: About / Who We Are
- Background: off-white / cream
- Small uppercase label: "WHO WE ARE" (left-aligned)
- 1-2 sentences describing PB&J — what you do, who you serve
- "Learn More" outlined button
- Optional: one high-quality image placed to the right, offset style (like Smith&Saint's talent sections)

### Section 3: Manifesto / Positioning Statement
- Background: off-white / cream (same as above, or slightly different shade)
- Large serif text, centered or left-aligned
- This is where the big bold tagline goes — the PB&J equivalent of "Intentionally Small. Unshakably Strong."
- Below the tagline: 1-2 sentences of supporting body text explaining the philosophy
- **COPY PLACEHOLDER:** The user will provide final copy. For now, use placeholder text that captures the tone: exclusive, selective, legacy-focused. Example placeholder: "WHERE EXPERTISE MEETS OPPORTUNITY." / "We represent the world's most exceptional surgeons — connecting mastery with the partnerships that deserve it."

### Section 4: Contact / Get In Touch
- Background: off-white / cream
- Small uppercase label: "CONNECT"
- Simple contact section — NOT a form. Just:
  - Email address (linked, clickable)
  - A single line: "For surgeon representation or partnership inquiries"
  - Optional: city/location
- Keep it minimal. The scarcity is the pitch.

### Footer
- Background shifts to a rich, dark color from the brand palette (think Smith&Saint's burgundy shift)
- PB&J logo (large wordmark or monogram, like S&S's giant "SMITH&SAINT" text at the bottom)
- Social links: Instagram, LinkedIn (icons, not text)
- Email address
- Small copyright line
- Optional: newsletter email signup (single input + "Subscribe" button)

---

## Hamburger Menu (slide-out overlay)

When clicked, the menu should overlay the full screen with a dark/semi-transparent background.

**Menu items:**
- About
- For Surgeons
- For Partners
- Contact

**Contact info in menu:**
- Email address
- Location
- Social links (Instagram, LinkedIn)

**Close button:** "X" or "CLOSE" in top-right

---

## Brand Assets

### Logo
- The user will add logo files to the `/assets` or `/images` folder
- Support both a monogram/icon version (for hero) and a full wordmark (for footer)
- If only one logo file is provided, use it in both places
- Logo files may be SVG or PNG — check the file extension and use accordingly

### Colors
- The user will upload a brand guide or color palette file
- Look for it in the root directory or `/assets` folder (could be a PNG, PDF, or text file with hex codes)
- **Fallback palette** (use if no brand colors are found):
  - Primary dark: `#1a1a2e` (deep navy/midnight)
  - Accent: `#c9a96e` (warm gold)
  - Background: `#faf9f6` (warm cream, same as Smith&Saint)
  - Text: `#191919` (near-black)
  - Footer bg: `#1a1a2e` (same as primary dark)
  - Footer text: `#ffffff`

### Typography
- **Headlines / Manifesto:** Use `Playfair Display` or `Cormorant Garamond` from Google Fonts (elegant serif)
- **Body text / Labels:** Use `Inter` or `DM Sans` from Google Fonts (clean sans-serif)
- **Headline sizing:** Large — 48-72px for the manifesto statement on desktop, scale down for mobile
- **Body sizing:** 16-18px
- **Section labels:** 11-13px, uppercase, letter-spacing: 2-3px

---

## File Structure

```
/
├── src/
│   ├── pages/
│   │   └── index.astro         # Main landing page
│   ├── components/
│   │   ├── Header.astro        # Fixed transparent header
│   │   ├── NavOverlay.astro    # Full-screen slide-in nav
│   │   ├── Hero.astro          # Pinned hero section
│   │   ├── About.astro         # Who We Are section
│   │   ├── Manifesto.astro     # Big serif quote section
│   │   ├── Partners.astro      # For Partners section
│   │   ├── Connect.astro       # Contact section
│   │   └── Footer.astro        # Dark footer
│   ├── styles/
│   │   ├── tokens.scss         # Brand tokens (colors, type scale, spacing)
│   │   ├── global.scss         # Reset, base styles, utility classes
│   │   └── animations.scss     # GSAP animation setup helpers
│   └── scripts/
│       └── main.js             # GSAP + Lenis init, ScrollTrigger wiring
├── public/
│   ├── assets/
│   │   ├── PBJ-white.svg       # Logo — white version (hero, footer, nav)
│   │   └── PBJ-nobkrd.svg      # Logo — no background (light sections)
│   └── favicon.ico
├── astro.config.mjs            # output: 'static'
├── package.json
├── CLAUDE.md                   # This file
└── README.md
```

---

## Responsive Behavior

- **Desktop (1200px+):** Full layout as described above
- **Tablet (768-1199px):** Stack content vertically where needed, reduce font sizes ~20%
- **Mobile (< 768px):** 
  - Hero logo scales down but stays centered
  - Manifesto text drops to ~32-36px
  - All sections stack vertically with generous padding
  - Hamburger menu becomes the only navigation
  - Footer stacks vertically

---

## Contact Forms

Three separate forms, all living inside the nav overlay (same pattern as Smith & Saint). Each form slides in as a panel when the corresponding CTA link is clicked.

### Form 1 — For Surgeons (Apply to Roster)
Fields: Full name, Email, Specialty, Current institution, LinkedIn URL, Brief bio / why PB&J

### Form 2 — For Partners (Work With Our Talent)
Fields: Full name, Email, Organization / brand name, Nature of inquiry (dropdown: Speaking · Brand partnership · Advisory · Media · Other), Message

### Form 3 — Join Our Team
Fields: Full name, Email, Role of interest, Resume/CV upload, Brief message

### Form Backend
- **Service:** [Netlify Forms](https://docs.netlify.com/forms/setup/) OR [Formspree](https://formspree.io/) — both work with static Astro sites
- Add `netlify` attribute to `<form>` tags if deploying to Netlify, or Formspree `action` URL if staying on GitHub Pages
- No server required — form submissions go to email or dashboard

---

## GitHub Pages Deployment Notes

- Astro builds to `/dist` — configure GitHub Pages to serve from that directory
- Use GitHub Actions with `withastro/action` for automatic deploys on push to `main`
- `astro.config.mjs` must set `site` and `base` if using a non-root GitHub Pages URL

---

## Quality Checklist

Before considering this done:

- [ ] Page loads in under 2 seconds on a normal connection
- [ ] Looks premium on both mobile and desktop — screenshot both
- [ ] No visible placeholder text (lorem ipsum, "your headline here", etc.)
- [ ] Logo renders correctly on both dark and light backgrounds
- [ ] All links work (email mailto:, social links)
- [ ] Hamburger menu opens and closes smoothly
- [ ] Color palette feels cohesive and luxurious — not clinical, not corporate
- [ ] Text is readable — sufficient contrast ratios
- [ ] The page passes the "would a surgeon respect this?" test
