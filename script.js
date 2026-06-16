// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active Navigation Link Highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Products Slider - Running Text Style
const productsContainer = document.querySelector('.products-container');
const productsSlider = document.querySelector('.products-slider');

// Gallery Slider
const galleryContainer = document.querySelector('.gallery-container');
const gallerySlider = document.querySelector('.gallery-slider');
const galleryPrevBtn = gallerySlider.querySelector('.prev-btn');
const galleryNextBtn = gallerySlider.querySelector('.next-btn');

let galleryScrollPosition = 0;
const galleryScrollAmount = 320;

if (galleryPrevBtn && galleryNextBtn) {
    galleryPrevBtn.addEventListener('click', () => {
        galleryScrollPosition -= galleryScrollAmount;
        if (galleryScrollPosition < 0) {
            galleryScrollPosition = 0;
        }
        galleryContainer.style.transform = `translateX(-${galleryScrollPosition}px)`;
    });

    galleryNextBtn.addEventListener('click', () => {
        const maxScroll = galleryContainer.scrollWidth - galleryContainer.clientWidth;
        galleryScrollPosition += galleryScrollAmount;
        if (galleryScrollPosition > maxScroll) {
            galleryScrollPosition = maxScroll;
        }
        galleryContainer.style.transform = `translateX(-${galleryScrollPosition}px)`;
    });
}

// Touch/Swipe Support for Mobile
let startX = 0;
let endX = 0;

// Products slider touch events
if (productsContainer) {
    productsContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    productsContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe(productsContainer, productsScrollPosition, productsScrollAmount);
    });
}

// Gallery slider touch events
if (galleryContainer) {
    galleryContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    galleryContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe(galleryContainer, galleryScrollPosition, galleryScrollAmount);
    });
}

function handleSwipe(container, scrollPosition, scrollAmount) {
    const swipeThreshold = 50;
    const diff = startX - endX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            scrollPosition += scrollAmount;
            const maxScroll = container.scrollWidth - container.clientWidth;
            if (scrollPosition > maxScroll) {
                scrollPosition = maxScroll;
            }
        } else {
            scrollPosition -= scrollAmount;
            if (scrollPosition < 0) {
                scrollPosition = 0;
            }
        }
        container.style.transform = `translateX(-${scrollPosition}px)`;
    }
}

// Form Submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector('textarea').value;

        // Simple validation
        if (!name || !email || !message) {
            alert('Mohon lengkapi semua field yang wajib diisi.');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Mohon masukkan email yang valid.');
            return;
        }

        // Simulate form submission
        alert('Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda.');
        contactForm.reset();
    });
}

// Navbar Background on Scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(74, 144, 226, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(74, 144, 226, 0.1)';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .news-card, .gallery-item, .client-logo, .stat-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Infinite Running Text Products Slider
(function () {
    if (!productsContainer || !productsSlider) return;

    // Clone cards untuk seamless loop
    const originalCards = Array.from(productsContainer.querySelectorAll('.product-card'));
    originalCards.forEach(card => productsContainer.appendChild(card.cloneNode(true)));

    // Hapus transition CSS agar animasi dihandle RAF
    productsContainer.style.transition = 'none';

    const speed = 1; // pixel per frame
    let position = 0;
    let paused = false;
    let rafId;

    function getTotalWidth() {
        // Lebar semua card original (setengah dari container karena sudah diklon)
        return productsContainer.scrollWidth / 2;
    }

    function animate() {
        if (!paused) {
            position += speed;
            if (position >= getTotalWidth()) position = 0;
            productsContainer.style.transform = `translateX(-${position}px)`;
        }
        rafId = requestAnimationFrame(animate);
    }

    // Pause saat hover
    productsSlider.addEventListener('mouseenter', () => { paused = true; });
    productsSlider.addEventListener('mouseleave', () => { paused = false; });

    // Tombol next: loncat 1 card ke depan
    const nextBtn = productsSlider.querySelector('.next-btn');
    const prevBtn = productsSlider.querySelector('.prev-btn');
    if (nextBtn) nextBtn.addEventListener('click', () => {
        const card = productsContainer.querySelector('.product-card');
        const cardWidth = card.offsetWidth + parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight);
        position = (position + cardWidth) % getTotalWidth();
    });
    if (prevBtn) prevBtn.addEventListener('click', () => {
        const card = productsContainer.querySelector('.product-card');
        const cardWidth = card.offsetWidth + parseFloat(getComputedStyle(card).marginLeft) + parseFloat(getComputedStyle(card).marginRight);
        position = Math.max(0, position - cardWidth);
    });

    animate();
})();