const audio = document.getElementById('audio');
const buttons = document.querySelectorAll('.play-btn');
let currentTrack = null;

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const li = button.parentElement;
    const track = li.getAttribute('data-src');

    if(currentTrack === track){
      if(!audio.paused){
        audio.pause();
        button.textContent = 'Play';
      } else {
        audio.play();
        button.textContent = 'Pause';
      }
    } else {
      audio.src = track;
      audio.play();
      if(currentTrack){
        const prevBtn = document.querySelector(`.track-list li[data-src="${currentTrack}"] button`);
        if(prevBtn) prevBtn.textContent = 'Play';
      }
      button.textContent = 'Pause';
      currentTrack = track;
    }

    buttons.forEach(b => { if(b !== button) b.textContent = 'Play'; });
  });
});

audio.addEventListener('ended', () => {
  if(currentTrack){
    const btn = document.querySelector(`.track-list li[data-src="${currentTrack}"] button`);
    if(btn) btn.textContent = 'Play';
  }
});
