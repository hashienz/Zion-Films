/**
 * @file Script principal para o site
 * @description Inicializa todas as bibliotecas e funcionalidades interativas do site.
 * @version 2.0.0
 */

// Adiciona um listener que espera todo o conteúdo HTML da página ser carregado antes de executar o JavaScript.
// Isso evita erros de scripts tentando manipular elementos que ainda não existem.
document.addEventListener('DOMContentLoaded', () => {
    main();
});

/**
 * Função principal que orquestra a inicialização de todas as funcionalidades do site.
 */
function main() {
    initAOS();
    initGLightbox();
    initSwiper();
    initSmoothScroll();
    initScrollBasedFeatures();
    initAutoHideHeader();
}

/**
 * Inicializa a biblioteca AOS para as animações de entrada.
 * Este sistema substitui o IntersectionObserver manual.
 */
function initAOS() {
    AOS.init({
        duration: 800,      // Duração da animação em milissegundos
        easing: 'ease-in-out', // Curva de aceleração da animação
        once: true,         // A animação acontece apenas uma vez por elemento
        delay: 100,         // Atraso geral para o início da animação
    });
}


/**
 * Inicializa a biblioteca GLightbox para criar a galeria de vídeos em tela cheia.
 */
function initGLightbox() {
    const lightbox = GLightbox({
        loop: true,
        // Evento que é disparado toda vez que um slide é aberto
        onOpen: () => {
            // Pega o elemento que disparou o lightbox (o nosso link <a>)
            const triggerElement = lightbox.getActiveSlide().trigger;
            
            // Verifica se o link tem o nosso 'data-format="vertical"'
            // if (triggerElement && triggerElement.dataset.format === 'vertical') {
            //     // Adicionamos a classe ao modal principal da galeria
            //     document.querySelector('.g-modal').classList.add('vertical-mode');
            // }
        },
        // Evento que é disparado antes de fechar o slide
        // onClose: () => {
        //     // Removemos a classe para que não afete o próximo vídeo se ele for horizontal
        //     document.querySelector('.g-modal').classList.remove('vertical-mode');
        // }
    });
}


/**
 * Inicializa a biblioteca Swiper.js para o carrossel de portfólio.
 */
function initSwiper() {
    const swiper = new Swiper('.portfolio-slider', {
        effect: 'coverflow',    // Efeito de transição dos slides
        grabCursor: true,       // Mostra um ícone de "mão" para indicar que é arrastável
        centeredSlides: true,   // O slide ativo fica sempre no centro
        slidesPerView: 'auto',  // A largura do slide é definida pelo CSS, permitindo ver os vizinhos
        loop: true,             // Navegação infinita (volta para o início após o último slide)
        
        coverflowEffect: {
            rotate: 0,          // Rotação dos slides laterais
            stretch: 0,         // Alongamento dos slides laterais
            depth: 100,         // Profundidade (efeito 3D)
            modifier: 2,        // Multiplicador do efeito
            slideShadows: false,// Desativa as sombras padrão do Swiper
        },

        // Habilita as setas de navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}


/**
 * Configura a rolagem suave ao clicar nos links do menu de navegação.
 * Esta função é opcional se o `scroll-behavior: smooth` no CSS for suficiente,
 */
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
}


/**
 * Inicializa todas as funcionalidades que dependem da posição de rolagem da página.
 * Agrupa a lógica do menu ativo e do botão "Voltar ao Topo" em um único listener
 * para melhor performance.
 */
function initScrollBasedFeatures() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('nav a');
    const backToTopBtn = document.getElementById('back-to-top');

    if (!backToTopBtn) return; // Encerra a função se o botão não for encontrado

    // Adiciona o evento de clique para o botão "Voltar ao Topo"
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Adiciona o listener de scroll para o menu e o botão
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        updateActiveNavLink(scrollY, sections, navLinks);
        toggleBackToTopButton(scrollY, backToTopBtn);
    });
}


/**
 * Atualiza qual link do menu está com a classe 'active' com base na posição do scroll.
 * @param {number} scrollY - A posição atual do scroll vertical.
 * @param {NodeList} sections - A lista de elementos de seção.
 * @param {NodeList} navLinks - A lista de links da navegação.
 */
function updateActiveNavLink(scrollY, sections, navLinks) {
    let currentSectionId = '';

    sections.forEach(section => {
        // O valor 80 compensa a altura do header fixo, trocando o 'active' no momento certo.
        const sectionTop = section.offsetTop - 80; 
        if (scrollY >= sectionTop) {
            currentSectionId = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // Adiciona a classe 'active' se o href do link corresponder à seção atual
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
}


/**
 * Mostra ou esconde o botão "Voltar ao Topo" com base na posição do scroll.
 * @param {number} scrollY - A posição atual do scroll vertical.
 * @param {HTMLElement} backToTopBtn - O elemento do botão.
 */
function toggleBackToTopButton(scrollY, backToTopBtn) {
    if (scrollY > 500) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
}
function initAutoHideHeader() {
    // Pega o elemento do cabeçalho
    const header = document.querySelector('header');
    if (!header) return; 

    let lastScrollTop = 0; 

    window.addEventListener('scroll', function() {
        // Pega a posição atual do scroll vertical
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        // Condição para só ativar o efeito após rolar um pouco para baixo
        if (currentScroll > 100) { 
            if (currentScroll > lastScrollTop) {
                // Rolando para BAIXO: esconde o header
                header.classList.add('header-hidden');
            } else {
                // Rolando para CIMA: mostra o header
                header.classList.remove('header-hidden');
            }
        } else {
            // Se estiver perto do topo, sempre mostra o header
            header.classList.remove('header-hidden');
        }

        // Atualiza a última posição do scroll para a próxima verificação
        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
}