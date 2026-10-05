# Video asset

Place the prepared, silent master video here with this exact filename:

`lheure-bleue-master.mp4`

The page is already wired to `/video/lheure-bleue-master.mp4`. Do not commit the video until the final media choice is confirmed. If the source still contains audio, remove only the audio stream without re-encoding the video:

```bash
ffmpeg -i input.mp4 -c copy -an lheure-bleue-master.mp4
```

Optional poster:

`final-arrangement.jpg`
