// Music Player with debugging
const audio = document.getElementById('audio-player');
const playButtons = document.querySelectorAll('.play-btn');
let currentPlaying = null;

console.log('Music player loaded');
console.log('Found buttons:', playButtons.length);
console.log('Audio element:', audio);

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    console.log('Button clicked! Trying to play:', src);
    
    if (currentPlaying === btn) {
      if (!audio.paused) {
        audio.pause();
        btn.textContent = '▶️';
        console.log('Paused');
      } else {
        audio.play().then(() => {
          console.log('Playing resumed');
        }).catch(err => {
          console.error('Play error:', err);
        });
        btn.textContent = '⏸️';
      }
    } else {
      if (currentPlaying) currentPlaying.textContent = '▶️';
      audio.src = src;
      console.log('Audio source set to:', audio.src);
      
      audio.play().then(() => {
        console.log('Started playing successfully');
      }).catch(err => {
        console.error('Failed to play:', err);
      });
      
      btn.textContent = '⏸️';
      currentPlaying = btn;
    }
  });
});

audio.addEventListener('ended', () => {
  if (currentPlaying) currentPlaying.textContent = '▶️';
  currentPlaying = null;
});

audio.addEventListener('error', (e) => {
  console.error('Audio loading error:', e);
  console.error('Current source:', audio.src);
  console.error('Error code:', audio.error ? audio.error.code : 'unknown');
});
