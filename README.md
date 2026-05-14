# AR Business Card

First MVP for an AR business card experience.

The goal of this attempt is small and testable: open a mobile web page, point the camera at a marker pattern, and show a rotating cube anchored to the marker.

## Run Locally

Use the included dependency-free static server from this folder.

```powershell
node tools/static-server.mjs 5173
```

Then open:

```text
http://localhost:5173
```

For phone testing on the same Wi-Fi, use the `Phone URL on same Wi-Fi` printed by the server, for example:

```text
http://192.168.0.104:5173
```

If your phone cannot reach that URL, check that both devices are on the same Wi-Fi and allow Node.js through Windows Firewall for private networks.

For final phone camera testing, host the folder over HTTPS or deploy it to GitHub Pages, Netlify, Vercel, or Cloudflare Pages. Camera access on phones usually requires HTTPS.

## Test Marker

Open:

```text
http://localhost:5173/marker.html
```

Print that page or show it on another device. In the AR page, tap **Start camera** and point the camera at the marker.

## Current Scope

- Static HTML/CSS/JS
- AR.js marker tracking
- A-Frame scene
- Hiro marker
- Rotating cube anchored to the marker

## Next Step

Once the cube locks reliably to the marker on real phones, replace the Hiro marker with a custom business-card marker and replace the cube with a character model.
