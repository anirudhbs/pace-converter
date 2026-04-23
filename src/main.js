import "./css/styles.css";

const distances = [0.2, 0.4, 0.8, 1, 1.6, 5, 10, 21.1, 42.2];

function formatTime(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = Math.round(totalSeconds % 60);
  if (h > 0)
    return `${h}:${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const form = document.getElementById("pace-form");
const minutesInput = document.getElementById("minutes-input");
const secondsInput = document.getElementById("seconds-input");
const distanceSelect = document.getElementById("distance-select");
const paceLabel = document.getElementById("pace-label");
const timeCells = Array.from(document.querySelectorAll("[id^=time-]"));

const kmConversions = {
  km: 1,
  mile: 1.60934,
  5: 5,
  10: 10,
  21.1: 21.1,
  42.2: 42.2,
};

distanceSelect.addEventListener("change", () => {
  paceLabel.textContent = distanceSelect.options[distanceSelect.selectedIndex].text;
});

distanceSelect.dispatchEvent(new Event("change"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  const pace = minutes * 60 + seconds;
  const distanceUnit = distanceSelect.value;
  const distanceKm = kmConversions[distanceUnit];
  const pacePerKm = pace / distanceKm;
  timeCells.forEach((cell, i) => {
    const totalSeconds = pacePerKm * distances[i];
    cell.textContent = formatTime(totalSeconds);
  });
});

if ("serviceWorker" in navigator && window.location.hostname !== "localhost") {
  navigator.serviceWorker.register("/static/sw.js");
}