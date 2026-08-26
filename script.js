(() => {
  const nav = document.querySelector('#siteNav');
  const menuButton = document.querySelector('#menuButton');
  const mobilePanel = document.querySelector('#mobilePanel');

  const updateNav = () => nav?.classList.toggle('scrolled', window.scrollY > 28);
  updateNav();
  window.addEventListener('scroll', updateNav, { passive: true });

  menuButton?.addEventListener('click', () => {
    const open = menuButton.classList.toggle('open');
    mobilePanel?.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
  });

  mobilePanel?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    menuButton?.classList.remove('open');
    mobilePanel.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  document.querySelectorAll('.faq').forEach((item) => {
    item.addEventListener('toggle', () => {
      if (!item.open) return;
      document.querySelectorAll('.faq[open]').forEach((openItem) => {
        if (openItem !== item) openItem.removeAttribute('open');
      });
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal:not(.visible)').forEach((el) => observer.observe(el));
})();
