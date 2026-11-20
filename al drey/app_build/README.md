# Glamour Runway 3D ✨ Fashion Showcase

A web-based 3D fashion game prototype inspired by *"Dress to Impress"*, built with **Three.js** (HTML5, CSS3, and modern JavaScript).

## 👗 Features

1. **3D Stylized Chibi Mannequin & Turntable Stage**:
   - 360-degree turntable stage rotated smoothly via mouse drag or touch.
   - Studio lighting with spotlight, soft pastel rim lights, ambient lighting, and particle sparkles.
   - Luxury dressing room boutique background with mirror and glowing neon pillars.

2. **Real-Time 3D Customization**:
   - Modular wardrobe slots: **Hair** (4 styles), **Tops** (5 designs), **Bottoms** (5 designs), **Shoes** (4 styles), and **Head Accessories** (4 designs).
   - 100% procedural Three.js geometries: Zero external `.gltf` asset dependencies, guarantees zero 404/CORS errors and instant rendering.
   - Preset aesthetic color palette + HTML5 color picker to modify clothing materials in real time.

3. **Core Gameplay Loop**:
   - **Theme & 90s Countdown**: Random theme selected on game start (e.g. *Cyberpunk Gala*, *Royal Elegance*, *Y2K Pop Star*, *Gothic Romance*, etc.) with a 90-second countdown timer.
   - **Finish & Walk Catwalk**: "Selesai & Tampil" button transitions directly to the runway.
   - **Runway & Poses**: Catwalk walk cycle animation down the runway, 3 distinct fashion poses at the stage tip, paparazzi camera blitz flashes, and sound effects.
   - **Automated Scoring & Podium**: Theme affinity, color harmony, and outfit completeness evaluation, star rating (1–5 stars), and top 3 podium standings competing against 3 AI models.

## 🚀 Quick Start (Local Run)

```bash
# 1. Install express dependencies
npm install

# 2. Start the local server
npm start
```

Open your browser at `http://localhost:3000`.
