# QA Checklist: Cube On Marker MVP

## Goal

Verify that the MVP can open the camera, detect the marker, and render a cube anchored to the marker.

## Local Smoke Test

1. Start a static server from the project root.
2. Open `http://localhost:5173`.
3. Confirm the landing screen renders.
4. Open `http://localhost:5173/marker.html` in another tab or device.
5. Tap **Start camera**.
6. Confirm the browser asks for camera permission.
7. Allow camera permission.
8. Point the camera at the Hiro marker.
9. Confirm the status changes to `Marker locked`.
10. Confirm a rotating blue cube appears on top of the marker.
11. Move the marker out of frame.
12. Confirm the status returns to `Looking for marker`.

## Device Matrix

- Android Chrome
- Android Edge
- iPhone Safari
- iPhone Chrome
- Desktop Chrome with webcam

## Failure Modes To Watch

- Browser blocks camera because the page is not served from HTTPS or localhost.
- Marker image does not load because the device has no internet.
- Low light, glare, or blurred marker prevents tracking.
- iOS Safari asks for permission but shows a black camera feed.
- Cube appears but jumps heavily because the marker is too small or angled.
- AR.js CDN fails to load.

## Pass Criteria

- Page loads without visible JavaScript errors.
- Camera permission flow appears.
- Camera feed starts.
- Marker detection works.
- Cube stays visually attached to the marker while the marker is in frame.
- Exit button returns to the landing screen.
