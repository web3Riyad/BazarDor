# বাজার দর / BazarDor

A **Bangla market price tracker** built with Next.js that shows daily price changes of essential goods across Bangladesh. The app is fully responsive, supports authentication (email, Google, GitHub) and provides a detailed view of market prices for each product.

---

## ✨ Short Description

BazarDor aggregates data from the Programming Hero API and displays it in a clean, Bengali‑styled UI. Users can browse all products, see the top price risers/fallers, filter by category, and view detailed market‑wise pricing for any product. All pages are protected where required, and the UI works on mobile, tablet, and desktop.

---

## 🛠️ Technologies Used

- **Next.js 16 (App Router)** – Server‑side rendering and routing
- **React 19** – UI components
- **Tailwind CSS v4** + **DaisyUI** – Utility‑first styling & component library
- **Better‑Auth** – Email/password + Google + GitHub authentication
- **TypeScript / JavaScript** – Type‑safe codebase (JS files)
- **react‑marquee‑text** – Continuous price ticker
- **Vercel** – Deployment platform (or any static host)

---

## 🚀 Key Features (5+)

1. **Hero / Banner**
   - Bengali date, main heading, subtitle, primary CTA that scrolls to the product list.
2. **Price Ticker (Marquee)**
   - Infinite scrolling strip showing emoji, product name, today’s price, and change badge.
3. **Home Sections**
   - **Top 6 Risers** (price ↑) and **Top 6 Fallers** (price ↓) with responsive grids.
   - **All Products** grid – 3‑4 columns on large screens, collapses on mobile.
4. **Product Detail Page (`/product/[slug]`)**
   - Protected route (login required).
   - Summary card with emoji, name, unit, price diff.
   - Price summary (min / max / average) and market‑wise table.
5. **Category Pages**
   - Dynamic category navigation, sort control (default / price low‑high / high‑low), loading skeletons, and empty‑state handling.
6. **Authentication**
   - Sign‑in / Sign‑up with email & password, Google & GitHub social logins, toast notifications, and profile update form.
7. **Responsive Design**
   - Mobile‑first layout, `max-w-6xl` containers, responsive grids, stacked hero on small screens, and adaptive buttons (`btn-sm sm:btn-md`).
8. **Footer**
   - Consistent with the Figma design, displaying a brief tagline on the left and an explanatory note on the right.

---

## 📦 How to Run Locally

```bash
# Install dependencies
pnpm install   # (or npm/yarn)

# Create .env file (add your Better‑Auth credentials)
cp .env.example .env

BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URL=

# Social Providers (Google & GitHub)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=



# Run the development server
npm run dev   # http://localhost:3000
```

---

## 📂 Repository Structure (high‑level)

```
src/
  app/            # Next.js app router pages (home, product, categories, auth)
  component/      # Reusable UI components (Hero, Navbar, Footer, ProductCard…)
  context/        # ToastProvider & utility helpers
  lib/            # Better‑Auth configuration and client wrapper
public/            # Static assets (hero image, icons)
```

---

## 🌐 Live Demo & Source Code

- **Live URL:** https://github.com/web3Riyad/BazarDor
- **GitHub Repository:** https://bazardor-ecru-five.vercel.app/

---

_Feel free to explore, customize, and extend the project. Happy coding!_
