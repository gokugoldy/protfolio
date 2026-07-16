// --- GLOBALS & SETUP ---
gsap.registerPlugin(ScrollTrigger);

// --- 1. LOADER & INITIALIZATION ---
window.addEventListener('load', () => {
    const loaderBar = document.querySelector('.loader-bar');
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    // Simulate loading progress
    gsap.to(loaderBar, {
        width: '100%',
        duration: 1.5,
        ease: 'power2.inOut',
        onComplete: () => {
            gsap.to(loaderWrapper, {
                yPercent: -100,
                duration: 0.8,
                ease: 'power3.inOut',
                onComplete: initAnimations // Start page animations after loader is gone
            });
        }
    });
});

// --- 2. CUSTOM CURSOR & HOVER EFFECTS ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if(window.innerWidth > 1024) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
        
        // Slight delay for the outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 100, fill: "forwards" });
    });

    const hoverables = document.querySelectorAll('a, button, .hover-float, .project-card, .faq-question');
    hoverables.forEach(el => {
        el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
    });
}

// --- 3. THEME TOGGLE (Dark/Light) ---
const themeToggle = document.getElementById('themeToggle');
const htmlTag = document.documentElement;
const themeIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
    if(htmlTag.getAttribute('data-theme') === 'dark') {
        htmlTag.setAttribute('data-theme', 'light');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    } else {
        htmlTag.setAttribute('data-theme', 'dark');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
});

// --- 4. NAVIGATION & SCROLL PROGRESS ---
const navbar = document.getElementById('navbar');
const progressBar = document.querySelector('.scroll-progress');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    // Back to top button
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if (navLinksContainer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// Active Link Highlighting
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- 5. TYPING ANIMATION ---
const typed = new Typed('.typed-text', {
    strings: ['Front-End Developer', 'UI/UX Enthusiast', 'Digital Creator'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true
});

// --- 6. PARTICLES.JS BACKGROUND ---
const isMobile = window.innerWidth <= 768;
particlesJS("particles-js", {
    particles: {
        number: { value: isMobile ? 20 : 50, density: { enable: true, value_area: 800 } },
        color: { value: "#14B8A6" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#3B82F6", opacity: 0.3, width: 1 },
        move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: { onhover: { enable: true, mode: "grab" }, onclick: { enable: true, mode: "push" }, resize: true },
        modes: { grab: { distance: 140, line_linked: { opacity: 1 } }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// --- 7. GSAP SCROLL REVEALS & ANIMATIONS ---
function initAnimations() {
    
    // Reveal Elements on Scroll
    gsap.utils.toArray('.reveal').forEach((el) => {
        const delay = el.getAttribute('data-delay') || 0;
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            delay: Number(delay),
            ease: 'power3.out'
        });
    });

    // Skill Bars Animation
    gsap.utils.toArray('.skill-bar-fill').forEach(bar => {
        gsap.to(bar, {
            scrollTrigger: {
                trigger: '#skills',
                start: "top 70%"
            },
            width: bar.getAttribute('data-width'),
            duration: 1.5,
            ease: 'power3.out'
        });
    });

    let mm = gsap.matchMedia();
    
    mm.add("(min-width: 1025px)", () => {
        // Parallax Hero Elements (Desktop Only)
        gsap.to('.hero-parallax-bg', {
            yPercent: 30,
            ease: "none",
            scrollTrigger: {
                trigger: ".hero-section",
                start: "top top",
                end: "bottom top",
                scrub: true
            }
        });

        gsap.utils.toArray('[data-speed]').forEach(layer => {
            const speed = layer.getAttribute('data-speed');
            gsap.to(layer, {
                y: (i, target) => -ScrollTrigger.maxScroll(window) * target.dataset.speed * 0.1,
                ease: "none",
                scrollTrigger: {
                    trigger: ".hero-section",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
    });

    // Animate Counters
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        
        ScrollTrigger.create({
            trigger: counter,
            start: "top 90%",
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    snap: { innerHTML: 1 },
                    ease: "power2.out"
                });
            }
        });
    });
}

// --- 8. RIPPLE EFFECT ON BUTTONS ---
const rippleBtns = document.querySelectorAll('.ripple-btn');
rippleBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        let ripples = document.createElement('span');
        ripples.classList.add('ripple');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        
        this.appendChild(ripples);
        setTimeout(() => ripples.remove(), 600);
    });
});

// --- 9. FAQ ACCORDION ---
const faqItems = document.querySelectorAll('.faq-question');
faqItems.forEach(item => {
    item.addEventListener('click', () => {
        item.classList.toggle('active');
        const answer = item.nextElementSibling;
        if (item.classList.contains('active')) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});

// --- 10. PROJECT POPUP MODAL ---
const modal = document.getElementById('projectModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const closeBtn = document.querySelector('.close-modal');

document.querySelectorAll('.popup-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
        e.preventDefault();
        modalImg.src = trigger.getAttribute('data-img');
        modalTitle.textContent = trigger.getAttribute('data-title');
        modalDesc.textContent = trigger.getAttribute('data-desc');
        modal.style.display = 'flex';
        gsap.from('.modal-content', { scale: 0.8, opacity: 0, duration: 0.3, ease: 'back.out(1.7)' });
    });
});

closeBtn.addEventListener('click', () => {
    gsap.to('.modal-content', { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => { modal.style.display = 'none'; } });
});

document.querySelector('.modal-backdrop').addEventListener('click', () => {
    gsap.to('.modal-content', { scale: 0.8, opacity: 0, duration: 0.3, onComplete: () => { modal.style.display = 'none'; } });
});
