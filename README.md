# 🌍 Skyza – Real‑Time 3D Flight & Driving Simulator

[![Skyza Demo – Fly over Clifton Beach & Camps Bay](aurafly%20clifton%20beach%20and%20camps%20bay.mp4)](aurafly%20clifton%20beach%20and%20camps%20bay.mp4)

> *Watch a scenic flight over Cape Town’s Clifton Beach and Camps Bay – real‑time terrain, smooth controls, and immersive 3D views.*

---

## 📌 Overview

**Skyza** is a real‑time 3D flying and driving simulator built with **CesiumJS**, **React**, and **TypeScript**.  
You can seamlessly switch between aircraft and ground vehicle modes, explore real‑world terrain, and instantly teleport to curated destinations across South Africa and the globe.

Whether you're a developer exploring geospatial rendering or an aviation enthusiast, Skyza offers an interactive experience powered by modern web technologies.

---

## ✨ Features

### 🚁 Vehicle Modes
- **Aircraft** – Fly a realistic **Honda HA‑420 HondaJet** (top speed: 3000 km/h)
- **Ground Vehicle** – Drive with collision detection and responsive controls
- Toggle modes anytime with the `M` key

### 🗺️ Real‑World Terrain
- Powered by **CesiumJS** – satellite imagery and elevation data
- Smooth 60 FPS rendering with quality presets

### 📍 Teleport Destination Browser
- **40+ South African destinations** (Table Mountain, Union Buildings, FNB Stadium, etc.)
- **150+ global landmarks** (Eiffel Tower, Taj Mahal, Great Wall)
- **Major stadiums** (Wembley, Maracana, SoFi, Camp Nou)
- Search‑powered, data‑driven menu

### 🎥 Camera System
- Multiple follow‑cam modes – cycle with `C`
- Cinematic views for both air and ground

### 🗺️ Mini‑Map
- Live vehicle tracking with **Mapbox GL**
- Click anywhere on the map to instantly teleport

### ⚙️ Performance & Quality
- Quality presets: **Performance, Balanced, Quality, Ultra**
- Crash detection with automatic restart (`R` key)
- Builder mode for object spawning (`B`)

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite |
| **3D Rendering** | CesiumJS |
| **Mapping** | Mapbox GL (`react-map-gl`) |
| **Styling** | Tailwind CSS |
| **Deployment** | Cloudflare Pages / Vercel |

---

## 📁 Project Structure
.
├── packages/
│ └── web/
│ ├── src/
│ │ ├── cesium/ # Core 3D engine (vehicles, camera, terrain)
│ │ ├── react/ # UI components (HUD, controls, mini‑map)
│ │ └── index.tsx
│ ├── public/ # Static assets (3D models, icons)
│ └── package.json
├── scripts/
│ └── deploy-web.sh # Deployment automation
├── package.json
└── README.md

text

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **npm** or **yarn**
- **Mapbox public token** (get one at [mapbox.com](https://mapbox.com))
- **Cesium Ion access token** (get one at [cesium.com/ion](https://cesium.com/ion))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/MbuyeloMich/cesium-flight-simulator.git
   cd cesium-flight-simulator/packages/web
Install dependencies

bash
npm install
Configure environment variables (optional – you can also enter tokens in‑app)
Create a .env file in packages/web/:

bash
VITE_MAPBOX_TOKEN=pk.your_mapbox_token
VITE_CESIUM_TOKEN=your_cesium_ion_token
Start the development server

bash
npm run dev
Open your browser at http://localhost:5173

🎮 Controls
Key	Action
W / ↑	Throttle / altitude up
S / ↓	Brake / altitude down
A / D / ← / →	Turn / roll
Q / E	Roll left / right
C	Switch camera mode
M	Toggle aircraft / ground vehicle
V	Toggle collision (ground vehicle only)
B	Toggle builder mode
R	Restart after crash
?	Show controls panel
` / ~ | Toggle debug panel |	
🛩️ Adding a Custom 3D Model
Skyza supports custom GLB/GLTF models. To add the realistic Honda HA‑420 HondaJet:

Download the model from Sketchfab (by Yo Boy)

Place the exported .glb file into packages/web/public/

Rename it to hondajet.glb

Restart the dev server

Select Aircraft → Honda HA‑420 HondaJet in the UI

The model will now spawn with accurate physics and a top speed of 3000 km/h.

📡 Teleport Destination Catalog
The teleport menu is powered by LocationSelector.tsx. Current destinations include:

South Africa (40+):

Union Buildings, Robben Island, Table Mountain, Kruger National Park Gate, Nkandla Homestead, FNB Stadium

Global Landmarks (150+):

Eiffel Tower, Taj Mahal, Great Wall (Badaling), Burj Khalifa, Machu Picchu

Global Stadiums:

Wembley, Maracana, SoFi, Camp Nou, MetLife

🔧 Scripts
Command	Description
npm run dev	Start development server
npm run build	Create production build
npm run preview	Preview production build locally
npm run deploy:web	Deploy to Cloudflare Pages
🌐 Deployment
Skyza is configured for deployment on Cloudflare Pages or Vercel.

Vercel (One‑click)
Push your code to GitHub

Import the repository on vercel.com

Set environment variables (VITE_MAPBOX_TOKEN, VITE_CESIUM_TOKEN)

Deploy – your simulator will be live in minutes

Cloudflare Pages
The project includes a deploy-web.sh script. Set the following environment variables in your Cloudflare dashboard:

bash
CLOUDFLARE_ACCOUNT_ID=your_account_id
CLOUDFLARE_API_TOKEN=your_api_token
CLOUDFLARE_PAGES_PROJECT_NAME=skyza
📄 License
This project is licensed under the MIT License. Feel free to use, modify, and distribute.

🙌 Acknowledgements
CesiumJS for the incredible 3D globe engine

Mapbox for map tiles and styling

Sketchfab for the HondaJet 3D model (Yo Boy)

The open‑source community for all the tools that made this possible

Built with ❤️ by Mbuyelo Mich
🔗 GitHub | LinkedIn