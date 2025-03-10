document.addEventListener('DOMContentLoaded', () => {
    // Função para aplicar o tema
    function applyTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }

    // Função para carregar o tema salvo
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'default';
        applyTheme(savedTheme);
    }

    // Função para abrir/fechar o menu de temas
    function toggleThemeMenu() {
        const themeMenu = document.getElementById('theme-menu');
        if (themeMenu) {
            themeMenu.style.display = themeMenu.style.display === 'flex' ? 'none' : 'flex';
        }
    }

    // Carrega o tema salvo ao abrir a página
    loadTheme();

    // Verifica se os elementos existem antes de adicionar eventos
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleThemeMenu);
    }

    const themeButtons = document.querySelectorAll('.theme-menu button');
    if (themeButtons.length > 0) {
        themeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const theme = button.getAttribute('data-theme');
                applyTheme(theme);
                toggleThemeMenu();
            });
        });
    }
});
