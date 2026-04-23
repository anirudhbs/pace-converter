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
const timeCells = Array.from(document.querySelectorAll("[id^=time-]"));

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const minutes = parseInt(minutesInput.value) || 0;
  const seconds = parseInt(secondsInput.value) || 0;
  const pacePerKm = minutes * 60 + seconds;
  timeCells.forEach((cell, i) => {
    const totalSeconds = pacePerKm * distances[i];
    cell.textContent = formatTime(totalSeconds);
  });
});
