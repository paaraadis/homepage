// Cursor sparkle
document.addEventListener('mousemove', e => {
  const sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';
  sparkle.style.left = e.pageX + 'px';
  sparkle.style.top = e.pageY + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 700);
});

// Music Player
const audio = document.getElementById('audio-player');
const buttons = document.querySelectorAll('.track button');
let currentBtn = null;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const song = btn.dataset.song;
    if(currentBtn && currentBtn !== btn) currentBtn.textContent = '▶';
    if(audio.src.includes(song) && !audio.paused){
      audio.pause();
      btn.textContent = '▶';
    } else {
      audio.src = song;
      audio.play();
      btn.textContent = '⏸';
      currentBtn = btn;
    }
  });
});

audio.addEventListener('ended', () => {
  if(currentBtn) currentBtn.textContent = '▶';
});
