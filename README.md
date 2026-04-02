<div align="center">

# 🦷 DentalCare

### Premium Dental Clinic Website

[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

A high-performance, agency-grade dental clinic website built with **Next.js 15**, featuring premium aesthetics, buttery-smooth animations, and a conversion-optimized design system.

[Live Preview](#quick-share) · [Getting Started](#getting-started) · [Tech Stack](#tech-stack) · [Project Structure](#project-structure)

</div>

---

## ✨ Highlights

| Feature | Description |
|---|---|
| 🎨 **Premium Design System** | Navy/Teal/Emerald clinical palette with glassmorphism, gradient overlays, and editorial typography |
| ⚡ **Blazing Fast** | Server Components, dynamic imports with skeleton loading, optimized images & fonts |
| 📱 **Fully Responsive** | Pixel-perfect layouts from 320px mobile to ultra-wide desktop |
| 🎬 **Micro-Animations** | Scroll-reveal effects, CTA jiggle, infinite testimonial scroll, smooth page transitions |
| 🔍 **SEO Optimized** | Dynamic sitemap, robots.txt, semantic HTML, structured metadata on every page |
| 📞 **Conversion Focused** | Floating WhatsApp CTA, emergency call button, strategic booking prompts |
| 🧩 **Config-Driven** | Swap clinic branding, images, and content from a single config file — zero code changes |

---

## 🚀 Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 15 (App Router, Server Components) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 (CSS-first config) |
| **Animations** | CSS keyframes + Lenis smooth scroll |
| **Icons** | Lucide React |
| **Email** | Resend API |
| **Analytics** | Vercel Speed Insights |
| **Fonts** | Google Fonts (Inter, Outfit) |
| **Linting** | ESLint with Next.js plugin |

---

## 🛠️ Getting Started

### Prerequisites

- **Node.js** 18.x or later
- **npm** 9+ (or yarn / pnpm)

### Installation
1. Clone the repository
```bash
git clone https://github.com/Zayrix-bit/dental-nextjs.git
```

2. Navigate to the project
```bash
cd dental-nextjs
```

3. Install dependencies
```bash
npm install
```

4. Set up environment variables
```bash
cp .env.example .env.local
```
*(Edit .env.local with your API keys)*

5. Start the development server
```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** to view the site.

### Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create an optimized production build |
| `npm run start` | Run the production server |
| `npm run lint` | Run ESLint checks |
| `npm run share` | Dev server + Cloudflare Tunnel (public link) |
| `npm run preview-share` | Production build + Cloudflare Tunnel |

---

## 🔗 Quick Share

Generate a public Cloudflare link to share your local site instantly:

```bash
npm run share
```

This spins up the dev server and a [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps/) simultaneously, giving you a shareable `*.trycloudflare.com` URL.

> **Tip:** For a production-quality preview, use `npm run preview-share` instead.

---

## 📁 Project Structure

```
dental-nextjs/
├── public/                         # Static assets (images, icons, fonts)
│
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── about/                  # About Us page
│   │   ├── api/                    # Backend API routes (contact form)
│   │   ├── blog/                   # Blog listing & article pages
│   │   ├── contact/                # Contact page
│   │   ├── gallery/                # Smile transformation gallery
│   │   ├── services/               # Service listing & dynamic [slug] pages
│   │   ├── testimonials/           # Patient reviews page
│   │   ├── globals.css             # Design tokens, animations & utilities
│   │   ├── layout.jsx              # Root layout (Header, Footer, providers)
│   │   ├── page.jsx                # Homepage
│   │   ├── robots.js               # SEO crawler config
│   │   └── sitemap.js              # Dynamic sitemap generation
│   │
│   ├── components/
│   │   ├── layout/                 # Structural components
│   │   │   ├── Header.jsx          # Glassmorphism nav + mobile menu
│   │   │   └── Footer.jsx          # Multi-column footer
│   │   ├── sections/               # Page-level sections
│   │   │   ├── Hero.jsx            # Full-bleed hero with CTA jiggle
│   │   │   ├── Services.jsx        # Animated service cards grid
│   │   │   ├── WhyChooseUs.jsx     # Trust signals & value props
│   │   │   ├── BeforeAfter.jsx     # Interactive transformation slider
│   │   │   ├── Testimonials.jsx    # Infinite-scroll patient reviews
│   │   │   ├── FAQ.jsx             # Accordion FAQ section
│   │   │   ├── Contact.jsx         # Contact form with Resend
│   │   │   ├── ExtendedContact.jsx # Full-page contact layout
│   │   │   └── LocationMap.jsx     # Static map with premium overlay
│   │   └── ui/                     # Atomic UI components
│   │       ├── AnimatedCounter.jsx # Number count-up animation
│   │       ├── FloatingCallCTA.jsx # Emergency call floating button
│   │       ├── PageHeader.jsx      # Reusable subpage header
│   │       ├── SectionSkeletons.jsx# Loading skeletons per section
│   │       ├── Skeleton.jsx        # Base skeleton primitives
│   │       ├── SmoothScrollProvider.jsx # Lenis scroll wrapper
│   │       └── WhatsAppButton.jsx  # Floating WhatsApp with giggle
│   │
│   ├── config/                     # Centralized site configuration
│   │   ├── clinics/                # Clinic-specific branding configs
│   │   ├── index.js                # Main config export
│   │   └── iconMap.js              # Dynamic icon resolver
│   │
│   └── data/                       # Content & data sources
│       ├── siteData.js             # Services, stats, navigation
│       └── blogData.js             # Blog articles & metadata
│
├── .env.example                    # Environment variable template
├── eslint.config.mjs               # ESLint configuration
├── jsconfig.json                   # Path aliases and JS settings
├── package.json
├── next.config.mjs
└── postcss.config.mjs
```

---

## 🎨 Design Philosophy

- **Clinical Elegance** — Navy (`#0A3A5C`) and Teal (`#00B4DB`) palette conveys trust and professionalism
- **Performance First** — Dynamic imports with shimmer skeletons ensure instant perceived load
- **Conversion Driven** — Every scroll position has a strategically placed CTA
- **Zero Clutter** — Hidden scrollbars, subtle noise textures, and radial glows for a premium feel
- **Accessibility** — `prefers-reduced-motion` support, semantic HTML, proper heading hierarchy

---

## 🤝 Configuration

DentalCare is **config-driven**. To rebrand for a different clinic:

1. Create a new config file in `src/config/clinics/`
2. Update clinic name, phone, address, images, and colors
3. Point `src/config/index.js` to your new config

No component code changes required.

---

## 📄 License

This project is **private** and proprietary. All rights reserved.

---

<div align="center">

Built with precision for **Dental Excellence** 🦷

</div>
