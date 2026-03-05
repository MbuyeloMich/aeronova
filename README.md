# Skyza

Skyza is a real-time 3D flying and driving simulator built with Cesium, React, and TypeScript.
You can switch between aircraft and ground vehicle modes, fly over real terrain, and teleport to curated destinations from South Africa and around the world.

## What Skyza Includes

- Aircraft and ground vehicle gameplay (`M` to switch)

### Adding a Realistic HondaJet Model
To display the real‑life Honda HA‑420 jet you can:

1. Download the GLB/GLTF model from Sketchfab (by Yo Boy):
   https://sketchfab.com/models/5a9b43379b5a4d4eb7d4513d8e9ac296
2. Place the exported `.glb` into `packages/web/public/` and rename it `hondajet.glb`.
3. The preset in `VehicleManager.ts` already points to `./hondajet.glb`.
   Alternatively you may set `modelUrl` to any absolute URL where the file is hosted.
4. Restart the dev server. Clicking **Aircraft** → **Honda HA‑420 HondaJet** will now
   spawn the accurate model with no errors. Top speed: **3000 km/h**.

The in‑app link under the aircraft button will always redirect to the Sketchfab
page for easy access to the 3D model and attribution.
- Follow camera modes (`C` to cycle)
- Real terrain rendering with Cesium
- Mini-map with live vehicle tracking and click teleport
- Teleport destination browser with search
- Quality presets: performance, balanced, quality, ultra
- Crash detection and restart flow (`R`)
- Builder mode for spawning objects (`B`)

## Teleport Destination Catalog (From Code)

The teleport menu is data-driven from `LocationSelector.tsx` and currently exposes:

- Domestic: 40 South African destinations
- Global: 150 destinations (iconic landmarks + major stadiums)

Examples included in the in-code lists:

- South Africa: Union Buildings, Robben Island, Table Mountain, Kruger National Park Gate, Nkandla Homestead, FNB Stadium
- Global landmarks: Eiffel Tower, Taj Mahal, Great Wall (Badaling), Burj Khalifa, Machu Picchu
- Global stadiums: Wembley Stadium, Maracana Stadium, SoFi Stadium, Camp Nou, MetLife Stadium

## Stack

- React 18 + TypeScript
- Vite
- CesiumJS
- Mapbox GL (`react-map-gl`)
- Tailwind CSS

## Project Structure

```text
.
|-- packages/
|   `-- web/
|       |-- src/
|       |-- public/
|       `-- package.json
|-- scripts/
|   `-- deploy-web.sh
|-- package.json
`-- README.md
```

## Setup

Prerequisites:

- Node.js 18+
- npm
- Mapbox public token (`pk...`)
- Cesium Ion access token

Install and run:

```bash
cd packages/web
npm install
npm run dev
```

Add env vars in `packages/web/.env` (optional if entering tokens in-app):

```bash
VITE_MAPBOX_TOKEN=pk.your_mapbox_token
VITE_CESIUM_TOKEN=your_cesium_ion_token
```

## Desktop Controls

| Key | Action |
|---|---|
| `W` / `ArrowUp` | Throttle / altitude up |
| `S` / `ArrowDown` | Brake / altitude down |
| `A` `D` / `ArrowLeft` `ArrowRight` | Turn / roll |
| `Q` / `E` | Roll left / roll right |
| `C` | Switch camera |
| `M` | Toggle aircraft/ground vehicle |
| `V` | Toggle collision (ground vehicle) |
| `B` | Toggle builder mode |
| `R` | Restart after crash |
| `?` | Open controls panel |
| `` ` `` / `~` | Toggle debug panel |

## Scripts

In `packages/web`:

```bash
npm run dev
npm run build
npm run preview
```

From repo root:

```bash
npm run deploy:web
```

Deployment uses `scripts/deploy-web.sh` (Cloudflare Pages). Required root `.env` keys:

```bash
CLOUDFLARE_ACCOUNT_ID=...
CLOUDFLARE_API_TOKEN=...
# Optional:
CLOUDFLARE_PAGES_PROJECT_NAME=...
```

## License

MIT
