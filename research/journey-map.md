# Customer Journey Map — foodypick First Order

**Project:** foodypick
**Date:** 2026-03-03
**Persona:** Marcus (primary), applicable to all three personas
**Scenario:** First-ever foodypick order on a weekday evening

---

## Overview

This map traces the 9 stages of a first-time user's journey from initial awareness through post-delivery. It identifies emotional peaks and valleys, key decision points, pain points inherited from competitor apps, and opportunities for foodypick to intervene positively.

---

## Stage 1 — Awareness

**Trigger:** Marcus sees a colleague mention foodypick in Slack. Later notices a sponsored social post while scrolling. Checks App Store reviews.

### User Actions
- Views social ad / reads colleague recommendation
- Checks App Store rating and reads 3–5 reviews
- Compares star rating against existing apps (Uber Eats: 4.7, Deliveroo: 4.5)
- Decides to download

### Thoughts
> "Let me see if this is actually better or just more marketing. The reviews say it doesn't hide fees — I'll try it."

### Emotion Score: 3/5 — Mildly curious, slight scepticism

### Pain Points
- High competition for attention in the App Store
- Negative review scarring from bad experiences on other apps
- Fear of another "same as the rest" experience

### Opportunities
- **App Store listing:** Screenshot showing fee transparency upfront (before download)
- **Review response strategy:** Visible, empathetic responses to 1-star reviews builds trust
- **Social proof:** Real user quotes (not branded) in ad creative

---

## Stage 2 — Download & Onboarding

**Trigger:** App downloaded. Opens for the first time.

### User Actions
- Taps "Get Started"
- Sees option to browse as guest OR sign in
- **Chooses "Browse as Guest"** — enters only postcode
- Immediately sees restaurant list

### Thoughts
> "Oh. I can just browse? No email? No verify your phone number? Let me look around."

### Emotion Score: 4/5 — Pleasantly surprised, low friction

### Pain Points (addressed by foodypick design)
- On competitor apps: forced sign-up before any browsing (major drop-off point)
- Location permission prompt timing: if asked too early, users deny

### Opportunities
- **Show location permission prompt AFTER user taps a restaurant** (contextual, higher grant rate)
- **Onboarding microcopy:** "Browse restaurants near [postcode]. Sign in to save your order history." — not a hard sell
- **Progress indicator:** Simple "step 1 of 1" if postcode is the only ask

### Design Note
This is the most critical stage for reducing drop-off. The competitor average onboarding requires 4–6 taps and an email before browsing. foodypick targets 2 taps (Get Started → Enter postcode) before content is visible.

---

## Stage 3 — Browse & Discover

**Trigger:** Home screen loads with restaurant list.

### User Actions
- Scans restaurant cards (image, name, rating, ETA, fee)
- Uses cuisine category chips to filter (taps "Asian")
- Notices fee shown on every card — no surprises anticipated
- Searches for "sushi"
- Opens "Order Again" section (returning users only) — not applicable on first visit

### Thoughts
> "Thai Garden: £1.50 delivery, 25 min ETA, 4.6 stars. That's actually reasonable. The fee is right there on the card — I'm not being tricked."

### Emotion Score: 4/5 — Engaged, exploratory

### Pain Points
- Image quality varies (merchant-uploaded vs. professional)
- No browse history to rely on for first-timers
- "New to you" labelling helps discovery but can feel hollow

### Opportunities
- **Fee on card:** Delivery fee + "~X% service fee" on restaurant card removes checkout surprise
- **"New" badge:** For recently joined restaurants — creates discovery incentive
- **Cuisine chips:** Horizontal scroll with clear tap targets (min 44px height) — accessibility win
- **Loading skeleton:** Restaurant cards skeleton-load rather than spinner, reducing perceived wait

---

## Stage 4 — Restaurant Selection

**Trigger:** Marcus taps "Thai Garden" to open the restaurant detail page.

### User Actions
- Views header: restaurant image, name, rating breakdown, operating hours, min order, fee
- Reads short restaurant description
- Scrolls sticky category navigation (Starters, Mains, Sides, Drinks)
- Taps a category to jump to that section

### Thoughts
> "£12 minimum order, £1.50 delivery fee, 4.6 from 847 reviews. These numbers feel trustworthy — there's enough reviews to mean something."

### Emotion Score: 4/5 — Confident, building intent

### Pain Points
- If minimum order isn't shown until cart, frustration spike
- If operating hours aren't clear and user builds a cart for a closed restaurant, major frustration

### Opportunities
- **Operating status chip:** "Open · closes 11 PM" prominently displayed
- **Minimum order badge:** Shown in restaurant header, not hidden
- **Sticky category nav:** Anchored tabs for menu categories reduce scroll fatigue
- **Review count shown:** "4.6 ★ (847)" — volume signals reliability

---

## Stage 5 — Menu Exploration

**Trigger:** Browsing menu items within Thai Garden.

### User Actions
- Scans menu items with photos, names, prices
- Notes dietary badges on items (V = vegetarian, VE = vegan, N = contains nuts)
- Taps item to see detail: description, modifiers (rice choice, spice level), allergen info
- Selects "Pad Thai" → chooses "Medium spice" → increases quantity to 2
- Taps "Add to Cart" — cart FAB updates count

### Thoughts
> "The nut badge is on the item — good. I can see the full allergen list without digging. Let me add this and that side."

### Emotion Score: 4.5/5 — Confident, enjoying the experience

### Pain Points
- Items without photos create uncertainty (especially for unfamiliar cuisines)
- Modifier UI can be confusing if too many nested options
- "Sold out" items that appear in the list before the user taps them

### Opportunities
- **Dietary badges as chips** (V/VE/GF/N) on every item card — scannable without opening item
- **Modifier step indicators:** "1 of 2 choices" shows progress through customisation
- **Sold out visual treatment:** Greyed-out with "unavailable" badge, not removed (shows depth of menu)
- **Popular flag:** Star/crown icon on bestseller items helps decision paralysis

---

## Stage 6 — Cart Review

**Trigger:** Marcus taps the floating cart button.

### User Actions
- Reviews cart items (2x Pad Thai, 1x Spring Rolls)
- Adjusts Spring Rolls quantity from 1 to 2 using +/− controls
- Reads fee breakdown: subtotal £24, delivery £1.50, service fee £1.44 (6%), total £26.94
- Enters promo code (invalid — code expired) — sees clear error message
- Taps "Proceed to Checkout"

### Thoughts
> "OK, £26.94. I knew the delivery and service fee were coming — I saw the rough numbers on the restaurant card. Not surprised. Good."

### Emotion Score: 3.5/5 — Slight friction (promo code fail) but no sticker shock

### Pain Points
- **Promo code frustration:** Expired codes sourced from deal sites are a common failure point. Clear error + "valid codes" link softens this.
- **Min order check:** If subtotal is below minimum, early warning (not just at checkout) prevents wasted effort.
- **Service fee explanation:** Some users don't understand what "service fee" is. Tooltip helps.

### Opportunities
- **Fee breakdown with explanations:** "Delivery fee" + "Service fee (supports the platform)" with expandable info
- **Savings line:** If promo applied, show savings in green prominently
- **Edit from cart:** Modify items without losing cart
- **"Almost there" nudge:** If £2 from free delivery threshold, show it

---

## Stage 7 — Checkout

**Trigger:** Checkout screen opens. Marcus is still a guest.

### User Actions
- Sees delivery address (auto-populated from location) — confirms it's correct
- Adds delivery note: "Leave at door, buzz flat 12"
- Prompted to sign in or create account (not forced — "Continue as Guest" visible)
- Selects "Continue as Guest"
- Selects Apple Pay → authenticates with Face ID → order submitted

### Thoughts
> "They're asking me to sign up but I can skip it. I'll do it after the order. Face ID took 1 second. Done."

### Emotion Score: 4/5 — Fast, clear, no nasty surprises

### Pain Points
- Sign-in prompt could feel aggressive if copy is wrong — must be gentle
- Address confirmation must be obvious — wrong delivery address is catastrophic
- Guest users lose order tracking linkage unless they create account

### Opportunities
- **"Save to track easier"** CTA on sign-in prompt — benefit-led, not scary
- **Apple Pay / Google Pay as primary** — prominent, not buried under card form
- **Tip selector:** Optional, visible, not pre-selected (no dark patterns)
- **Address map preview:** Small static map showing delivery pin reduces anxiety

---

## Stage 8 — Waiting

**Trigger:** Order confirmed. Confirmation screen shown. Marcus navigates away to continue working.

### User Actions
- Sees confirmation screen: order number, restaurant name, estimated delivery 7:42–7:52 PM
- Taps "Track Order" to see status timeline
- Receives push notification "Thai Garden has started preparing your order"
- Checks tracking screen twice during 30-minute wait

### Thoughts
> "It says 25–35 minutes. That's honest. I'll check back in 20 minutes. The push notification was useful — it wasn't just spam."

### Emotion Score: 3/5 — Moderate anxiety. Anticipation + small uncertainty

### Pain Points
- Uncertainty during wait is the #1 cause of support contact ("where is my order?")
- If ETA changes with no notification, anxiety spikes
- Over-notification (5 updates for every step) feels excessive

### Opportunities
- **Stage-by-stage timeline:** Confirmed → Preparing → Ready for pickup → On the way → Arriving
- **Honest ETA range:** "Arriving 7:42–7:52 PM" rather than single "7:45 PM"
- **ETA change notification:** Proactive "running 5 minutes late" push before user notices
- **Live countdown:** "~8 minutes away" updating in real-time on tracking screen

---

## Stage 9 — Delivery & Post-Order

**Trigger:** Rider arrives. Food delivered to door.

### User Actions
- Receives "Your order has arrived!" push notification
- Collects food from door
- Opens app: sees "Rate your order" prompt
- Gives 5 stars, adds comment "Pad Thai was excellent"
- Notices "Save your order history — create a free account" CTA at bottom of thank you screen
- **Signs up** with email to save order history

### Thoughts
> "That was easy. No hidden fee shock at the end. Tracker was accurate. I'll sign up so I can reorder easily next time."

### Emotion Score: 4.5/5 — Satisfied, converted to registered user

### Pain Points
- If food is wrong/missing, this stage becomes highest frustration. Easy refund/reorder flow is essential.
- Rating prompt timing: immediately after delivery is the right moment (not 1 hour later when user has moved on)

### Opportunities
- **Contextual sign-up prompt:** After positive experience, conversion rate is highest — "Save for faster reorder"
- **One-tap reorder:** "Order this again?" on thank you screen
- **Easy issue reporting:** "Something wrong?" one-tap flow before they contact support
- **Post-order discovery:** "Others who ordered this also tried..." with restaurant recommendations

---

## Emotion Arc Summary

```
Stage:  1       2       3       4       5       6       7       8       9
        Aware   Onbrd   Browse  Selct   Menu    Cart    Chkout  Wait    Post

Score:  3.0     4.0     4.0     4.0     4.5     3.5     4.0     3.0     4.5

         ★★★★★ |                              |★★★★★|         |             |★★★★★
         ★★★★  |         ★ ★ ★ ★ ★ ★         |      |★★★★     |             |
         ★★★   |★                              |      |         |             |
         ★★    |                               |      |         |★★★          |
         ★     |                               |      |         |             |
         ──────────────────────────────────────────────────────────────────────
         1      2       3       4       5       6       7       8       9

  Dip at Stage 2 (onboarding) → Addressed by guest browsing
  Dip at Stage 6 (cart) → Addressed by upfront fee transparency
  Dip at Stage 8 (waiting) → Addressed by honest ETA + proactive updates
```

### Key Insight
The three emotion dips (Stages 2, 6, 8) correspond exactly to the three biggest competitor pain points identified in the competitive analysis. foodypick's design decisions directly target these dips:

1. **Stage 2 fix:** Guest browsing — no forced sign-up
2. **Stage 6 fix:** Fee shown on restaurant cards — no checkout sticker shock
3. **Stage 8 fix:** Honest ETA range + proactive delay notifications
