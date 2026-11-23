# Relatório Final de Organização e Otimização — TCC Wiki Hub

Este projeto passou por uma reestruturação completa para garantir escalabilidade, facilidade de manutenção e melhor performance.

## 1. Nova Estrutura de Arquivos
O projeto foi organizado em uma estrutura modular, separando a lógica de apresentação (HTML), estilos (CSS), comportamento (JS) e ativos (Imagens/Ícones).

- **`/` (Raiz):** Contém todos os arquivos HTML do site.
- **`/assets/images/`:** Centraliza todas as imagens (PNG, WebP, JPG) que antes estavam espalhadas.
- **`/assets/icons/`:** Pasta dedicada para ícones e glifos (anteriormente na pasta `wiki`).
- **`/css/`:** Todos os arquivos de estilo foram movidos para cá.
- **`/js/`:** Scripts JavaScript centralizados.

## 2. Otimização de Ativos e Links
Realizamos uma varredura automatizada em todos os 25 arquivos HTML para corrigir as referências de caminhos:

- **Imagens:** Todos os links `src="imagem.png"` foram atualizados para `src="assets/images/imagem.png"`.
- **Estilos:** Links de CSS foram corrigidos para apontar para a pasta `/css/`.
- **Scripts:** Referências de JavaScript agora apontam para a pasta `/js/`.

## 3. Consolidação de CSS e Performance
- **CSS Global (`css/global.css`):** Criamos um arquivo base que contém o Reset, Variáveis de Cores (CSS Variables) e estilos de Header/Footer. Isso evita a repetição de código em cada arquivo de estilo individual.
- **JavaScript Global (`js/main.js`):** Unificamos comportamentos comuns, como a animação de revelação ao rolar a página (Scroll Reveal) e o scroll suave.
- **Limpeza:** Foram removidos arquivos temporários (`.bak`), scripts de configuração local (`.ps1`) e pastas de controle de versão ocultas que aumentavam o tamanho do arquivo final sem necessidade.

## 4. Recomendações de Manutenção
- **Uso de Variáveis:** Ao criar novos estilos, utilize as variáveis definidas em `global.css` (ex: `var(--accent-blue)`) para manter a identidade visual.
- **Novas Imagens:** Sempre salve novas imagens na pasta `assets/images/` para manter a organização.
- **Minificação:** Para o deploy final em produção, recomenda-se minificar os arquivos CSS e JS para reduzir ainda mais o tempo de carregamento.

---
