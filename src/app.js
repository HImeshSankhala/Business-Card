const landing = document.querySelector("#landing");
const arStage = document.querySelector("#ar-stage");
const sceneRoot = document.querySelector("#ar-scene-root");
const startButton = document.querySelector("#start-ar");
const stopButton = document.querySelector("#stop-ar");
const trackingStatus = document.querySelector("#tracking-status");
const compatMessage = document.querySelector("#compat-message");

let scene;

function setTrackingStatus(text) {
  trackingStatus.textContent = text;
}

function showCompatibilityMessage(message) {
  compatMessage.hidden = false;
  compatMessage.textContent = message;
}

function canUseCameraHere() {
  return window.isSecureContext && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === "function";
}

function createArScene() {
  if (scene) {
    return;
  }

  sceneRoot.innerHTML = `
    <a-scene
      id="scene"
      embedded
      vr-mode-ui="enabled: false"
      renderer="antialias: true; alpha: true; colorManagement: true"
      arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
    >
      <a-marker id="hiro-marker" preset="hiro">
        <a-box
          position="0 0.5 0"
          rotation="0 45 0"
          depth="1"
          height="1"
          width="1"
          color="#21d4fd"
          material="roughness: 0.35; metalness: 0.15"
          animation="property: rotation; to: 0 405 0; dur: 2800; easing: linear; loop: true"
        ></a-box>
        <a-plane
          position="0 0 0"
          rotation="-90 0 0"
          width="1.35"
          height="1.35"
          color="#101820"
          opacity="0.45"
        ></a-plane>
      </a-marker>
      <a-entity camera></a-entity>
    </a-scene>
  `;

  scene = sceneRoot.querySelector("#scene");
  const marker = sceneRoot.querySelector("#hiro-marker");

  marker.addEventListener("markerFound", () => {
    setTrackingStatus("Marker locked");
  });

  marker.addEventListener("markerLost", () => {
    setTrackingStatus("Looking for marker");
  });
}

function startAr() {
  if (!canUseCameraHere()) {
    showCompatibilityMessage("Camera access on phones needs HTTPS. Use the GitHub Pages URL or another HTTPS deployment for this test.");
    return;
  }

  landing.hidden = true;
  arStage.classList.add("is-active");
  setTrackingStatus("Looking for marker");
  createArScene();
}

function stopAr() {
  arStage.classList.remove("is-active");
  landing.hidden = false;
  setTrackingStatus("Waiting for camera");
}

startButton.addEventListener("click", startAr);
stopButton.addEventListener("click", stopAr);

if (!canUseCameraHere()) {
  showCompatibilityMessage("This page is not running in a secure browser context. Phone camera access requires HTTPS.");
}
