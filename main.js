/**
 * Dental Alianca - Core Engineering Engine
 * Intelligent Responsiveness & Performance Management
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intelligent Device Perception
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isMobile = window.innerWidth <= 768;
    
    if (isTouchDevice) {
        document.body.classList.add('touch-device');
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
                // Once revealed, no need to observe anymore
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
    console.log(`Dental Alianca Engine Active | Device: ${isMobile ? 'Mobile' : 'Desktop'} | Touch: ${isTouchDevice}`);
});
