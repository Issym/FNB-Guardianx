# GuardianX (MVP)

A mobile-first, privacy-respecting safety app skeleton built with **Next.js 14 + TypeScript** and **Tailwind**. It ships with a dark theme, hamburger navigation, SOS live tracking (demo), a basic Stranger Check, an Evidence Locker (local encryption demo), and a heatmap fed by demo incidents.

> **Status:** Under active development. This repo is a runnable demo you can extend towards the full spec.

## ✨ Design
- Dark slate background for night use; **indigo** primary with **emerald/amber/rose** status colors.
- Big tap targets, soft shadows, rounded corners.
- Accessible focus rings and semantic markup.

## ▶️ Quick Start

```bash
# Node 18+
npm i
npm run dev
# open http://localhost:3000
```

Optional: create `.env.local` from `.env.local.example` and add `NEXT_PUBLIC_MAPBOX_TOKEN` if you plan to switch to Mapbox. The map uses MapLibre + OSM by default (no key required).

## 🧭 Key Pages
- `/` Home
- `/check` Stranger Check
- `/map` Heatmap (demo incidents)
- `/verify` Consent-based photo comparison (demo)
- `/sos` Start SOS, share track link
- `/track/:id` Live tracking (polling)
- `/evidence` Evidence locker (local audio encrypt demo)
- `/about` About (notes that app is under development)

## 🔌 API Routes (demo)
- `POST /api/stranger/check` → simple heuristics over pasted text/handles
- `POST /api/panic/start` → returns session id
- `POST /api/panic/update` → push `{ id, lat, lng, battery }`
- `GET  /api/panic/status?id=...` → latest points
- `POST /api/panic/stop` → end session
- `POST /api/incidents` → add a demo incident
- `GET  /api/tiles?since=7d` → time-decayed scores for heatmap

> All data here is **in-memory** (server process) for easy local testing. Wire to Supabase/Firebase and H3 tiling for production.

## 🛠️ Next Steps
- Persist sessions/incidents to a DB (Supabase Postgres + RLS recommended).
- Upgrade map layers to real H3 tiles and materialized views.
- Replace the verify demo with a consent-based liveness + face embedding flow.
- Add push notifications (OneSignal/FCM) and opt-in radius alerts.
- Build Meet Safe Mode with timed check-ins, geofences, and covert UI.
- Add i18n (English + Zulu/Xhosa/Afrikaans).

## 📞 Emergency
`tel:10111` is linked in SOS. For crimes in progress, always call first.

---

