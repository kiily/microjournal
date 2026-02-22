# Nook — Product Specification v2

> *Your habits build a home.*

---

## Part 1: Who This Is For

### The Person

**Maya, 27, UX designer in London.** She's tried Habitica (too gamery), Daylio (too clinical), and a bullet journal (abandoned after 3 weeks). She wants to feel like she's making progress on becoming a better version of herself, but every habit tracker either makes her feel guilty when she misses a day or bores her into uninstalling. She opens Instagram at 10 PM when she should be winding down. She'd love something that feels like a cozy ritual, not a chore list.

Maya represents our primary audience: **adults 22-35 who want gentle self-improvement without productivity-bro energy.** They value aesthetics. They play cozy games (Animal Crossing, Stardew Valley, Unpacking). They want to feel good about small wins. They've been burned by streak-obsessed apps that turned self-care into anxiety.

### The One-Sentence Pitch

**Nook is the app where your daily check-in builds a cozy room — one habit at a time.**

### Why Someone Chooses Nook Over Daylio + Focus Friend

Daylio tracks your mood. Focus Friend gamifies your timer. Neither turns your personal growth into something you can *see* and *feel* accumulating over time. Nook does. Your room IS your progress. You don't read a chart to know you've been consistent — you see a lived-in space with a guitar by the window because you've been practicing, a bookshelf filling up because you've been reading, sunlight pouring in because you logged a good day. Nobody else builds emotional resonance this way.

---

## Part 2: Design Identity

### Three Words

**Warm. Unhurried. Tactile.**

Not playful (too childish). Not minimal (too cold). Not gamified (too manipulative). Nook feels like coming home to a space that's yours — soft textures, warm light, things in the places you left them. Every interaction should feel like touching something real: the satisfying tap of checking off a habit, the gentle weight of sliding through days, the quiet glow when something new appears in your room.

### Art Direction: Scandinavian Warmth Meets Studio Ghibli

The room is **not** pixel art. **Not** Animal Crossing's cartoonish proportions. **Not** hyper-realistic.

Think: **Unpacking's tactile object design** meets **a Ghibli background painting** — warm wood floors, soft afternoon light, objects with character and texture. Low-poly enough to run at 60fps, detailed enough that each item feels handcrafted. The avatar is a small, rounded character — like a simplified Totoro-proportioned figure. No face details beyond eyes and a mouth curve. Expressive through body language, not facial features.

**Reference touchpoints:**
- Unpacking (object tactility, warm palette, snap-to-place satisfaction)
- A Short Hike (lo-fi aesthetic with genuine warmth)
- Neko Atsume (collecting things in a cozy space, passive delight)
- Kinfolk magazine photography (natural materials, soft light, intentional simplicity)

### Color Palette

**Not** a traffic light. **Not** a dark-mode-with-neon-accents app.

```
Background:       #FAF6F1  (warm linen)
Surface:          #FFFFFF  (clean white, cards)
Surface Elevated: #F5EDE4  (warm sand, bottom sheet)
Text Primary:     #2C2420  (warm charcoal, NOT pure black)
Text Secondary:   #8B7D72  (warm grey)
Text Tertiary:    #B8ADA4  (muted, hints)

Accent:           #D4845A  (terracotta — primary action color)
Accent Soft:      #F2DDD0  (terracotta tint, backgrounds)

Mood Palette (NOT red-to-green):
  Struggling:     #7B8FA1  (slate blue — calm, not alarming)
  Low:            #A1A1C4  (lavender grey)
  Neutral:        #C4B89C  (warm sand)
  Good:           #9DB88C  (sage green)
  Thriving:       #D4A76A  (warm amber)

Category Colors:
  Body:           #9DB88C  (sage)
  Mind:           #7B8FA1  (slate)
  Connect:        #C4889B  (dusty rose)
  Move:           #D4A76A  (amber)
  Create:         #A1A1C4  (lavender)
  Rest:           #8FB8A8  (seafoam)

Dark mode: Invert to warm darks (#1C1917 base), NOT pure black.
The room itself provides darkness context — evening lighting, lamp glow.
```

### Typography

- **Headings:** A geometric sans with soft terminals. Not Inter (overused). Consider **Satoshi**, **General Sans**, or **Plus Jakarta Sans** — all free, all warm without being cutesy.
- **Body:** The same family at regular weight, or a slightly more readable alternative like **Instrument Sans**.
- **Monospace (stats/data):** **JetBrains Mono** or **IBM Plex Mono** for any numerical displays.
- No more than 2 fonts total. Hierarchy through weight and size, not font swapping.

### Voice & Microcopy

The app speaks like a calm, supportive friend — not a coach, not a therapist, not a corporate wellness program.

**Voice principles:**
- First person plural ("we" when talking about the app), second person ("you") for the user
- Short sentences. No exclamation marks except genuine celebration
- Never guilt. Never "you missed." Always frame positively.
- Acknowledges difficulty without toxic positivity.

**Examples:**

| Context | Bad (generic) | Good (Nook) |
|---------|--------------|-------------|
| Empty day | "No entries yet!" | "A new day. Take your time." |
| All habits done | "Great job! 100% complete!" | "Everything done. Your room feels a little cozier tonight." |
| Missed 3 days | "You broke your streak!" | "Welcome back. Pick up wherever you feel ready." |
| First mood log | "Select your mood" | "How's your day feeling?" |
| Evening reminder | "Don't forget to log!" | "Your room is waiting." |
| Struggling mood | "Sorry to hear that." | "Noted. Some days are just like that." |
| New item unlocked | "Achievement unlocked!" | "Something new appeared in your room." |
| Habit completed | "Streak: 7 days!" | *(no text — just the satisfying animation and the room changing)* |

---

## Part 3: The Room IS the App

### Core Interaction Model

**There are no tabs.** There is one screen: your room.

The room is the home screen, the dashboard, the reward, and the interface. Everything lives inside or around it. This is the fundamental architectural decision that separates Nook from every other habit tracker.

```
┌─────────────────────────────────┐
│  ☁ Morning, Maya          ⚙ ⏱  │  ← Greeting bar (time-aware) + settings/focus
│                                  │
│                                  │
│         ┌──────────────┐         │
│         │              │         │
│         │   3D ROOM    │         │  ← 60% of screen: your room, your avatar
│         │   (avatar    │         │     Touch to orbit, pinch to zoom
│         │    + items)  │         │     Room lighting = mood
│         │              │         │
│         └──────────────┘         │
│                                  │
│  ─ ─ ─ ─ ─ swipe up ─ ─ ─ ─ ─  │  ← Drag handle
│                                  │
│  ┌───────────────────────────┐   │
│  │ How's today feeling?      │   │  ← Bottom sheet (default: peeking)
│  │ 😶 😐 😊 😄 🌟           │   │     Pull up to reveal mood + habits
│  │                           │   │
│  │ ☐ Morning stretch    🌿   │   │
│  │ ☑ Read a chapter     📘   │   │
│  │ ☐ Call someone       💌   │   │
│  │                    + Add   │   │
│  │                           │   │
│  │ 📝 Add a note...         │   │
│  └───────────────────────────┘   │
└─────────────────────────────────┘
```

**Navigation lives in the room:**

| What | Where |
|------|-------|
| Daily check-in (mood + habits + note) | Bottom sheet — swipe up over the room |
| History & reflection | Swipe LEFT on the room → slides to a journal/calendar view |
| Room close-up / item inspection | Tap any item in the room → info card appears |
| Focus mode | Tap the clock/timer icon in the top bar → enters focus view |
| Settings / profile | Tap the gear icon → slides in from right |
| Habit management | Long-press a habit in the bottom sheet, or tap "Manage" at the bottom |

**Why this works:**
- The room is always visible, always rewarding. You never navigate *away* from your progress.
- The bottom sheet pattern is native to iOS/Android — users already know how to pull up, dismiss, snap.
- Swipe-left for history is the Daylio gesture — import existing muscle memory.
- No tab bar means no wasted vertical space, more room for the room.

### Time-of-Day Awareness

The room and the UI shift based on when you open the app:

| Time | Room Lighting | Greeting | Prompt |
|------|--------------|----------|--------|
| 5-11 AM | Soft morning light, golden hour through window | "Morning, [name]" | "What's on your plate today?" |
| 11 AM-5 PM | Bright daylight, shadows short | "Afternoon, [name]" | "How's the day going?" |
| 5-9 PM | Warm sunset tones, longer shadows | "Evening, [name]" | "How was today?" |
| 9 PM-5 AM | Lamp light, night sky through window, stars | "Hey, [name]" | "Before you wind down..." |

The room's ambient lighting is not cosmetic — it makes the experience feel alive, like the space exists in real time.

---

## Part 4: Mood — Beyond the Traffic Light

### The Circumplex-Lite System

Full Russell Circumplex (valence + arousal as two axes) is academically sound but too complex for a micro-journaling app. Users don't want to plot coordinates.

Instead, Nook uses a **5-point feeling scale with optional texture tags:**

**Core scale (required, one tap):**

| Level | Label | Color | Avatar State | Room Effect |
|-------|-------|-------|-------------|-------------|
| 1 | Struggling | Slate blue #7B8FA1 | Sitting on floor, head down | Overcast light, muted colors, rain on window |
| 2 | Low | Lavender grey #A1A1C4 | Sitting in chair, slumped | Cloudy, cool tones, dimmer |
| 3 | Steady | Warm sand #C4B89C | Standing, neutral posture | Normal daylight (per time of day) |
| 4 | Good | Sage green #9DB88C | Upright, gentle smile | Warm light, slightly brighter |
| 5 | Thriving | Warm amber #D4A76A | Animated, arms slightly up | Golden light, window fully open, warm glow |

**Texture tags (optional, multi-select):**
After picking a level, the user can optionally tap 1-3 tags that add nuance:

```
Energetic  ·  Calm  ·  Anxious  ·  Grateful
Tired  ·  Creative  ·  Lonely  ·  Focused
Restless  ·  Hopeful  ·  Overwhelmed  ·  Content
```

Tags are displayed as small pills below the mood indicator. They're stored for analytics but don't affect the room — keeping the room system simple while still capturing emotional complexity. Users can also add custom tags after launch.

**Why this works:**
- One tap for the core action (micro = fast).
- Optional depth for users who want to express more.
- "Struggling" and "Low" are non-judgmental labels — not "Awful" or "Bad."
- Room lighting changes give *immediate* visual feedback. Your mood literally colors your space.
- Tags solve the "anxious but productive" problem without requiring a 2D picker.

### Journal Note

Below the mood and tags, a text field labeled "Add a note..." expands on tap. Supports multi-line. No character limit. Keyboard dismiss on swipe-down. The note is visible in journal history and search.

---

## Part 5: Habits — The Room Is the Limit

### Philosophy: No Streaks, No Numbers, No Guilt

Research shows 44% of users quit habit apps after breaking a streak. Nook doesn't display streak counters. Instead, consistency is communicated through the room: items grow, upgrade, and new ones appear. If you miss days, items don't shrink or disappear — they just stop growing. There's no punishment, no regression, no "you lost your 14-day streak." The room remembers your best self even on your worst days.

Internally, we track consecutive days for unlock thresholds, but the user never sees a number.

### Categories (renamed from v1)

V1 used productivity-flavored labels. V2 uses human-centered ones:

| Category | Icon Area | What It Means | Room Items (Tier 1 → 3) |
|----------|-----------|---------------|--------------------------|
| **Body** | Sage | Physical self-care: water, skincare, sleep | Small plant → window herb garden → indoor tree |
| **Mind** | Slate | Learning, reading, growth | Paperback on shelf → small bookshelf → full bookcase with lamp |
| **Connect** | Dusty rose | Relationships, social, communication | Postcard on wall → framed photos → cozy reading nook with pillows |
| **Move** | Amber | Exercise, walking, stretching | Yoga mat rolled up → mat + blocks laid out → full workout corner |
| **Create** | Lavender | Art, music, writing, making | Sketchbook on desk → easel + supplies → art corner with finished piece |
| **Rest** | Seafoam | Meditation, journaling, downtime | Single candle → candle + incense holder → zen corner with cushion + plant |

### Template Habits (First Launch)

V1's "Drink Water / Read 10 min / Take a Walk" were generic listicle habits. V2's defaults reflect Nook's personality:

1. **"Morning stretch"** — Category: Move, Icon: sunrise-stretch
2. **"Read a chapter"** — Category: Mind, Icon: open-book
3. **"Call or text someone"** — Category: Connect, Icon: phone-heart

These are chosen because:
- They span 3 different categories (so the room starts filling across areas).
- They're specific enough to be actionable but flexible.
- "Call or text someone" is unusual for a habit tracker — it signals this app cares about connection, not just productivity.

Users can delete any or all during onboarding. Maximum active habits: whatever the room can hold (see Room Capacity below).

### Habit Creation

Simplified from v1 (which had a 4-step flow):

1. **Name** (text input, placeholder: "What do you want to do?")
2. **Category** (6 colored circles with labels — tap to select)
3. **Icon** (auto-filtered to category, grid of ~12 options per category)

No color picker step — the color is inherited from the category. This reduces decision fatigue and keeps the room visually coherent (items in the same zone share a palette).

### Habit Check-in

In the bottom sheet, each habit appears as a row:

```
┌──────────────────────────────────────┐
│  ○  Morning stretch           🌿     │  ← Unchecked
│  ●  Read a chapter            📘     │  ← Checked (fill + subtle animation)
│  ○  Call or text someone      💌     │  ← Unchecked
│                          + Add habit  │
└──────────────────────────────────────┘
```

- Tap the circle to complete. Spring animation (react-native-reanimated). Haptic tap.
- On completion: the circle fills with the category color. The corresponding area of the room gets a subtle shimmer (visible behind the semi-transparent bottom sheet).
- Long-press a habit to enter edit/manage mode.
- No drag-to-reorder in daily view (too fiddly on mobile). Reorder available in "Manage habits" screen.

---

## Part 6: The Room In Detail

### Day-Zero Room

The critique's most important insight: **the room must never feel empty.**

On first launch, the room contains:
- Wooden floor, warm-toned walls, a window with curtains
- A simple bed against one wall (unmade, casual)
- A small side table with a lamp (turned on if it's evening)
- A rug on the floor
- The avatar sitting on the bed, looking at the user

This is a **lived-in starter room** — not aspirational, not empty. It feels like moving into a new apartment where the basics are there but it's *your* blank canvas.

### Immediate Feedback (No 3-Day Wait)

V1 required 3 days of a habit before anything appeared. V2:

| Action | Room Response | Timing |
|--------|-------------|--------|
| Log first mood | Room lighting shifts to match | Instant |
| Complete first habit ever | A tiny detail appears (e.g., a coffee mug on the side table, shoes by the door) | Instant |
| Complete all habits for a day | Avatar does a small celebratory animation (stretches, looks happy) | Instant |
| Complete a habit 3 days (not necessarily consecutive) | **Tier 1 item** appears in the habit's category zone | Next app open |
| Complete a habit 10 days total | Tier 1 → **Tier 2 upgrade** (item grows/improves) | Next app open |
| Complete a habit 30 days total | Tier 2 → **Tier 3 upgrade** (item reaches final form) | Next app open |
| Log mood for 7 days total | Window view upgrades (plain → with a tree outside) | Next app open |
| Log mood for 30 days total | Window view upgrades again (tree + birds + clouds) | Next app open |

**Key change from v1:** Thresholds are **total days**, not consecutive. Miss a day, no penalty. Your progress is always accumulating. This is the anti-streak philosophy in action.

### Ghost Items (Anticipation System)

In each category zone of the room, faint translucent outlines show where items *will* appear. When the user taps a ghost item, a tooltip says:

> "Complete [habit name] 3 more times to unlock this."

This solves the "what am I working toward" problem and makes the empty room aspirational rather than barren.

### Room Capacity & Long-Term Engagement

The critique asked: "What happens at 6 months when the room is full?"

**Room Tiers:**

| Tier | Unlocked After | Size | What Changes |
|------|---------------|------|-------------|
| Studio | Default | Small single room | Starter space, fits ~6 item zones |
| One-Bed | 60 days of total logging | Expands with a second area | New zone for focus trees, more item slots |
| Loft | 120 days | Opens up vertically — a loft/mezzanine | Entirely new upper area for items, avatar can climb |
| Penthouse | 365 days | Balcony/outdoor area added | Outdoor garden, skyline view, seasonal weather |

Room tier upgrades are **milestone rewards**, not purchasable. They give long-term users something to work toward after individual items are maxed.

**Seasonal details:** The window view changes with real-world seasons (spring blossoms, summer sun, autumn leaves, snow). This makes the room feel alive across months.

### Room Interaction

| Gesture | Action |
|---------|--------|
| Single finger drag | Orbit camera around room |
| Pinch | Zoom in/out |
| Tap item | Info card: which habit unlocked it, total days, tier level |
| Tap avatar | Avatar waves. If bottom sheet is collapsed, it peeks up as a prompt. |
| Tap ghost item | Tooltip showing what to do to unlock |
| Double-tap | Reset camera to default angle |

### Room Sound Design

Ambient audio plays quietly when the room is visible:

| Time | Sound |
|------|-------|
| Morning | Soft birdsong, distant traffic |
| Afternoon | Light ambient, wind |
| Evening | Cricket sounds, muffled music |
| Night | Quiet rain option, clock ticking, silence option |
| Mood 1-2 | Rain on window (override) |
| Mood 5 | Slightly more upbeat ambient |

Volume controlled in settings. Default: on at 30% volume. Can be turned off entirely.

---

## Part 7: Analytics & Reflection

### Swipe-Left: The Journal View

From the room, swipe left to reveal the reflection surface. It slides in over the room (the room blurs gently in the background).

**Layout:**

```
┌─────────────────────────────────┐
│  ← Back to Room     February    │
│                                  │
│  ┌─ Calendar ──────────────────┐ │
│  │ Mo Tu We Th Fr Sa Su       │ │
│  │  .  .  .  .  .  ●  ●      │ │  ← Dots colored by mood
│  │  ●  ●  ●  ○  ●  ●  ●      │ │     ○ = no entry
│  │  ●  ●  ●  ●  ●  .  .      │ │
│  └────────────────────────────┘ │
│                                  │
│  Today — Steady 🟤              │
│  "Had a good call with Mom.     │
│   Feeling grounded."            │
│  ☑ Morning stretch  ☑ Read     │
│                                  │
│  Yesterday — Good 🟢            │
│  ☑ Morning stretch  ☑ Call     │
│                                  │
│  Feb 19 — Low 🟣               │
│  "Couldn't focus at all today." │
│  ☑ Read                        │
│                                  │
│  ─── ─── ─── ─── ─── ─── ───   │
│                                  │
│  📊 Insights                    │
│  "You tend to feel Good on days │
│   you complete Morning stretch" │
│                                  │
│  🎨 Year in Pixels →           │
└─────────────────────────────────┘
```

**No separate Stats tab.** Insights are woven into the journal view:
- A small "Insights" card appears after 7+ days of data, showing one correlation at a time.
- "Year in Pixels" is a tappable link that opens a full-screen grid.
- Habit completion patterns show inline per-entry.

**Search & Filter:**
- Search icon in the header filters entries by text content.
- Tap a mood level in the calendar legend to filter entries by mood.

### Year in Pixels

Full-screen view. Each day is a small rounded square, colored by mood level (using the Nook mood palette, not traffic lights). Empty days are a faint dotted outline. Tapping a day scrolls to that entry in the journal list.

### Data Export

Not CSV/JSON buttons in settings. Instead:
- **Share Your Year:** Generates a beautiful image of Year in Pixels with your name and a Nook watermark. Shareable to Instagram stories, saved to camera roll.
- **Export Data:** Tucked in Settings > Privacy > Export my data. Exports as JSON. This is a compliance feature, not a user-facing feature.

---

## Part 8: Focus Mode

### Access

Tap the timer icon in the top-right of the room view. The room transitions smoothly: lights dim, avatar sits down at a desk (or meditation spot, depending on context), and the focus interface overlays.

### Timer

```
┌─────────────────────────────────┐
│                                  │
│         ┌──────────┐             │
│         │  25:00   │             │  ← Large, centered timer
│         │          │             │     Circular progress ring
│         └──────────┘             │     in terracotta accent
│                                  │
│     🌧 Rain    🌿 Forest         │  ← Ambient sound toggles
│     🎵 Lo-fi   🔇 Silence       │
│                                  │
│        ┌────────────┐            │
│        │  Begin     │            │  ← Single primary action
│        └────────────┘            │
│                                  │
│  Presets: 15  25  45  60  ···   │  ← Tap to change duration
│                                  │
│         Tap to cancel            │
└─────────────────────────────────┘
```

**During a session:**
- The room is visible but dimmed behind the timer.
- A small plant/tree begins growing at the avatar's desk in real-time.
- Progress ring fills as time passes.
- If the user leaves: soft prompt "Your plant won't grow if you leave. End session?" — not "your tree will DIE."
- Completing a session: the plant stays in the room permanently. Warm shimmer effect. Avatar looks at it.

**No withered stumps for failed sessions.** The plant simply doesn't appear. No visible punishment. This aligns with Nook's no-guilt philosophy.

### App Blocking

| Platform | Method | Notes |
|----------|--------|-------|
| iOS | Apple Screen Time API via `react-native-device-activity` | Requires Family Controls entitlement. User selects apps to block. Shield overlay during session. |
| Android | UsageStats API + overlay permission | Detects app switches, shows return-to-Nook overlay. DND mode for notification suppression. |

**App selection UI:** Grouped by category (Social, Entertainment, News, etc.) with toggle switches. Presets: "Social media only," "Everything except calls," "Custom."

**Fallback (if API approval delayed):** Focus timer works without blocking. The plant still grows. Blocking is an enhancement, not a requirement.

### Focus Rewards in the Room

Focus plants live on a windowsill or shelf area in the room.

| Duration | Plant |
|----------|-------|
| 15 min | Small succulent |
| 25 min | Potted herb |
| 45 min | Small flowering plant |
| 60+ min | Full potted plant with bloom |

The windowsill accumulates plants over time — a visual garden of your focus sessions. At room-tier upgrades, the plant area expands.

---

## Part 9: Onboarding — Teach by Doing

**No carousel.** No three-screen slideshow. The user learns by doing.

### Flow

**Step 1: The Room Appears**
App opens cold to the room — no splash screen, no welcome text. The avatar is sitting on the bed. After 2 seconds of ambient sound and the user looking around:

> A gentle text overlay fades in: "This is your room."
> (1 second pause)
> "Let's make it yours."

**Step 2: Name**
A small card slides up: "What should we call you?" — single text field, "Continue" button. First name only. This personalizes the greeting bar.

**Step 3: First Mood**
The bottom sheet peeks up slightly. Text above: "How's today feeling?"
The 5 mood options are visible. User taps one. Room lighting shifts. Avatar reacts.

> "Your room reflects how you feel."

**Step 4: First Habits**
The bottom sheet reveals the habit section with the 3 template habits pre-checked:

> "Here are some habits to start with. Keep what feels right."

User can uncheck any. They can also immediately tap "+ Add habit" to create their own. Minimum 1 habit required to continue.

**Step 5: First Completion**
> "Try completing one."

User taps a habit. Animation plays. A tiny object appears in the room (the instant-feedback coffee mug or shoes).

> "Every habit you complete adds to your room. Over time, it fills up."

Ghost item outlines fade in briefly, then fade back to subtle.

**Step 6: Done**
> "That's it. Come back whenever you're ready."

The overlay text fades out. The bottom sheet settles to its default peeking state. The user is in the app. No "tutorial complete" fanfare.

**Total time: ~45 seconds.** The user has already logged data. They already understand the core loop. They've seen the room react.

---

## Part 10: Notifications — Gentle, Not Guilty

### Daily Reminder

Default: 8 PM local time. Configurable in settings.

Message options (rotated):
- "Your room is waiting."
- "A minute for yourself?"
- "How was today?"

**Never:** "Don't forget to log!" / "You haven't opened the app today!" / "Your streak is at risk!"

### Return After Absence

If the user hasn't opened the app in 3+ days, the next notification:
- "Welcome back whenever you're ready. No rush."

If 7+ days:
- One final notification: "Nook is here when you need it. We'll stay quiet until then."
- Notifications pause automatically. Resume when the user opens the app.

This is deliberate anti-churn behavior. Pestering absent users makes them uninstall. Respecting their space makes them come back.

---

## Part 11: Monetization

### Business Model: Freemium with Cosmetic Premium

**Free tier (complete app):**
- Mood logging (unlimited)
- Habit tracking (up to 5 active habits)
- 3D room with base item set
- Avatar (base appearance)
- Focus timer (no blocking)
- Journal history + Year in Pixels
- All notifications & reminders

**Nook Plus ($3.99/month or $29.99/year):**
- Unlimited active habits
- Room customization (wall colors, floor materials, window views)
- Avatar customization (outfits, accessories)
- Premium item sets (seasonal collections, themed furniture)
- App blocking during focus sessions
- Ambient sound library (expanded)
- Custom mood tags
- Room screenshot sharing (with/without watermark)
- Data export

**Why this model:**
- The free tier is a COMPLETE app. Not a crippled trial. 5 habits is enough for most users.
- Premium is cosmetic + convenience. Nobody is locked out of core functionality.
- Daylio charges ~$36/year. We're slightly below, with a more compelling value prop (room customization).
- App blocking behind premium creates a natural upgrade trigger for the most engaged users.
- No ads. Ever. Ads in a journaling app violate user trust.

### Revenue Projections (Conservative)

Based on Daylio's ~$150K/month at ~160K downloads/month:
- At 10K downloads/month (achievable with good ASO + product-led growth)
- 5% conversion to annual ($29.99) = 500 subscribers/month
- Month 12 projection: ~6,000 active subscribers = ~$15K MRR
- Break-even target: ~2,000 subscribers (~$5K MRR covers solo dev + asset costs)

---

## Part 12: Tech Stack (Revised)

Removed TanStack Query (not needed until cloud sync). Reduced to only what ships in v1.

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | **Expo SDK 55** (RN 0.83, React 19) | Latest, New Architecture only |
| Navigation | **Expo Router v4** | File-based routing, native transitions |
| Language | **TypeScript 5.x** (strict) | End-to-end type safety |
| 3D Engine | **react-native-filament** | Metal/Vulkan, separate thread, .glb, PBR |
| Database | **expo-sqlite + Drizzle ORM** | Local-first, type-safe, live queries |
| State | **Zustand** | Simple, performant, React 19 compatible |
| Styling | **Nativewind v4** | Utility-first with design tokens |
| Animations | **react-native-reanimated v3** | Worklet-based 60fps, gesture integration |
| Gestures | **react-native-gesture-handler** | Native gesture system |
| Icons | **@expo/vector-icons** + custom SVGs | Habit category icons |
| Notifications | **expo-notifications** | Local scheduled reminders |
| Haptics | **expo-haptics** | Tactile feedback |
| Audio | **expo-av** | Ambient room sounds, focus sounds |
| Unit Tests | **Jest + jest-expo** | Standard RN unit testing |
| Component Tests | **React Native Testing Library** | Behavioral component tests |
| E2E Tests | **Maestro** | YAML-based, no app modifications |
| CI/CD | **EAS Build + EAS Submit** | Cloud builds, OTA updates |

**Added later (not installed until needed):**
- `react-native-device-activity` — Phase 3 (focus blocking)
- `TanStack Query` — Phase 4 (cloud sync)
- `expo-sharing` + `expo-media-library` — Phase 2 (room screenshots)

---

## Part 13: Data Model (Revised)

```sql
-- User profile (single row)
CREATE TABLE user_profile (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  display_name  TEXT NOT NULL DEFAULT '',
  avatar_config TEXT NOT NULL DEFAULT '{}',  -- JSON: appearance options
  room_tier     INTEGER NOT NULL DEFAULT 1,  -- 1=Studio, 2=One-Bed, 3=Loft, 4=Penthouse
  onboarded     INTEGER NOT NULL DEFAULT 0,  -- boolean
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Daily mood entry (one per day)
CREATE TABLE mood_entry (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  date          TEXT NOT NULL UNIQUE,         -- YYYY-MM-DD
  mood_level    INTEGER NOT NULL CHECK (mood_level BETWEEN 1 AND 5),
  tags          TEXT NOT NULL DEFAULT '[]',   -- JSON array of texture tag strings
  note          TEXT NOT NULL DEFAULT '',
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Habit definition
CREATE TABLE habit (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  name          TEXT NOT NULL,
  icon          TEXT NOT NULL,                -- icon identifier string
  category      TEXT NOT NULL CHECK (category IN ('body', 'mind', 'connect', 'move', 'create', 'rest')),
  is_archived   INTEGER NOT NULL DEFAULT 0,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Daily habit completion log
CREATE TABLE habit_log (
  id            TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  habit_id      TEXT NOT NULL REFERENCES habit(id) ON DELETE CASCADE,
  date          TEXT NOT NULL,                -- YYYY-MM-DD
  completed     INTEGER NOT NULL DEFAULT 0,  -- boolean
  created_at    TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(habit_id, date)
);

-- Room items (unlocked through habit progress)
CREATE TABLE room_item (
  id              TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  item_type       TEXT NOT NULL,              -- catalog identifier
  tier            INTEGER NOT NULL DEFAULT 1, -- 1, 2, or 3
  model_path      TEXT NOT NULL,              -- path to .glb asset
  position        TEXT NOT NULL DEFAULT '{}', -- JSON {x, y, z}
  rotation        TEXT NOT NULL DEFAULT '{}', -- JSON {x, y, z}
  scale           REAL NOT NULL DEFAULT 1.0,
  source_habit_id TEXT REFERENCES habit(id) ON DELETE SET NULL,
  unlocked_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Focus sessions (Phase 3)
CREATE TABLE focus_session (
  id                      TEXT PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
  target_duration_minutes INTEGER NOT NULL,
  actual_duration_minutes INTEGER NOT NULL DEFAULT 0,
  completed               INTEGER NOT NULL DEFAULT 0,
  ambient_sound           TEXT,                 -- 'rain', 'forest', 'lofi', null
  blocked_apps            TEXT NOT NULL DEFAULT '[]', -- JSON array
  reward_plant_type       TEXT,                 -- plant catalog identifier
  started_at              TEXT NOT NULL DEFAULT (datetime('now')),
  ended_at                TEXT
);

-- Indexes
CREATE INDEX idx_mood_entry_date ON mood_entry(date);
CREATE INDEX idx_habit_log_habit_date ON habit_log(habit_id, date);
CREATE INDEX idx_habit_log_date ON habit_log(date);
CREATE INDEX idx_habit_active ON habit(is_archived, sort_order);
CREATE INDEX idx_focus_session_date ON focus_session(started_at);
```

**Changes from v1:**
- Removed `color` from Habit (inherited from category).
- Removed `isTemplate` (templates are just normal habits with specific IDs, seeded on first launch).
- Added `tags` to MoodEntry (texture tag system).
- Added `onboarded` flag to user profile.
- Added `tier` directly on RoomItem (tracks upgrade state).
- Explicit SQL with constraints instead of abstract entity diagram.
- `room_tier` on user_profile tracks room expansion milestones.

---

## Part 14: File Structure (Revised)

```
nook/
├── app/                              # Expo Router
│   ├── _layout.tsx                   # Root layout (auth gate, DB init, providers)
│   ├── index.tsx                     # Room screen (THE app)
│   ├── journal.tsx                   # Journal/reflection (swipe-left target)
│   ├── year-in-pixels.tsx            # Full-screen Year in Pixels
│   ├── onboarding/
│   │   └── index.tsx                 # Guided first-launch (single flow, not pages)
│   ├── habit/
│   │   ├── new.tsx                   # Create habit (modal)
│   │   ├── [id].tsx                  # Edit habit (modal)
│   │   └── manage.tsx                # Reorder/archive habits (modal)
│   ├── focus/
│   │   ├── index.tsx                 # Focus timer (overlay on room)
│   │   └── apps.tsx                  # App block list config
│   └── settings/
│       ├── index.tsx                 # Settings list
│       ├── reminders.tsx             # Notification config
│       ├── appearance.tsx            # Theme, room customization (premium)
│       ├── avatar.tsx                # Avatar customization (premium)
│       └── privacy.tsx               # Data export, reset
├── src/
│   ├── components/
│   │   ├── room/
│   │   │   ├── RoomScene.tsx         # Filament viewport + camera controls
│   │   │   ├── RoomLighting.tsx      # Time-of-day + mood-reactive lighting
│   │   │   ├── Avatar.tsx            # Character model + animations
│   │   │   ├── RoomItem.tsx          # Individual item renderer
│   │   │   ├── GhostItem.tsx         # Translucent unlock preview
│   │   │   ├── ItemInfoCard.tsx      # Tap-to-inspect overlay
│   │   │   └── __tests__/
│   │   ├── checkin/
│   │   │   ├── CheckInSheet.tsx      # Bottom sheet (mood + habits + note)
│   │   │   ├── MoodPicker.tsx        # 5-level mood selector
│   │   │   ├── MoodTags.tsx          # Optional texture tags
│   │   │   ├── HabitRow.tsx          # Single habit with toggle
│   │   │   ├── HabitList.tsx         # Scrollable habit list
│   │   │   ├── NoteInput.tsx         # Expandable text field
│   │   │   └── __tests__/
│   │   ├── journal/
│   │   │   ├── JournalList.tsx       # Scrollable entry list
│   │   │   ├── JournalEntry.tsx      # Single day's entry card
│   │   │   ├── CalendarGrid.tsx      # Monthly calendar with mood dots
│   │   │   ├── InsightCard.tsx       # Mood-habit correlation card
│   │   │   ├── YearPixels.tsx        # Year in Pixels grid
│   │   │   └── __tests__/
│   │   ├── focus/
│   │   │   ├── FocusTimer.tsx        # Countdown + progress ring
│   │   │   ├── SoundPicker.tsx       # Ambient sound selector
│   │   │   ├── PlantGrowth.tsx       # Real-time plant animation during session
│   │   │   └── __tests__/
│   │   ├── habit/
│   │   │   ├── HabitForm.tsx         # Create/edit form
│   │   │   ├── CategoryPicker.tsx    # 6 category options
│   │   │   ├── IconGrid.tsx          # Category-filtered icon grid
│   │   │   └── __tests__/
│   │   └── ui/
│   │       ├── BottomSheet.tsx       # Reusable sheet component
│   │       ├── GreetingBar.tsx       # Time-aware header
│   │       ├── Pill.tsx              # Tag/badge component
│   │       └── __tests__/
│   ├── db/
│   │   ├── schema.ts                # Drizzle schema definitions
│   │   ├── client.ts                # expo-sqlite + Drizzle client init
│   │   ├── migrations/              # Generated SQL files
│   │   ├── seed.ts                  # Template habits + starter room items
│   │   └── __tests__/
│   ├── stores/
│   │   ├── useAppStore.ts           # User profile, onboarding state
│   │   ├── useDayStore.ts           # Current day's mood + habits (derived)
│   │   ├── useRoomStore.ts          # Room items, tier, lighting state
│   │   ├── useFocusStore.ts         # Active focus session state
│   │   └── __tests__/
│   ├── hooks/
│   │   ├── useTimeOfDay.ts          # Returns current time bracket
│   │   ├── useMoodEntry.ts          # CRUD for today's mood
│   │   ├── useHabits.ts             # Active habits list + toggle
│   │   ├── useRoomItems.ts          # Room items derived from habit progress
│   │   ├── useInsights.ts           # Mood-habit correlations
│   │   └── __tests__/
│   ├── lib/
│   │   ├── progress.ts              # Habit progress → item unlock calculations
│   │   ├── correlations.ts          # Mood-habit pattern analysis
│   │   ├── placement.ts             # 3D item position/slot system
│   │   ├── dates.ts                 # Date utilities
│   │   ├── sounds.ts                # Ambient audio manager
│   │   └── __tests__/
│   ├── constants/
│   │   ├── moods.ts                 # Mood levels, colors, labels, tags
│   │   ├── categories.ts            # Category definitions, icons per category
│   │   ├── items.ts                 # Room item catalog (type → model path → tiers)
│   │   ├── sounds.ts                # Sound file references
│   │   └── copy.ts                  # All microcopy strings (centralized)
│   └── types/
│       └── index.ts
├── assets/
│   ├── models/
│   │   ├── room-studio.glb          # Base room
│   │   ├── room-onebed.glb          # Tier 2 expansion
│   │   ├── avatar/
│   │   │   ├── base.glb
│   │   │   └── animations/          # Idle, happy, sad, celebrate, sit, wave
│   │   └── items/
│   │       ├── body/                # Tier 1-3 models per category
│   │       ├── mind/
│   │       ├── connect/
│   │       ├── move/
│   │       ├── create/
│   │       └── rest/
│   ├── sounds/
│   │   ├── ambient-morning.mp3
│   │   ├── ambient-evening.mp3
│   │   ├── rain.mp3
│   │   ├── forest.mp3
│   │   └── lofi.mp3
│   ├── fonts/
│   │   └── Satoshi/
│   └── icons/
│       └── habits/                  # SVG icons per category
├── maestro/
│   ├── 01-onboarding.yaml
│   ├── 02-daily-checkin.yaml
│   ├── 03-habit-crud.yaml
│   ├── 04-room-interaction.yaml
│   ├── 05-journal-navigation.yaml
│   ├── 06-focus-session.yaml
│   └── 07-settings.yaml
├── drizzle.config.ts
├── app.json
├── tsconfig.json
├── tailwind.config.js
├── jest.config.ts
├── .eslintrc.js
└── .prettierrc
```

---

## Part 15: Implementation Plan (Revised — Room First)

### Phase 1: The Room (Weeks 1-5)

**The only question that matters: can we render a 3D room on a phone with Expo?**

Everything hinges on this. If Filament works, we build Nook. If it doesn't, we pivot to a 2.5D illustrated room (still viable, different aesthetic, lower technical risk). We answer this in week 1.

#### Sprint 1 (Week 1-2): Proof of Life

| Task | Tests |
|------|-------|
| Expo SDK 55 init + TypeScript strict | App boots |
| Nativewind v4 + design tokens (full palette from Part 2) | Tokens render correctly |
| Drizzle + expo-sqlite + full schema + seed migration | DB CRUD smoke test |
| Zustand stores (app, day, room) | Store unit tests |
| **react-native-filament POC:** Load room-studio.glb, render in viewport, orbit camera | Renders on iOS + Android at 60fps |
| Jest + RNTL + Maestro scaffold | Smoke tests pass |
| ESLint + Prettier | Lint passes |

**Gate:** 3D room renders. DB reads/writes. Design tokens applied. If Filament fails → STOP and evaluate 2.5D pivot before proceeding.

#### Sprint 2 (Week 3-4): Room + Mood + Avatar

| Task | Tests |
|------|-------|
| Avatar model loading + idle animation | Avatar visible, animates |
| Time-of-day lighting system | Unit test: correct bracket per hour. Visual: light changes |
| Mood-reactive room lighting | Select mood → lighting shifts |
| MoodPicker component (5 levels, haptics) | RNTL: renders 5 options, callback fires, haptic called |
| MoodTags component (optional texture tags) | RNTL: multi-select, renders pills |
| CheckInSheet (bottom sheet with mood + note) | RNTL: slides up, submits entry |
| NoteInput (expandable text) | RNTL: expands, submits text |
| MoodEntry CRUD (one per day, upsert) | Unit: create, update, query by date |
| GreetingBar (time-aware header) | Unit: correct greeting per time bracket |
| Room ambient sound (basic: morning/evening) | Audio plays, respects volume setting |
| E2E: Open app → log mood → room lighting changes | Maestro flow passes |

**Gate:** User can open the app, see the room with avatar, log a mood, see the room react.

#### Sprint 3 (Week 5): Habits + Instant Feedback

| Task | Tests |
|------|-------|
| Seed template habits on first launch | Unit: 3 habits exist after seed |
| HabitRow component (tap to toggle, spring animation, haptics) | RNTL: toggle state, animation triggers |
| HabitList in CheckInSheet | RNTL: renders active habits, scrollable |
| HabitLog CRUD (toggle per day) | Unit: create, toggle, query completions |
| Progress calculation (total days per habit) | Unit: correct totals, not consecutive |
| Instant feedback: first completion → tiny room item appears | Integration: complete habit → room item in DB → model loads |
| Ghost items (translucent outlines in category zones) | Visual: outlines visible, tap shows tooltip |
| Day-zero room setup (base furniture, lived-in feel) | Visual: room has bed, table, lamp, rug |
| E2E: Log mood + complete habit → see room respond | Maestro flow passes |

**Gate:** Complete daily loop works. Room reacts to mood and habits. Ghost items show what's coming.

---

### Phase 2: The Full Loop (Weeks 6-9)

#### Sprint 4 (Week 6-7): Habit Management + Room Item System

| Task | Tests |
|------|-------|
| HabitForm (create: name + category + icon) | RNTL: validates input, submits, renders in list |
| CategoryPicker (6 options with colors) | RNTL: selection state, color display |
| IconGrid (filtered by category) | RNTL: shows correct icons per category |
| Edit habit (modal) | RNTL: pre-fills, updates |
| Archive habit (soft delete) | Unit: archived habits hidden from day view, data preserved |
| Manage habits screen (reorder, archive) | RNTL: drag reorder, archive toggle |
| Room item tier system (3→T1, 10→T2, 30→T3) | Unit: correct tier per progress threshold |
| Item placement system (category → zone → slot) | Unit: items placed in correct zones |
| Item tier upgrade animations | Visual: item morphs/grows on upgrade |
| Tap-to-inspect (info card with habit name + progress) | RNTL: card shows on tap, correct data |
| E2E: Create habit → complete 3x → item appears → tap inspect | Maestro flow |

**Gate:** Full habit lifecycle. Room fills with items. Item tiers upgrade.

#### Sprint 5 (Week 8-9): Journal + Onboarding + Polish

| Task | Tests |
|------|-------|
| Journal view (swipe-left from room) | RNTL: swipe gesture navigates, blur transition |
| JournalList (scrollable entries) | RNTL: renders entries, correct data |
| CalendarGrid (monthly, mood-colored dots) | RNTL: correct colors, tap navigates |
| Search + mood filter | RNTL: filters entries correctly |
| InsightCard (mood-habit correlation, after 7+ days) | Unit: correct correlation calculation |
| Year in Pixels (full screen) | RNTL: renders grid, tap navigates |
| Onboarding flow (teach-by-doing, Part 9) | E2E: full onboarding Maestro flow |
| Daily reminder notifications (expo-notifications) | Unit: scheduling logic. Manual: notification appears |
| Return-after-absence notifications | Unit: correct message per absence duration |
| Settings screen (name, reminders, theme, sound volume) | RNTL: settings persist |
| Light / dark mode (warm darks, not pure black) | Visual: both themes correct |
| Accessibility pass (screen reader labels, contrast, touch targets 44pt) | Audit: WCAG 2.1 AA |
| Performance profiling (Filament frame budget, DB query times) | All NFRs met |
| E2E: Full onboarding → 3 days of use → journal check → settings change | Maestro flow |

**Gate:** Complete app experience. Onboarding → daily use → reflection. Ship-ready for v1 TestFlight.

---

### Phase 3: Focus Mode + Premium (Weeks 10-13)

#### Sprint 6 (Week 10-11): Focus Timer + Rewards

| Task | Tests |
|------|-------|
| Focus timer UI (countdown, progress ring, presets) | RNTL: timer counts, ring updates, presets work |
| Focus session CRUD | Unit: create, complete, cancel, query history |
| Ambient sound during focus (rain, forest, lo-fi, silence) | Audio plays, switches correctly |
| Room transition to focus mode (lights dim, avatar sits) | Visual: transition smooth |
| Plant growth animation during session (real-time) | Visual: plant grows proportionally |
| Completed session → plant persists in room | Integration: plant in DB, renders in room |
| Cancelled session → plant doesn't appear (no punishment) | Unit: no reward on cancel |
| Focus stats (total time, session count, by day) | Unit: correct aggregations |
| iOS app blocking (react-native-device-activity) | Manual: selected apps blocked during session |
| Android app blocking (UsageStats + overlay) | Manual: overlay appears on blocked app |
| App selection UI (categories, presets, toggles) | RNTL: selection persists |
| E2E: Start focus → complete → plant in room | Maestro flow |

**Gate:** Focus mode fully functional. Blocking works on both platforms (or graceful fallback).

#### Sprint 7 (Week 12-13): Premium + Paywall + Launch Prep

| Task | Tests |
|------|-------|
| RevenueCat / expo-iap integration | Unit: purchase flow, restore, subscription state |
| Paywall screen (premium features showcase) | RNTL: renders, purchase triggers |
| Premium gates (>5 habits, room customization, avatar, blocking, sounds) | Unit: gates enforce correctly |
| Room customization (wall color, floor, window view) — premium | RNTL: options apply to room |
| Avatar customization (outfits, accessories) — premium | RNTL: options apply to avatar |
| Room screenshot (expo-sharing + expo-media-library) | Manual: captures room, shares correctly |
| Share Year in Pixels as image | Manual: generates image, shares |
| App Store metadata (screenshots, description, keywords) | Review: ASO optimized |
| Final E2E regression: all Maestro flows pass | All 7 flows green |
| Performance final check: cold start <2s, room 60fps, DB <50ms | All NFRs met |
| Privacy policy + terms (required for Screen Time API) | Legal: complete |

**Gate:** App is App Store ready. Premium works. All tests pass.

---

### Phase 4: Growth + Cloud (Weeks 14-20, Post-Launch)

| Sprint | Focus |
|--------|-------|
| Sprint 8-9 | Analytics dashboard (Posthog/Mixpanel), bug triage, user feedback pipeline |
| Sprint 10-11 | Room tier expansions (One-Bed, Loft), seasonal window views, new item sets |
| Sprint 12-13 | Cloud sync (Supabase + TanStack Query), Sign in with Apple/Google |
| Sprint 14+ | Social features (room sharing, friend rooms), widget, Apple Watch complication |

---

## Part 16: Testing Strategy (Revised)

### Testing Pyramid

```
        ╱╲
       ╱E2E╲         7 Maestro flows — full user journeys
      ╱──────╲
     ╱Component╲      Every screen + shared component — RNTL
    ╱────────────╲
   ╱  Unit Tests  ╲   All business logic, stores, hooks, DB — Jest
  ╱────────────────╲
```

### Unit Tests (Jest + jest-expo) — Target: >85% coverage

| Module | What's Tested |
|--------|--------------|
| `lib/progress.ts` | Total days calculation, tier thresholds, upgrade logic, edge cases (archived habits, zero completions) |
| `lib/correlations.ts` | Mood-habit correlation calculation, minimum data requirements, statistical edge cases |
| `lib/placement.ts` | Category → zone mapping, slot allocation, position generation, room tier capacity |
| `lib/dates.ts` | Date formatting, bracket calculation, day-of-year, timezone handling |
| `lib/sounds.ts` | Sound selection per time/mood, volume control, fade logic |
| `db/` | All CRUD operations, upsert behavior, cascade deletes, migration integrity |
| `stores/` | State transitions, computed values, action side effects |
| `hooks/` | Derived data correctness, re-render triggers, loading/error states |
| `constants/copy.ts` | All copy strings are non-empty, no duplicates, no broken interpolation |

### Component Tests (React Native Testing Library)

| Component | Key Assertions |
|-----------|---------------|
| `MoodPicker` | 5 options render, tap fires callback with correct level, selected state visible, haptic called |
| `MoodTags` | Tags render, multi-select works, maximum 3 enforced, pills display |
| `HabitRow` | Toggle changes state, spring animation triggers, icon + name render |
| `CheckInSheet` | Sheet slides up/down, submits mood + habits + note, date navigation |
| `HabitForm` | Validates name (required), category selection, icon selection, submits correct data |
| `JournalList` | Renders entries in date order, empty state shown when no data |
| `CalendarGrid` | Correct days per month, mood colors applied, tap fires callback |
| `InsightCard` | Shows correlation text, handles insufficient data gracefully |
| `YearPixels` | 365/366 cells render, correct colors, tap fires callback |
| `FocusTimer` | Countdown ticks, ring updates, preset buttons work, cancel prompts |
| `GreetingBar` | Correct greeting per time bracket, name displayed |
| `BottomSheet` | Snap points work, drag dismisses, content renders |

### E2E Tests (Maestro)

| # | Flow | Steps | Assertions |
|---|------|-------|------------|
| 01 | Onboarding | Launch → room appears → enter name → select mood → room lights change → complete habit → item appears | Room renders, name saved, mood saved, habit logged, item visible |
| 02 | Daily check-in | Open app → pull up sheet → select mood → add tags → complete habits → write note → dismiss | Entry persists across app restart |
| 03 | Habit CRUD | Pull up sheet → add habit → fill form → save → see in list → complete → edit → archive | Habit appears, completes, edits persist, archived habits hidden |
| 04 | Room interaction | Orbit room (drag) → zoom (pinch) → tap item → see info card → tap ghost → see tooltip → double-tap reset | Camera moves, info card shows correct data |
| 05 | Journal | Swipe left → see entries → tap calendar day → see entry → search → filter by mood | Correct data displayed, filters work |
| 06 | Focus session | Tap timer icon → set 1 min (test duration) → begin → wait → complete → return to room → plant visible | Timer completes, plant persists |
| 07 | Settings | Open settings → change name → change reminder time → toggle theme → export data → verify | Changes persist across restart |

### Automation

| Trigger | What Runs | Must Pass |
|---------|-----------|-----------|
| Pre-commit | ESLint + TypeScript type check | All |
| PR opened | Jest unit + RNTL component tests | All |
| PR merge to main | Jest + RNTL + Maestro E2E (iOS + Android) | All |
| Weekly | Full regression + performance benchmarks | All NFRs |
| Pre-release | Full suite + manual accessibility audit | All |

---

## Part 17: Non-Functional Requirements

| Requirement | Target | How We Measure |
|-------------|--------|----------------|
| Cold start | < 2 seconds | Profiling on iPhone 12 + Pixel 6 |
| 3D room FPS | Stable 60fps | Filament frame timing, no drops below 55 |
| DB query | < 50ms per query | Drizzle query logging in dev |
| App binary | < 60MB (without 3D assets OTA) | EAS build output |
| Total install | < 100MB (with all models) | Device storage check |
| Test coverage | > 85% unit, 100% critical paths E2E | Jest coverage report |
| Accessibility | WCAG 2.1 AA | aXe audit + manual screen reader test |
| Offline | 100% functional (local-first) | Airplane mode E2E test |
| Battery | 3D pauses when backgrounded, <5% drain/hour active | Battery profiling tools |
| Crash-free | > 99.5% | Sentry / EAS crash reports |
| Supported | iOS 16+, Android 8+ (API 26) | Testing matrix |

---

## Part 18: Risk Register (Revised)

| Risk | Probability | Impact | Mitigation | Owner |
|------|-------------|--------|------------|-------|
| Filament doesn't work with Expo SDK 55 | Medium | Critical | Week 1 POC is go/no-go gate. Fallback: 2.5D with Skia (react-native-skia) — illustrated room, same concept, different rendering. 2nd fallback: WebGL via expo-gl. | Dev |
| 3D asset pipeline (who makes the models?) | High | High | Start with free .glb assets (Sketchfab CC0, poly.pizza). Budget $2-5K for custom asset commission before launch. Use Blender for optimization. | Product |
| Apple rejects Screen Time API entitlement | Medium | Medium | Apply during Phase 2 development (parallel track). Entire app works without blocking. Timer + plant reward is the core; blocking is enhancement. | Dev |
| App size exceeds targets | Medium | Medium | <500KB per .glb model (aggressive optimization). LOD system for complex items. Lazy-load tier 2/3 models. Consider on-demand asset downloads. | Dev |
| Battery drain from 3D rendering | Medium | Medium | Filament renders on separate thread. Pause on background. Reduce to 30fps when sheet is fully expanded. LOD distance culling. | Dev |
| User retention drops after week 1 | High | High | Instant feedback (day 0 item). No-streak philosophy prevents guilt churn. Return-after-absence notifications are welcoming, not pestering. Room "remembers" progress even after breaks. | Product |
| Nativewind v4 + Expo SDK 55 compatibility | Low | Medium | Test in Sprint 1. Fallback: raw StyleSheet with design tokens as constants. | Dev |
| Revenue < break-even | Medium | High | Conservative burn rate (solo dev). Free tier is genuinely complete (word-of-mouth). Premium positioned as cosmetic/delight, not essential. Early TestFlight feedback informs pricing. | Business |

---

## Part 19: Success Metrics (Revised)

### North Star: Daily Room Visits

The single metric that matters: **how many users open the app and see their room each day.** Not mood logs, not habit completions — room visits. If users are visiting the room, the emotional connection is working.

### Metrics Table

| Metric | Phase 1 Target | Phase 3 Target | How Measured |
|--------|---------------|---------------|-------------|
| D1 retention | > 50% | > 60% | Analytics: users who return day after install |
| D7 retention | > 30% | > 40% | Analytics: users active 7 days after install |
| D30 retention | > 15% | > 25% | Analytics: users active 30 days after install |
| Daily room visits (DAU/MAU) | > 40% | > 55% | Analytics: daily active / monthly active |
| Mood log rate | > 70% of daily visitors | > 80% | DB: mood entries / room visits per day |
| Habits completed per session | > 1.5 avg | > 2.5 avg | DB: completed habits per day for active users |
| Session duration | 1-3 minutes avg | 1-3 minutes | Analytics: session timing (micro = good) |
| Premium conversion | > 3% of D30 users | > 7% | RevenueCat: trial starts / active users |
| Crash-free rate | > 99% | > 99.5% | Sentry |
| App Store rating | > 4.3 | > 4.7 | Store reviews |
| NPS (in-app survey at D14) | > 30 | > 50 | In-app survey |

### Key Insight Metrics (Not Targets, Just Track)

- Which habits are most commonly created (informs default templates)
- Which room items are most inspected (informs premium item design)
- Average mood level over time per cohort (are users actually feeling better?)
- Focus session completion rate (if < 50%, the UX needs work)
- Time-of-day usage distribution (informs notification timing)
- Drop-off point in onboarding (optimize the weakest step)

---

## Part 20: Company & Operations

### Entity

Register as a UK limited company (Maya's in London, we are too). Name: **Nook Labs Ltd.** or equivalent available.

### Team (Phase 1-3: Solo/Duo)

| Role | Who | Focus |
|------|-----|-------|
| Founder/Dev | You | Expo, Filament, Drizzle, all code |
| Contract 3D Artist | Freelancer (Fiverr/Upwork) | .glb models: room, avatar, items. Budget: $3-5K |
| Contract Sound Designer | Freelancer | Ambient audio files. Budget: $500-1K |

### Phase 4+: First Hires

| Role | When | Why |
|------|------|-----|
| Part-time designer | At 2K subscribers | Paywall optimization, premium item design, marketing assets |
| Backend developer | At cloud sync phase | Supabase integration, sync conflict resolution |
| Community/support | At 10K subscribers | App Store reviews, feedback triage, social media |

### Budget (Year 1)

| Item | Cost |
|------|------|
| Apple Developer Account | $99/year |
| Google Play Developer | $25 one-time |
| EAS Build (Pro) | $99/month |
| 3D Asset Commission | $3,000-5,000 |
| Sound Design | $500-1,000 |
| Sentry (error tracking) | Free tier initially |
| Posthog (analytics) | Free tier initially |
| Domain + hosting (landing page) | $100/year |
| Legal (privacy policy, terms) | $500 (template service) |
| **Total Year 1** | **~$7,000-9,000** |

Break-even at ~200 annual subscribers ($29.99 each = $6,000/year).

### Launch Strategy

1. **Week -4:** Landing page with email capture. Teaser video showing the room concept.
2. **Week -2:** TestFlight beta to 50-100 users. Feedback loop.
3. **Week 0:** App Store + Google Play launch. Product Hunt post. Reddit (r/getdisciplined, r/journaling, r/cozygaming). Twitter/X thread with room screenshots.
4. **Week 1-4:** Respond to every review. Fix bugs fast. Ship first patch within 7 days.
5. **Ongoing:** ASO optimization. Content marketing (blog posts about no-guilt habit tracking, room screenshots on social media). Organic + word-of-mouth focused. No paid acquisition until product-market fit confirmed (D30 retention > 20%).

---

## Appendix A: Answers to Critique Questions

### "What if the room WAS the entire app?"
**Answer:** It is, in v2. No tabs. The room is the home screen. Mood and habits live in a bottom sheet over the room. History is a swipe-left. Settings is a gear icon. The room is always visible, always the context.

### "What if you killed streaks entirely?"
**Answer:** Done. No streak counters. No streak-at-risk notifications. Consistency is communicated through room richness. Progress thresholds are based on total days, not consecutive. The room never punishes — items don't shrink, rooms don't degrade.

### "Who is this person?"
**Answer:** Maya, 27, UX designer in London. See Part 1. The art direction (Scandinavian warmth), the copy (calm friend, not productivity coach), the default habits (stretch, read, call someone), and the no-guilt philosophy all derive from her needs.

### "What does this app feel like at 6 months?"
**Answer:** Room tier upgrades. At 60 days: room expands to a one-bedroom. At 120 days: a loft opens up. At 365: an outdoor balcony/garden. Plus seasonal window views, premium item collections, and the focus plant garden growing along the windowsill. The room never stops evolving.

### "Why would someone choose this over Daylio + Focus Friend?"
**Answer:** One sentence: Your habits don't fill a checklist, they build a home.
