# Information Architecture — foodypick

**Project:** foodypick
**Date:** 2026-03-03
**Version:** 1.0 (prototype scope)

---

## 1. Screen Inventory

### MVP Screens (prototype build)

| # | Route | Screen Name | Description | Priority |
|---|-------|-------------|-------------|----------|
| 1 | `/` | Splash / Welcome | App logo, tagline, Get Started + Sign In CTAs | MVP |
| 2 | `/onboarding` | Location + Sign-in | Postcode entry (guest) or social sign-in; location permission | MVP |
| 3 | `/home` | Discovery | Restaurant list, search bar, cuisine chips, "Order Again" section | MVP |
| 4 | `/restaurant/:id` | Restaurant Detail | Header info, sticky category nav, full menu by category | MVP |
| 5 | `/item/:restaurantId/:itemId` | Item Detail | Photo, description, allergen badges, modifiers, qty selector | MVP |
| 6 | `/cart` | Cart Review | Item list with qty edit, fee breakdown, promo code, checkout CTA | MVP |
| 7 | `/checkout` | Checkout | Address confirm, delivery note, payment method, tip, place order | MVP |
| 8 | `/confirmation` | Order Confirmed | Order number, ETA, animated checkmark, track CTA | MVP |
| 9 | `/tracking` | Order Tracking | Status timeline (4 stages), live ETA countdown, contact rider | MVP |
| 10 | `/profile` | Profile | Name, saved addresses, order history, account settings | Secondary |

### Post-MVP Screens (not in prototype)
- `/search` — Full-screen search with filters
- `/orders` — Full order history (expanded from Profile)
- `/settings` — Notifications, payment methods, allergen preferences
- `/help` — FAQ + issue reporting
- `/restaurant/:id/reviews` — Review listing

---

## 2. Information Architecture Hierarchy

```
foodypick
│
├── Guest / Unauthenticated
│   ├── Splash (/)
│   ├── Onboarding (/onboarding)
│   └── Home, Restaurant, Item, Cart accessible as guest
│       └── Sign-in prompt appears at Checkout (/checkout)
│
├── Discovery Layer
│   ├── Home (/home)
│   │   ├── Search bar → /home?q=query
│   │   ├── Cuisine category chips (filter)
│   │   ├── "Order Again" section (authenticated users)
│   │   └── Restaurant cards → /restaurant/:id
│   │
│   └── Restaurant (/restaurant/:id)
│       ├── Header: image, name, rating, ETA, fee, min order, hours
│       ├── Sticky category navigation (tabs)
│       └── Menu item cards → /item/:restaurantId/:itemId
│
├── Order Flow (linear funnel)
│   ├── Item Detail (/item/:restaurantId/:itemId)
│   │   ├── Modifier selection
│   │   ├── Quantity selector
│   │   └── Add to Cart → Cart FAB update
│   │
│   ├── Cart (/cart)
│   │   ├── Item list (edit qty / remove)
│   │   ├── Fee breakdown (subtotal + delivery + service + total)
│   │   ├── Promo code input
│   │   └── → /checkout
│   │
│   ├── Checkout (/checkout)
│   │   ├── Delivery address confirm
│   │   ├── Delivery note (optional)
│   │   ├── Sign-in prompt (skippable)
│   │   ├── Payment method selection
│   │   ├── Tip selector (optional)
│   │   └── → /confirmation
│   │
│   ├── Confirmation (/confirmation)
│   │   ├── Order number
│   │   ├── ETA range
│   │   ├── Animated checkmark
│   │   └── → /tracking
│   │
│   └── Tracking (/tracking)
│       ├── Status timeline (Confirmed → Preparing → On the way → Arriving)
│       ├── Live ETA countdown
│       └── Contact rider (tel link)
│
└── Account Layer (authenticated)
    └── Profile (/profile)
        ├── Display name + avatar initial
        ├── Saved addresses
        └── Order history (reorder shortcut)
```

---

## 3. Navigation Model

### Bottom Tab Bar
Persistent on all screens except Splash and Onboarding.

| Tab | Icon | Route | Badge |
|-----|------|-------|-------|
| Home | Home icon | `/home` | — |
| Search | Search icon | `/home` (focuses search bar) | — |
| Orders | Receipt icon | `/tracking` or `/profile` (history) | Active order count |
| Profile | Person icon | `/profile` | — |

**Active state:** Brand orange underline + filled icon variant for active tab.
**Guest state:** All tabs visible; tapping Profile prompts sign-in.

### Back Navigation
All inner screens (Restaurant, Item, Cart, Checkout, Confirmation, Tracking) show a back arrow in the top-left. Tapping returns to the previous screen in the stack.

**Special cases:**
- Confirmation → Back navigates to Home (not Checkout — prevents accidental re-order)
- Tracking → Back navigates to Confirmation or Home depending on entry point

### Cart FAB (Floating Action Button)
- Visible on: Restaurant detail, Item detail
- Shows: item count badge + "View Cart" label when ≥1 item
- Hidden on: Home, Cart, Checkout and later screens
- Tapping: navigates to `/cart`

### Deep Link Structure
```
foodypick://restaurant/thai-garden
foodypick://item/thai-garden/pad-thai-classic
foodypick://tracking/ORDER-7291
```
(Post-MVP: push notification deep links to tracking screen)

---

## 4. User Flows

### Flow 1: Guest First Order (Primary Happy Path)
```
Splash → Onboarding (postcode) → Home →
Restaurant → Item Detail → [Cart FAB] →
Cart → Checkout (sign-in skip) →
Confirmation → Tracking
```

### Flow 2: Returning User Reorder
```
Home (Order Again section) → Cart (pre-populated) →
Checkout (address + payment saved) →
Confirmation → Tracking
```

### Flow 3: Search-Led Discovery
```
Home → Search bar → Query results →
Restaurant → Item Detail → Cart → ...
```

### Flow 4: Dietary Filter Discovery
```
Home → Cuisine chip "Vegan" →
Filtered restaurant list → Restaurant →
Menu (VE-tagged items prominent) → ...
```

---

## 5. Key UX Decisions

### Decision 1: No Forced Sign-Up
**Rationale:** All four major competitors require account creation before browsing. This is the #1 drop-off point in food delivery onboarding (see Journey Map Stage 2).
**Implementation:** Onboarding asks only for postcode. Sign-in prompt appears at Checkout — benefit-led copy ("Sign in to save your order history") not coercive.
**Trade-off:** Guest users cannot access order history or saved addresses on return visit. Accepted for prototype.

### Decision 2: Fee Transparency on Restaurant Cards
**Rationale:** Hidden fees are the #1 cause of checkout abandonment (see Competitive Analysis, Personas). Marcus and Priya both cite "sticker shock" as a reason to abandon.
**Implementation:** Each restaurant card shows: delivery fee (e.g. "£1.50 delivery") and estimated service fee percentage (e.g. "~6% service fee"). Cart shows full itemised breakdown.
**Trade-off:** Service fee is an estimate (varies by basket size). Clearly labelled as "~" to set expectations.

### Decision 3: Dietary Badges on Every Menu Item
**Rationale:** Priya (vegetarian) and Sandra (family nut allergy) both expressed frustration at having to read descriptions to determine dietary suitability. Just Eat's allergen filter (best-in-class) is the reference.
**Implementation:** Colour-coded chips on item cards: V (green, vegetarian), VE (dark green, vegan), GF (blue, gluten-free), N (amber, contains nuts), SP (red, spicy).
**Trade-off:** Relies on restaurant data accuracy. Prototype uses mock data that is accurate.

### Decision 4: Reorder Shortcuts as First-Class Feature
**Rationale:** "Get it again" on Uber Eats is one of its highest-engagement features. Marcus reorders from trusted restaurants 70%+ of the time.
**Implementation:** "Order Again" section as the first content section on the Home screen for authenticated users with ≥1 past order. Shows last 2 orders with restaurant image and "Reorder" CTA.
**Trade-off:** Section hidden for guests and first-time users to avoid empty state.

### Decision 5: Honest ETA Ranges
**Rationale:** Journey Map Stage 8 shows the highest anxiety during the wait phase. Single ETA promises are almost always wrong and erode trust.
**Implementation:** All ETAs shown as ranges: "25–35 min" on restaurant cards, "Arriving 7:42–7:52 PM" on confirmation/tracking.
**Trade-off:** Ranges feel less precise than competitors' single numbers. Accepted — trust > false precision.

---

## 6. Content Model

### Restaurant Object
```
{
  id: string,
  name: string,
  cuisine: string,          // "Thai", "Italian", etc.
  rating: number,           // 1–5, one decimal
  reviewCount: number,
  deliveryFee: number,      // £ value
  serviceFeePct: number,    // percentage (e.g. 6)
  minOrder: number,         // £ value
  etaMin: number,           // minutes (lower bound)
  etaMax: number,           // minutes (upper bound)
  tags: string[],           // cuisine tags for filtering
  isNew: boolean,
  image: string,            // URL or placeholder path
  categories: Category[]
}
```

### Menu Item Object
```
{
  id: string,
  name: string,
  description: string,
  price: number,
  image: string,
  dietaryTags: string[],    // ["V", "GF"] etc.
  popular: boolean,
  modifiers: Modifier[],    // optional
  available: boolean
}
```

### Cart Item Object
```
{
  item: MenuItem,
  quantity: number,
  selectedModifiers: Modifier[],
  restaurantId: string
}
```

---

## 7. Prototype Scope Boundaries

| In Scope | Out of Scope |
|----------|-------------|
| All 10 screens listed above | Payment processing (mock only) |
| Full happy path flow | Real-time rider location |
| Cart state (React Context) | Push notifications |
| Mock dietary/allergen data | Restaurant search API |
| Fee breakdown display | User reviews/ratings submission |
| ETA range display | Order cancellation flow |
| Profile screen (static) | Address autocomplete API |
| "Order Again" section | Multi-restaurant ordering |
