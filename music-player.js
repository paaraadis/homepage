// Select elements
const playBtn = document.getElementById("play");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const artistSpan = document.querySelector(".artist");
const nameSpan = document.querySelector(".name");
const progressBar = document.querySelector(".progress-bar .bar");
const trackListItems = document.querySelectorAll(".track-list li");

// Initialize
let audio = new Audio();
let currentTrack = 0;
let isPlaying = false;

// Function to load a track
function loadTrack(index) {
  const track = trackListItems[index];
  const src = track.dataset.src;
  audio.src = src;
  artistSpan.textContent = src.split(" – ")[0].split("/").pop();
  nameSpan.textContent = src.split(" – ")[1].split(".")[0];
  updateActiveTrack();
}

// Highlight current track
function updateActiveTrack() {
  trackListItems.forEach((li, i) => {
    if (i === currentTrack) {
      li.style.fontWeight = "bold";
      li.style.color = "deeppink";
    } else {
      li.style.fontWeight = "normal";
      li.style.color = "hotpink";
    }
  });
}

// Play/Pause toggle
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");
  } else {
    audio.play();
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
  }
  isPlaying = !isPlaying;
});

// Next track
nextBtn.addEventListener("click", () => {
  currentTrack = (currentTrack + 1) % trackListItems.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
});

// Previous track
prevBtn.addEventListener("click", () => {
  currentTrack = (currentTrack - 1 + trackListItems.length) % trackListItems.length;
  loadTrack(currentTrack);
  if (isPlaying) audio.play();
});

// Click on track in list
trackListItems.forEach((li, index) => {
  li.addEventListener("click", () => {
    currentTrack = index;
    loadTrack(currentTrack);
    audio.play();
    isPlaying = true;
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
  });
});

// Update progress bar
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progressBar.style.width = percent + "%";
});

// Reset play button when track ends
audio.addEventListener("ended", () => {
  isPlaying = false;
  playBtn.classList.remove("pause");
  playBtn.classList.add("play");
  progressBar.style.width = "0%";
});

// Initial load
loadTrack(currentTrack);
