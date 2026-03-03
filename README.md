# foodypick

A functional UI prototype for a food delivery app, built as a UX research artefact for discussion with product and engineering teams. Covers the full order journey from splash screen to live order tracking across 10 screens.

**Live demo:** https://lianadalia.github.io/foodypick/

---

## Overview

foodypick simulates a Helsinki-based food delivery experience. It is not a production app — it exists to test and communicate UX decisions with real, clickable interactions rather than static mockups. All data is mocked; no backend or real payments are involved.

The project was built in parallel with a UX research phase that produced competitive analysis, user personas, customer journey maps, and an information architecture — all of which directly shaped the prototype's structure and decisions.

---

## Key Features

### 10-Screen User Journey
The prototype covers the complete happy path a first-time user would take:

| Screen | Route | Description |
|---|---|---|
| Splash | `/` | Animated entry with brand identity |
| Onboarding | `/onboarding` | Postcode entry, guest browsing, optional sign-in |
| Home | `/home` | Restaurant discovery with cuisine filters and search |
| Restaurant | `/restaurant/:id` | Full menu with sticky category navigation |
| Item Detail | `/item/:restaurantId/:itemId` | Item customisation with modifiers and dietary info |
| Cart | `/cart` | Order review with full fee breakdown |
| Checkout | `/checkout` | Address, tip selector, and mock payment |
| Confirmation | `/confirmation` | Animated order confirmed screen with ETA |
| Tracking | `/tracking` | Live countdown timer and 4-stage status timeline |
| Profile | `/profile` | Saved addresses and order history |

### Restaurant Catalogue
8 restaurants across 8 cuisines (Thai, Italian, American, Japanese, Healthy, Indian, Mexican, Chinese), each with:
- Full menu divided into categories (starters, mains, sides, desserts)
- Per-item dietary badges: **V** Vegetarian · **VE** Vegan · **GF** Gluten-free · **N** Contains nuts · **SP** Spicy
- Item modifiers (e.g. protein choice, size, extras) with price adjustments
- Ratings, review counts, delivery fee, service fee percentage, and ETA range

### Fee Transparency
Delivery fee and service fee percentage are shown on every restaurant card — before the user opens the restaurant. The cart and checkout screens show a full itemised breakdown (subtotal, delivery fee, service fee, tip, total) with no surprises at payment.

### Dietary Filtering
Colour-coded dietary badges are visible on every menu item card and on the item detail screen. The badge system covers the most common dietary requirements relevant to the Helsinki market.

### Cart and State Management
Cart state persists across all route changes using React Context. Items can be added with custom modifiers, quantities can be adjusted, and items can be removed. The floating cart button shows live item count and subtotal.

### Order Tracking Simulation
The tracking screen runs a real countdown timer using `setInterval`, advancing through four order stages (confirmed → preparing → collected → arriving) proportionally as time elapses. No backend required.

### Guest and Signed-in Modes
Users can browse and add to cart without signing in. The profile screen shows a guest state with a sign-in prompt; signing in reveals saved addresses and order history populated from mock past orders.

---

## UX Research

The `/research` folder contains the documents produced before and during the prototype build:

| File | Contents |
|---|---|
| `personas.md` | 6 Helsinki-based user personas with full empathy maps (says / thinks / feels / does / pains / gains), covering ages 24–67 across city centre and suburbs |
| `competitive-analysis.md` | Feature and UX analysis of Wolt, Foodora, Uber Eats, and Deliveroo |
| `journey-map.md` | 9-stage first-order customer journey with emotion arc |
| `information-architecture.md` | Screen inventory, IA hierarchy, and navigation model |
| `interview-questionnaire.md` | 5-question semi-structured interview guide with probes and interviewer notes |

---

## Tech Stack

| | |
|---|---|
| **Framework** | React 19 + Vite 7 |
| **Styling** | Tailwind CSS v4 (`@tailwindcss/vite`) |
| **Routing** | React Router DOM v7 |
| **Icons** | Lucide React |
| **State** | React Context API (`CartContext`, `UserContext`) |
| **Deployment** | GitHub Pages via GitHub Actions |

---

## Running Locally

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173`. No environment variables or external services required.

---

## Key UX Decisions

These decisions were made explicitly based on the research phase:

- **No forced sign-up** — users browse and order as guests; sign-in is only prompted at the profile screen
- **Fee transparency on cards** — delivery fee visible before opening any restaurant, addressing the single most cited pain point in competitive reviews
- **Dietary badges on every item** — not hidden behind an allergen accordion, always visible on the card
- **Accurate ETA over fast ETA** — tracking screen shows a countdown to manage expectations rather than just an optimistic estimate
- **Reorder shortcuts** — order history on the profile screen enables one-tap reordering for returning users
