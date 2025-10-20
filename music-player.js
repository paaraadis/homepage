// Music Player - Simple version
const audio = document.getElementById('audio-player');
const playButtons = document.querySelectorAll('.play-btn');
let currentPlaying = null;

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    
    if (currentPlaying === btn) {
      // Toggle play/pause on same track
      if (!audio.paused) {
        audio.pause();
        btn.textContent = '▶️';
      } else {
        audio.play();
        btn.textContent = '⏸️';
      }
    } else {
      // Play new track
      if (currentPlaying) currentPlaying.textContent = '▶️';
      
      audio.src = src;
      audio.load();
      audio.play();
      btn.textContent = '⏸️';
      currentPlaying = btn;
    }
  });
});

audio.addEventListener('ended', () => {
  if (currentPlaying) currentPlaying.textContent = '▶️';
  currentPlaying = null;
});
