document.addEventListener('mousemove', e => {
  const sparkle = document.createElement('div');
  sparkle.className = 'cursor-sparkle';
  sparkle.style.left = e.pageX + 'px';
  sparkle.style.top = e.pageY + 'px';
  document.body.appendChild(sparkle);
  setTimeout(() => sparkle.remove(), 800);
});
