# L'Heure Bleue — Scroll Experience

## Project Brief

An immersive scroll-controlled journey for Guerlain's L'Heure Bleue, where scroll position controls video playback through a continuous visual story.

### Concept
Scale-reversal journey: An ordinary puddle reflection becomes an immense blue world. The viewer moves through an iris at macro scale, recognizes the flower, and returns to reveal one real iris beside the L'Heure Bleue bottle.

### Structure
- **Scene 1:** Opening puddle with reflection
- **Transition 1:** Puddle → Sky (5s)
- **Transition 2:** Sky → Iris entry (4s + 4s)
- **Scene 2:** Iris macro journey
- **Transition 3:** Iris journey with reveal (8.87s)
- **Transition 4:** Final scale reveal (4s)
- **Scene 3:** Complete arrangement

**Total video:** ~26 seconds of continuous transitions

### Visual Direction
- **Palette:** Muted indigo-blue (#28427A to #446F91), pale sky (#B3C6D1), deep night blue (#0B1424)
- **Lighting:** Soft blue-hour skylight, restrained warmth on glass and gold lettering
- **Materials:** Wet charcoal paving, shallow still water, muted indigo iris petals, blue glass bottle
- **Mood:** Luxurious, dreamlike, premium, restrained

### Technical Approach
- **Stack:** Vite + Vanilla JS + SCSS
- **Video:** Single 26s master file, scroll-scrubbed
- **Font:** Berold (luxury serif)
- **Scroll engine:** Forward/backward playback mapped to scroll position
- **Accessibility:** Reduced-motion fallback required

### Video Generation
- **Tool:** Magnific AI (Seedance 2.5 Pro)
- **Method:** First/last-frame keyframe matching
- **Resolution:** 720p (1280×720, 24fps)
- **Testing:** Extensive transition testing to eliminate slideshow effects

### Deliverables
- GitHub repository with commit history
- Live deployed website
- Scroll-controlled video experience
- Student credit and AI disclosure
