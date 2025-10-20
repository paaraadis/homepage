// Music Player with Error Handling
const audio = document.getElementById('audio-player');
const playButtons = document.querySelectorAll('.play-btn');
let currentPlaying = null;

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    
    console.log('Attempting to play:', src); // Debug log
    
    if (currentPlaying === btn) {
      // Toggle play/pause
      if (!audio.paused) {
        audio.pause();
        btn.textContent = '▶️';
      } else {
        audio.play().catch(err => {
          console.error('Playback error:', err);
          alert('Could not play audio. Check console for details.');
        });
        btn.textContent = '⏸️';
      }
    } else {
      // Pause previous
      if (currentPlaying) currentPlaying.textContent = '▶️';
      audio.src = src;
      audio.play().catch(err => {
        console.error('Playback error:', err);
        alert('Could not load audio file: ' + src);
      });
      btn.textContent = '⏸️';
      currentPlaying = btn;
    }
  });
});

// When audio ends, reset button
audio.addEventListener('ended', () => {
  if (currentPlaying) currentPlaying.textContent = '▶️';
  currentPlaying = null;
});

// Error handling
audio.addEventListener('error', (e) => {
  console.error('Audio error:', e);
  console.error('Failed to load:', audio.src);
  if (currentPlaying) currentPlaying.textContent = '▶️';
  currentPlaying = null;
});
```
