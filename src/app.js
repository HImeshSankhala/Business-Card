const landing = document.querySelector("#landing");
const arStage = document.querySelector("#ar-stage");
const startButton = document.querySelector("#start-ar");
const stopButton = document.querySelector("#stop-ar");
const marker = document.querySelector("#hiro-marker");
const trackingStatus = document.querySelector("#tracking-status");

function setTrackingStatus(text) {
  trackingStatus.textContent = text;
}

function startAr() {
  landing.hidden = true;
  arStage.classList.add("is-active");
  setTrackingStatus("Looking for marker");
}

function stopAr() {
  arStage.classList.remove("is-active");
  landing.hidden = false;
  setTrackingStatus("Waiting for camera");
}

startButton.addEventListener("click", startAr);
stopButton.addEventListener("click", stopAr);

marker.addEventListener("markerFound", () => {
  setTrackingStatus("Marker locked");
});

marker.addEventListener("markerLost", () => {
  setTrackingStatus("Looking for marker");
});
