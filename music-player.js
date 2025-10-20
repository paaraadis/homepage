// Music Player with better format support
const audio = document.getElementById('audio-player');
const audioSource = document.getElementById('audio-source');
const playButtons = document.querySelectorAll('.play-btn');
let currentPlaying = null;

console.log('Music player loaded');

playButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const src = btn.getAttribute('data-src');
    console.log('Button clicked! Trying to play:', src);
    
    // Determine file type
    const fileType = src.endsWith('.m4a') ? 'audio/mp4' : 'audio/mpeg';
    
    if (currentPlaying === btn) {
      if (!audio.paused) {
        audio.pause();
        btn.textContent = '▶️';
      } else {
        audio.play().catch(err => console.error('Play error:', err));
        btn.textContent = '⏸️';
      }
    } else {
      if (currentPlaying) currentPlaying.textContent = '▶️';
      
      // Set source properly
      audioSource.src = src;
      audioSource.type = fileType;
      audio.load();
      
      audio.play().then(() => {
        console.log('Playing:', src);
        btn.textContent = '⏸️';
        currentPlaying = btn;
      }).catch(err => {
        console.error('Failed to play:', err);
        alert('Could not play this file. Try converting to MP3.');
      });
    }
  });
});

audio.addEventListener('ended', () => {
  if (currentPlaying) currentPlaying.textContent = '▶️';
  currentPlaying = null;
});
