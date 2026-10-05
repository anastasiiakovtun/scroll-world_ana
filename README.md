# L'Heure Bleue — Scroll Experience

An immersive scroll-controlled journey for Guerlain's L'Heure Bleue, where scroll position controls video playback through a continuous visual story.

## Live Website

🔗 **[View Live Site](#)** *(URL will be added after deployment)*

## Concept

Scale-reversal journey: An ordinary puddle reflection becomes an immense blue world. The viewer moves through an iris at macro scale, recognizes the flower, and returns to reveal one real iris beside the L'Heure Bleue bottle.

## Features

- ✓ Scroll-controlled video playback (forward & backward)
- ✓ 26 seconds of seamless AI-generated transitions
- ✓ Luxury typography with Berold font
- ✓ Reduced-motion accessibility fallback
- ✓ Responsive design

## Technical Stack

- **Build tool:** Vite
- **Styling:** SCSS
- **Scroll engine:** Vanilla JavaScript
- **Video generation:** Magnific AI (Seedance 2.5 Pro)
- **Resolution:** 720p, 24fps

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

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
