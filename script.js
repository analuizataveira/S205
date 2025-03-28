document.addEventListener('DOMContentLoaded', () => {
    // Função para aplicar o tema
    function applyTheme(theme) {
        document.body.className = theme;
        localStorage.setItem('theme', theme);
    }

    // Função para carregar o tema salvo
    function loadTheme() {
        const savedTheme = localStorage.getItem('theme') || 'root'; // 'root' como padrão
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

    // Configura o botão de alternância de temas
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleThemeMenu);
    }

    // Configura os botões de temas
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

    // Dados dos eventos
    const eventos = [
        {
            id: 1,
            title: 'Semana do Software 2025',
            date: '12/05',
            time: '10:00',
            location: 'Salão de Eventos',
            type: 'tech',
            description: 'Uma semana inteira dedicada à tecnologia e inovação, com palestras, workshops e hackathons.',
            image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800&h=400'
        },
        {
            id: 2,
            title: 'Workshop de IoT',
            date: '12/01',
            time: '08:00',
            location: 'Laboratório CS&I',
            type: 'tech',
            description: 'Workshop prático sobre Internet das Coisas e suas aplicações na indústria 4.0.',
            image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=400'
        },
        {
            id: 3,
            title: 'Festa dos Alunos 2025',
            date: '19/05',
            time: '19:00',
            location: 'Área Esportiva',
            type: 'cultural',
            description: 'Venha comemorar a melhor Festa dos Alunos de todos os tempos!',
            image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800&h=400'
        },
        {
            id: 4,
            title: 'Feira de Oportunidades',
            date: '04/05',
            time: '10:00',
            location: 'Salão de Eventos',
            type: 'academic',
            description: 'Venha conhecer empresas e projetos com destaque na área da engenharia.',
            image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800&h=400'
        }
    ];

    // Preenche o carrossel dinamicamente
    const carousel = document.querySelector('.carousel');
    if (carousel) {
        carousel.innerHTML = ''; // Limpa o conteúdo antigo
        eventos.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('carousel-card');
            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="info">
                    <h3>${event.title}</h3>
                    <p>${event.description}</p>
                    <p>
                        <span class="material-icons-outlined icon">event</span> ${event.date} às ${event.time}
                        <span class="material-icons-outlined icon">pin_drop</span> ${event.location}
                    </p>
                </div>
            `;
            carousel.appendChild(card);
        });

        // Configuração do carrossel
        let currentIndex = 0;
        let autoSlideInterval;

        // Função para atualizar a posição do carrossel
        function updateCarousel() {
            carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        }

        // Função para avançar ao próximo card
        function nextCard() {
            currentIndex = (currentIndex + 1) % eventos.length;
            updateCarousel();
        }

        // Função para voltar ao card anterior
        function prevCard() {
            currentIndex = (currentIndex - 1 + eventos.length) % eventos.length;
            updateCarousel();
        }

        // Função para iniciar a passagem automática
        function startAutoSlide() {
            autoSlideInterval = setInterval(nextCard, 5000); // 5 segundos
        }

        // Função para pausar a passagem automática
        function stopAutoSlide() {
            clearInterval(autoSlideInterval);
        }

        // Botões de navegação
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                stopAutoSlide(); // Pausa ao clicar manualmente
                prevCard();
                startAutoSlide(); // Reinicia após a ação
            });
            nextBtn.addEventListener('click', () => {
                stopAutoSlide(); // Pausa ao clicar manualmente
                nextCard();
                startAutoSlide(); // Reinicia após a ação
            });
        }

        // Pausar ao passar o mouse
        carousel.addEventListener('mouseenter', stopAutoSlide);
        carousel.addEventListener('mouseleave', startAutoSlide);

        // Suporte a arrastar no celular
        let startX;
        carousel.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            stopAutoSlide(); // Pausa ao tocar
        });
        carousel.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            if (startX - endX > 50) nextCard();
            if (endX - startX > 50) prevCard();
            startAutoSlide(); // Reinicia ao soltar
        });

        // Inicializa o carrossel
        updateCarousel();
        startAutoSlide(); // Começa a passagem automática
    }
});