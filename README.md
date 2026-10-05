# L'Heure Bleue — Scroll Experience

An immersive scroll-controlled journey for Guerlain's L'Heure Bleue, where scroll position controls video playback through a continuous visual story.

## Live Website

🔗 **[View Live Site](#)** *(URL will be added after deployment)*

## Concept

Scale-reversal journey: An ordinary puddle reflection becomes an immense blue world. The viewer moves through an iris at macro scale, recognizes the flower, and returns to reveal one real iris beside the L'Heure Bleue bottle.

## Features

- ✓ Scroll-controlled video playback in both directions
- ✓ Four editorial chapters with intentional scene holds
- ✓ 40-second virtual scroll timeline mapped to the 26-second master journey
- ✓ Reduced-motion fallback that avoids video decoding and uses the final poster
- ✓ Responsive chapter navigation and keyboard-focusable controls
- ✓ Missing-media fallback while the final video is not yet committed

## Technical Stack

- **Build tool:** Vite
- **Styling:** SCSS
- **Scroll engine:** Vanilla JavaScript
- **Scroll-world reference:** [oso95/scroll-world](https://github.com/oso95/scroll-world)
- **Engine adaptation:** blob loading, seek coalescing, sticky stage and reduced-motion handling adapted for one master clip
- **Video generation:** Magnific AI (Seedance 2.5 Pro)
- **Resolution:** 720p, 24fps
- **Audio:** intentionally removed from the web prototype
- **Display type:** Berold is installed locally on the development computer; the public repository uses `local()` font resolution and a serif fallback until web-embedding rights are confirmed

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Before testing the full visual timeline, place the prepared silent file at:

```text
public/video/lheure-bleue-master.mp4
```

The video is intentionally not committed yet. `public/video/README.md` contains the exact audio-removal command; `ffmpeg -c copy -an` removes only the audio stream without re-encoding the picture.

## Video Structure

1. **Puddle → Sky** (5s)
2. **Sky → Iris entry** (8s)
3. **Iris macro journey** (8.87s)
4. **Final scale reveal** (4s)

**Total:** ~26 seconds

## Credits

**Student concept by Anastasiia Kovtun**  
AI-generated visualization  
Not affiliated with Guerlain

## Assignment

Part of the ScrollWorld assignment — building scroll-driven interactive experiences with AI-generated video.

Reference: [oso95/scroll-world](https://github.com/oso95/scroll-world)
