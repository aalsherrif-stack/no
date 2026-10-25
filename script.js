(() => {
  const screens = [...document.querySelectorAll('.screen')];
  const fill = document.getElementById('progressFill');
  const dotsBox = document.getElementById('progressDots');
  let current = 0;

  screens.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot';
    dot.type = 'button';
    dot.setAttribute('aria-label', `الانتقال إلى الصفحة ${i + 1}`);
    dot.addEventListener('click', () => show(i));
    dotsBox.appendChild(dot);
  });
  const dots = [...dotsBox.children];

  function show(index) {
    current = Math.max(0, Math.min(index, screens.length - 1));
    screens.forEach((screen, i) => {
      screen.classList.toggle('active', i === current);
      screen.setAttribute('aria-hidden', i === current ? 'false' : 'true');
    });
    dots.forEach((dot, i) => dot.classList.toggle('active', i === current));
    fill.style.width = `${(current / (screens.length - 1)) * 100}%`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  document.addEventListener('click', event => {
    if (event.target.closest('.next')) show(current + 1);
    if (event.target.closest('.prev')) show(current - 1);
    if (event.target.closest('.restart') || event.target.closest('[data-go="0"]')) {
      event.preventDefault();
      show(0);
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') show(current + 1);
    if (event.key === 'ArrowRight') show(current - 1);
  });

  show(0);
})();