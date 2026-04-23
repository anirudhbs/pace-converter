import "./css/styles.css";

const distances = [0.2, 0.4, 0.8, 1, 1.6, 5, 10, 21.1, 42.2];

function parseTime(value) {
  if (!value) return null;
  const parts = value.split(":").map(Number);
  if (parts.length === 1) return parts[0] * 60;
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  return parts[0] * 3600 + parts[1] * 60 + parts[2];
}

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

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  console.log(`Minutes: ${minutes}, Seconds: ${seconds}`);
});
