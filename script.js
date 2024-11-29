// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        try {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (!target) throw new Error('Target element not found');
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } catch (error) {
            console.error('An error occurred:', error);
        }
    });
});

// Performance optimization
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Error handling
const handleError = (error) => {
    console.error('An error occurred:', error);
};

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'var(--shadow)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = 'var(--shadow-lg)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Add animation classes to elements
document.querySelectorAll('.feature-card, .audience-card, .testimonial-card, .pricing-card').forEach(card => {
    card.classList.add('fade-up');
});

// Add smooth reveal animations
const fadeUpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-up-show');
            fadeUpObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '50px'
});

document.querySelectorAll('.fade-up').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    fadeUpObserver.observe(el);
});

// Add hover effects to cards
document.querySelectorAll('.feature-card, .pricing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Enhance scroll animations
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                entry.target.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                sectionObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });
    
    sectionObserver.observe(section);
});

// Add magnetic effect to CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const deltaX = (x - centerX) / centerX;
        const deltaY = (y - centerY) / centerY;
        
        button.style.transform = `translate(${deltaX * 5}px, ${deltaY * 5}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// Advanced Mouse Tracking
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.feature-card, .pricing-card');
    
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // Update CSS Variables for gradient effect
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        
        // 3D rotation effect
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.02, 1.02, 1.02)
        `;
    };
    
    const handleMouseLeave = (card) => {
        card.style.transform = '';
    };
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', () => handleMouseLeave(card));
    });
});

// Smooth Parallax Scrolling
const parallaxElements = document.querySelectorAll('.hero-image, .feature-icon');

const optimizedScroll = debounce(() => {
    try {
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const rect = element.getBoundingClientRect();
            const scrolled = window.pageYOffset;
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * speed);
                element.style.transform = `translate3d(0, ${yPos}px, 0)`;
            }
        });
    } catch (error) {
        console.error('An error occurred:', error);
    }
}, 10);

window.addEventListener('scroll', optimizedScroll);

window.addEventListener('beforeunload', () => {
    window.removeEventListener('scroll', optimizedScroll);
});

// Feature detection
const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(20px)');
if (!supportsBackdropFilter) {
    document.documentElement.classList.add('no-backdrop-filter');
}

// Mobile menu improvements
const mobileMenu = document.querySelector('.nav-links');
const menuButton = document.querySelector('.menu-button');

if (menuButton && mobileMenu) {
    let isMenuOpen = false;

    const toggleMenu = () => {
        isMenuOpen = !isMenuOpen;
        mobileMenu.classList.toggle('active');
        menuButton.setAttribute('aria-expanded', isMenuOpen);
        
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    };

    menuButton.addEventListener('click', toggleMenu);

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isMenuOpen) {
            toggleMenu();
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
            toggleMenu();
        }
    });
}

// Intersection Observer for Advanced Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '20px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            if (entry.target.dataset.delay) {
                entry.target.style.animationDelay = entry.target.dataset.delay;
            }
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .pricing-card, .testimonial-card').forEach(element => {
    observer.observe(element);
});

// Handle loading screen
document.addEventListener('DOMContentLoaded', () => {
    const loading = document.querySelector('.loading');
    
    // Ensure all content is loaded
    window.addEventListener('load', () => {
        setTimeout(() => {
            loading.classList.add('hidden');
            document.body.style.overflow = 'visible';
        }, 800);
    });
});

// Initialize AOS (Animate on Scroll) if needed
document.addEventListener('DOMContentLoaded', () => {
    // Add any initialization code here
});
