document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.game-card-link');
    const layers = document.querySelectorAll('.game-background-layer');
    const backgrounds = {
        'slime-rancher': 'assets/images/banner_slime2.png',
        'cassette-beasts': 'assets/images/banner_cass.webp',
        'gta-v': 'assets/images/GTA5_logo.webp',
        'inazuma-eleven': 'assets/images/banne_inazuma-eleven.jpg',
        'pathologic-2': 'assets/images/banner_pathologic.jpg'
    };
    let activeLayer = -1;
    let activeImage = '';
    let transitionId = 0;
    let clearTimer;

    function showBackground(card) {
        clearTimeout(clearTimer);
        const game = card.querySelector('.game-card');
        const image = game && backgrounds[game.id];
        if (!image) return;

        const imageUrl = new URL(image, document.baseURI).href;
        if (imageUrl === activeImage) return;

        const nextLayerIndex = activeLayer === 0 ? 1 : 0;
        const nextLayer = layers[nextLayerIndex];
        const previousLayer = activeLayer >= 0 ? layers[activeLayer] : null;
        const currentTransition = ++transitionId;

        nextLayer.style.backgroundImage =
            'linear-gradient(rgba(10, 10, 10, 0.62), rgba(20, 20, 20, 0.72)), url("' + imageUrl + '")';

        requestAnimationFrame(() => {
            if (currentTransition !== transitionId) return;
            nextLayer.classList.add('is-visible');
            if (previousLayer) previousLayer.classList.remove('is-visible');
            activeLayer = nextLayerIndex;
            activeImage = imageUrl;
        });
    }

    function clearBackground() {
        transitionId++;
        layers.forEach(layer => layer.classList.remove('is-visible'));
        activeLayer = -1;
        activeImage = '';
    }

    function scheduleBackgroundClear() {
        clearTimeout(clearTimer);
        clearTimer = setTimeout(clearBackground, 120);
    }

    cards.forEach(card => {
        card.addEventListener('mouseenter', () => showBackground(card));
        card.addEventListener('mouseleave', scheduleBackgroundClear);
        card.addEventListener('focus', () => showBackground(card));
        card.addEventListener('blur', scheduleBackgroundClear);
    });
});
