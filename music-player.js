// Music Player
const audio = document.getElementById('audio-player');
const playButtons = document.querySelectorAll('.play-btn');
let currentPlaying = null;

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');

    if (currentPlaying === btn) {
      // Toggle play/pause
      if (!audio.paused) {
        audio.pause();
        btn.textContent = '▶️';
      } else {
        audio.play();
        btn.textContent = '⏸️';
      }
    } else {
      // Pause previous
      if (currentPlaying) currentPlaying.textContent = '▶️';

      audio.src = src;
      audio.play();
      btn.textContent = '⏸️';
      currentPlaying = btn;
    }

    // When audio ends, reset button
    audio.onended = () => {
      if (currentPlaying) currentPlaying.textContent = '▶️';
      currentPlaying = null;
    };
  });
});
