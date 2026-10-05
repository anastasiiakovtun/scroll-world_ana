# Video asset

Place the prepared, silent master video here with this exact filename:

`lheure-bleue-master.mp4`

The page is wired to `video/lheure-bleue-master.mp4`. The current committed master is a silent H.264 file at 2560×1440, 30fps, approximately 25.23 seconds. If replacing it later, remove only the audio stream without re-encoding the video:

```bash
ffmpeg -i input.mp4 -c copy -an lheure-bleue-master.mp4
```

Optional poster:

`final-arrangement.jpg`
