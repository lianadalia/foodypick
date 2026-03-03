# Competitive Analysis — Food Delivery Apps

**Project:** foodypick
**Date:** 2026-03-03
**Analyst:** UX Research Team

---

## Overview

This analysis examines four leading food delivery platforms: Uber Eats, Deliveroo, DoorDash, and Just Eat. The goal is to identify UX patterns worth adopting, anti-patterns to avoid, and whitespace opportunities for foodypick to differentiate.

---

## 1. Uber Eats

### Strengths
- **Discovery engine:** Personalised restaurant recommendations based on past orders, time of day, and location. The "Cravings" section adapts to context.
- **Uber One integration:** Bundle subscription with Uber Rides creates high lock-in and perceived value.
- **Real-time tracking:** Live map with rider position is polished and reduces anxiety.
- **Group orders:** Allows multiple people to add to a shared cart — rare and valuable for offices/flatmates.
- **Search quality:** Handles natural language queries ("something spicy and cheap near me") better than competitors.
- **Scheduled orders:** Pre-ordering up to 72 hours ahead is seamless.

### Pain Points
- **Fee opacity:** Final fee shown only at checkout. Delivery fee + service fee + small order fee can increase bill by 30%+.
- **Aggressive upsell:** Mid-order pop-ups for Uber One subscription interrupt the flow.
- **Support friction:** Resolving missing/wrong items requires navigating a chatbot that often fails, leading to frustration.
- **Slow cold starts:** First-launch onboarding requires email + phone verification before any browsing.
- **Subscription creep:** Users report accidental Uber One sign-ups during checkout.

### Notable Features
- "Get it again" reorder shortcut on home screen
- Live Activity integration on iOS (order status in Dynamic Island)
- Merchant priority tiers visible on cards (promoted vs. organic)

---

## 2. Deliveroo

### Strengths
- **Premium brand positioning:** Clean, white-space-heavy design conveys quality. Attracts higher-spend users.
- **Editions (dark kitchens):** Own-brand virtual restaurants fill cuisine gaps without needing new merchant partners.
- **Restaurant photography quality:** Strict photo guidelines make the app visually consistent and appetising.
- **Deliveroo Plus:** Flat monthly fee for free delivery — simpler value proposition than Uber One.
- **Menu accuracy:** Actively prompts restaurants to update menus (fewer "item unavailable" surprises).
- **Rider welfare visibility:** ESG-conscious users respond positively to "Deliveroo rider" branding.

### Pain Points
- **Geographic coverage gaps:** Outside major UK/EU cities, restaurant density drops sharply.
- **Filter UX:** Dietary filters (vegan, gluten-free) are buried under "Filters" rather than surfaced as category chips.
- **Item images:** ~40% of items lack photos, creating a text-heavy menu experience on smaller restaurants.
- **Checkout complexity:** 4-step checkout (cart → address → payment → confirm) feels one step too many on mobile.
- **No guest checkout:** Requires full account creation before any order.

### Notable Features
- "Tell us what you want" mood-based discovery prompts
- Allergy information deep-linked to restaurant detail
- Estimated preparation time shown separately from delivery time

---

## 3. DoorDash

### Strengths
- **DashPass economics:** Industry-leading subscription penetration (~10M+ subscribers). Free delivery creates strong habit formation.
- **National chain coverage:** Strongest US coverage for chains (McDonald's, Chick-fil-A, etc.).
- **DashMart:** Grocery and convenience delivery within same app reduces app-switching.
- **Proactive ETA updates:** Pushes notifications when order is running late before users notice.
- **Pickup option:** Well-integrated order-ahead pickup reduces delivery fee friction.
- **Dasher earnings transparency:** Building trust with couriers improves reliability.

### Pain Points
- **UI complexity:** Feature-dense home screen (restaurant, grocery, alcohol, DashMart) creates cognitive overload for new users.
- **Search result relevance:** Sponsored listings sometimes dominate search for generic terms.
- **Cart lock-in:** Adding an item from a second restaurant forces cart clear with no merge option.
- **Photo inconsistency:** User-generated photos mixed with professional ones in same menu creates jarring quality jumps.
- **Notification spam:** DashPass users report excessive promotional push notifications.

### Notable Features
- Order tracking with multiple driver location views (map / timeline / minimal)
- "Continue Shopping" toast when navigating away from a restaurant mid-browse
- Restaurant "busy" indicator showing live wait time

---

## 4. Just Eat (Takeaway.com)

### Strengths
- **Restaurant breadth:** Largest restaurant catalogue in UK/EU markets — includes many local independents not on Deliveroo/Uber Eats.
- **Order history depth:** Accessible 12+ month order history with easy reorder and receipt download.
- **Price transparency:** Delivery fee shown upfront on restaurant cards before entering menu.
- **Hybrid model:** Some restaurants use own drivers; others use Just Eat couriers. Both shown to user.
- **Group ordering:** Multi-person order feature via shareable link.

### Pain Points
- **Dated UI:** Visual design lags 3–4 years behind Uber Eats/Deliveroo. Typography and spacing feel cramped on modern high-DPI screens.
- **Inconsistent restaurant experience:** Because restaurants control their own menu data, quality varies wildly.
- **Tracking reliability:** Own-driver restaurants often don't provide real-time tracking — only "estimated" ETAs.
- **Search indexing:** Searching for a specific dish name often fails to surface relevant restaurants.
- **Mobile app performance:** Android app in particular has above-average crash rates per Play Store reviews.

### Notable Features
- "Voucher vault" consolidates all active promo codes
- Calorie information shown on menu items (UK regulatory requirement adopted across all markets)
- Allergen filter that hides items containing selected allergens

---

## Synthesis Table

| Dimension | Uber Eats | Deliveroo | DoorDash | Just Eat |
|-----------|-----------|-----------|----------|----------|
| Discovery UX | ★★★★★ | ★★★★☆ | ★★★★☆ | ★★★☆☆ |
| Fee transparency | ★★☆☆☆ | ★★★☆☆ | ★★★☆☆ | ★★★★☆ |
| Onboarding friction | High | High | Medium | Medium |
| Dietary info | ★★★☆☆ | ★★★★☆ | ★★★☆☆ | ★★★★★ |
| Visual quality | ★★★★★ | ★★★★★ | ★★★☆☆ | ★★☆☆☆ |
| Tracking experience | ★★★★★ | ★★★★☆ | ★★★★★ | ★★★☆☆ |
| Reorder UX | ★★★★☆ | ★★★☆☆ | ★★★★☆ | ★★★★☆ |
| Guest browsing | No | No | No | No |

---

## Key Opportunities for foodypick

1. **Guest-first browsing** — All four competitors require account creation before ordering. foodypick can differentiate by allowing full browse + cart build as a guest, only requiring sign-in at checkout. This directly reduces the #1 drop-off point in food delivery apps.

2. **Upfront fee transparency** — Uber Eats and DoorDash hide final fees until checkout. foodypick shows delivery fee + estimated service fee on restaurant cards and a full breakdown before checkout. This directly addresses the "sticker shock" moment that drives cart abandonment.

3. **Dietary-first filtering** — Surface allergen/dietary chips (V, VE, GF, N) as prominent category filters on the home screen, not buried in a settings panel. Deliveroo and Just Eat do this best but still don't make it the default.

4. **Streamlined checkout** — Reduce to 2 steps: (1) cart review + fee breakdown, (2) address + payment + place order. DoorDash's 4-step flow is too fragmented for mobile.

5. **Honest ETAs** — Show "estimated 25–35 min" ranges rather than a single number that's invariably wrong. Build trust through honesty rather than optimism.

6. **Reorder shortcuts as a first-class feature** — "Order Again" section on home for returning users, not buried in profile/history.
