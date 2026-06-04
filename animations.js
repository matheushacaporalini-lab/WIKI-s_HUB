// ══════════════════════════════════════════
//  animations.js
//  Importar antes do </body> em todas as páginas.
//  Detecta .reveal, .reveal-left e .reveal-scale
//  e adiciona .visible quando entram no viewport.
// ══════════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {

  // Seleciona todos os elementos animáveis
  const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');

  if (!targets.length) return;

  // Agrupa elementos por "linha visual" para o stagger:
  // elementos com o mesmo offsetTop recebem delays escalonados
  const groups = {};
  targets.forEach(el => {
    const top = Math.round(el.getBoundingClientRect().top + window.scrollY);
    const key = Math.floor(top / 60); // agrupa em bandas de 60px
    if (!groups[key]) groups[key] = [];
    groups[key].push(el);
  });

  // Aplica delay escalonado dentro de cada grupo
  Object.values(groups).forEach(group => {
    group.forEach((el, i) => {
      el.dataset.delay = i * 0.07; // 70ms entre cada elemento do grupo
    });
  });

  // Observer: dispara quando 10% do elemento fica visível
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseFloat(entry.target.dataset.delay ?? 0);
        entry.target.style.transitionDelay = `${delay}s`;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // anima só uma vez
      }
    });
  }, {
    threshold: 0.1,       // 10% visível já dispara
    rootMargin: '0px 0px -40px 0px' // margem inferior: evita disparar cedo demais
  });

  targets.forEach(el => observer.observe(el));

});