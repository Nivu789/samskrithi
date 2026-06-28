# Samskrithi — Community Website

A professional multi-page website for the **Samskrithi** community, built with **Next.js 14 (App Router)** and **Tailwind CSS**.

---

## 🎨 Design

- **Color palette:** Deep brown + creamy ivory + gold accents
- **Typography:** Playfair Display (headings) + DM Sans (body)
- **Style:** Refined, editorial, warm heritage feel

---

## 📁 Pages

| Route         | Description                              |
|---------------|------------------------------------------|
| `/`           | Home — hero, stats bar, activity & event previews |
| `/about`      | About — mission, vision, core values     |
| `/activities` | Activities — Badminton, Karate, Dance, Music |
| `/gallery`    | Gallery — filterable image grid          |
| `/events`     | Events — upcoming events with dates      |
| `/contact`    | Contact — info panel + validated form    |

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for production

```bash
npm run build
npm start
```

---

## 🖼️ Adding Real Gallery Images

In `app/gallery/page.jsx`, replace the gradient `style={{ background: bg }}` on each gallery item with a `next/image` component:

```jsx
import Image from 'next/image';

// Inside the map:
<div key={id} className="relative aspect-[4/3] overflow-hidden group cursor-pointer">
  <Image src="/gallery/your-photo.jpg" alt={label} fill className="object-cover" />
  ...
</div>
```

Place images in `/public/gallery/`.

---

## ✏️ Customisation Checklist

- [ ] Replace placeholder phone/email/address in `components/Footer.jsx` and `app/contact/page.jsx`
- [ ] Update stats numbers on the home page (`app/page.jsx`)
- [ ] Add real event dates and details in `app/events/page.jsx`
- [ ] Add real gallery photos (see above)
- [ ] Connect the contact form to a backend or service like Formspree / EmailJS

---

## 🛠️ Tech Stack

- [Next.js 14](https://nextjs.org/) — App Router
- [Tailwind CSS 3](https://tailwindcss.com/)
- [next/font](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) — Google Fonts (Playfair Display + DM Sans)
