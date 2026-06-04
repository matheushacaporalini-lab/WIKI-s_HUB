document.addEventListener('DOMContentLoaded', () => {
    const bgOverlay = document.getElementById('bg-overlay');
    const cards = document.querySelectorAll('.game-card');

    // Dicionário com os caminhos das imagens locais
    // Formato: url("nome_do_arquivo.extensao")
    const backgrounds = {
        'slime-rancher': 'url("banner_slime.webp")',
        'cassette-beasts': 'url("banner_cass.png")',
        'gta-v': 'url("banne_gta-v.jpg")',
        'hogwarts-legacy': 'url("banne_hogwarts-legacy.jpg")',
        'pathologic-2': 'url("banne_pathologic-2.jpg")'
    };

    cards.forEach(card => {
        // Quando o mouse entra no card
        card.addEventListener('mouseenter', () => {
            const bgImage = backgrounds[card.id];
            if (bgImage) {
                bgOverlay.style.backgroundImage = bgImage;
            }
        });

        // Quando o mouse sai do card, volta para o fundo escuro
        card.addEventListener('mouseleave', () => {
            bgOverlay.style.backgroundImage = 'none'; 
        });
    });
});