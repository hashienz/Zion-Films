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
    initMobileMenu();
}

/**
 * Inicializa a biblioteca AOS para as animações de entrada.
 * Este sistema substitui o IntersectionObserver manual.
 */
function initAOS() {
    AOS.init({
        duration: 800, 
        easing: 'ease-in-out', 
        once: true,         
        delay: 100,         
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
        effect: 'coverflow',    
        grabCursor: true,     
        centeredSlides: true,  
        slidesPerView: 'auto',  
        loop: true,            
        
        coverflowEffect: {
            rotate: 0,         
            stretch: 0,         
            depth: 100,       
            modifier: 2,        
            slideShadows: false,
        },

        // Habilita as setas de navegação
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}


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
 * @param {number} scrollY 
 * @param {NodeList} sections 
 * @param {NodeList} navLinks 
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

 * @param {number} scrollY 
 * @param {HTMLElement} backToTopBtn 
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
        
        let currentScroll = window.scrollY || document.documentElement.scrollTop;

        if (currentScroll > 100) { 
            if (currentScroll > lastScrollTop) {
                header.classList.add('header-hidden');
            } else {
                header.classList.remove('header-hidden');
            }
        } else {
            
            header.classList.remove('header-hidden');
        }

        lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
    }, false);
}
function initMobileMenu() {
    const menuBtn = document.querySelector('.menu-hamburger');
    const menuLista = document.querySelector('header nav ul');

    if (!menuBtn || !menuLista) return; 

    
    function toggleMenu(forceClose = false) {
        if (forceClose) {
            menuLista.classList.remove('is-active');
            menuBtn.classList.remove('is-active');
        } else { // Senão, alterna as classes
            menuLista.classList.toggle('is-active');
            menuBtn.classList.toggle('is-active');
        }
    }

   
    menuBtn.addEventListener('click', (e) => {
        e.stopPropagation(); 
        toggleMenu();
    });

    // Evento para fechar ao clicar em um LINK
    menuLista.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu(true); 
        });
    });

    // Evento para fechar ao clicar FORA do menu
    document.addEventListener('click', (e) => {
        if (menuLista.classList.contains('is-active') && !menuLista.contains(e.target)) {
            toggleMenu(true); 
        }
    });

    menuLista.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}