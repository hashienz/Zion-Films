/**
 * @file Script principal para o site
 * @description Inicializa todas as bibliotecas e funcionalidades interativas do site.
 * @version 2.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
    main();
});

function main() {
    initAOS();
    initGLightbox();
    initSwiper();
    initSmoothScroll();
    initScrollBasedFeatures();
    initAutoHideHeader();
    initMobileMenu();
    initServicosInteractiveCards();
    initServicosObserver();
    initServicosCTA();
}


function initAOS() {
    AOS.init({
        duration: 800, 
        easing: 'ease-in-out', 
        once: true,         
        delay: 100,         
    });
}


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

    function initServicosInteractiveCards() {   
    const cards = document.querySelectorAll('.servico-card');

    // Desativa em dispositivos touch (performance + UX)
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        return;
    }

    cards.forEach(card => {
        const bg = card.querySelector('.servico-bg');
        const icon = card.querySelector('.servico-icon-bg');

        if (!bg || !icon) return;

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const moveX = (x / rect.width - 0.5) * 20;
            const moveY = (y / rect.height - 0.5) * 20;

            bg.style.transform = `translate(${moveX}px, ${moveY}px)`;
            icon.style.transform = `
                translate(-50%, -50%)
                translate(${moveX * 0.6}px, ${moveY * 0.6}px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            bg.style.transform = '';
            icon.style.transform = 'translate(-50%, -50%)';
        });
    });
}

function initServicosObserver() {
    const cards = document.querySelectorAll('.servico-card');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.4 });

    cards.forEach(card => observer.observe(card));
}
function initServicosCTA() {
    const ctas = document.querySelectorAll('.servico-cta[data-scroll]');

    ctas.forEach(cta => {
        cta.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            const target = cta.getAttribute('data-scroll');
            const section = document.querySelector(target);

            if (!section) return;

            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });
}