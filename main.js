/**
 * Dental Alianca - Core Engineering Engine
 * Intelligent Responsiveness & Performance Management
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Device & Platform Perception
    const body = document.body;
    
    const updatePlatformState = () => {
        const width = window.innerWidth;
        body.classList.remove('is-mobile', 'is-tablet', 'is-desktop');
        
        if (width <= 768) {
            body.classList.add('is-mobile');
        } else if (width <= 1024) {
            body.classList.add('is-tablet');
        } else {
            body.classList.add('is-desktop');
        }
        
        console.log(`Platform Context Updated: ${width}px | Mobile: ${body.classList.contains('is-mobile')}`);
    };

    window.addEventListener('resize', updatePlatformState);
    updatePlatformState();

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) body.classList.add('touch-device');

    // 2. Mobile Menu Management
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.querySelector('.nav-links');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            body.classList.toggle('menu-open');
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.classList.remove('menu-open');
            });
        });
    }

    // 2. Preloader Lifecycle Management
    window.addEventListener('load', () => {
        const preloader = document.getElementById('preloader');
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.classList.remove('loading');
            
            // Trigger initial reveals after preloader is gone
            setTimeout(revealOnScroll, 500);
        }, 1200); // Premium padding duration
    });

    // 3. High-Performance Reveal Engine (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stagger children for premium flow
                const staggers = entry.target.querySelectorAll('.stagger-item');
                staggers.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                    }, index * 100);
                });
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    const revealOnScroll = () => {
        revealElements.forEach(el => revealObserver.observe(el));
    };

    // 4. Intelligent Navigation Behavior
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Dynamic background
        if (currentScroll > 50) {
            header.style.padding = '5px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.padding = '0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.72)';
        }

        // Show/Hide header on scroll (Mobile Optimization)
        if (isMobile && currentScroll > 500) {
            if (currentScroll > lastScroll) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        }
        
        lastScroll = currentScroll;
    }, { passive: true });

    // 5. Smooth Contextual Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const headerOffset = 64;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Intelligent WhatsApp Link Adjustment
    // If on mobile, ensure direct app opening, on desktop use web.whatsapp if needed
    // (Note: wa.me already handles this gracefully, but we could add logging/trackers here)
    // 7. Subtle Parallax for Hero
    const heroImage = document.querySelector('.hero-image');
    window.addEventListener('scroll', () => {
        const scroll = window.pageYOffset;
        if (heroImage && !isTouchDevice && window.innerWidth > 900) {
            heroImage.style.transform = `translateY(${scroll * 0.12}px)`;
        }
    }, { passive: true });

    console.log(`Dental Alianca Engine Active | Device: ${isMobile ? 'Mobile' : 'Desktop'} | Touch: ${isTouchDevice}`);
});
