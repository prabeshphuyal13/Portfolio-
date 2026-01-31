// Scroll Restoration
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navbar = document.querySelector('.navbar');
const sections = document.querySelectorAll('section');
const navLinksAll = document.querySelectorAll('.nav-links a');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const fadeElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
const contactForm = document.getElementById('contactForm');

// Mobile Navigation
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.padding = '10px 50px';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.padding = '15px 50px';
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.08)';
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = navbar.offsetHeight;
            window.scrollTo({
                top: target.offsetTop - offset,
                behavior: 'smooth'
            });
            history.pushState(null, null, this.getAttribute('href'));
        }
    });
});

// Scroll Animations
fadeElements.forEach(el => el.classList.add('fade-in'));

const handleScrollAnimation = () => {
    fadeElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add('visible');
        }
    });
    
    skillProgressBars.forEach(bar => {
        if (bar.getBoundingClientRect().top < window.innerHeight - 50) {
            bar.style.width = bar.dataset.progress + '%';
        }
    });
};

// Active Nav Link
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 200) {
            current = section.getAttribute('id');
        }
    });
    navLinksAll.forEach(link => {
        link.style.color = link.getAttribute('href') === '#' + current ? 'var(--color-black)' : '';
    });
});

// Contact Form
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    if (name) {
        alert(`Thank you ${name}! Your message has been sent successfully.`);
        contactForm.reset();
    }
});

// Init
window.addEventListener('scroll', handleScrollAnimation);
window.addEventListener('load', handleScrollAnimation);
document.addEventListener('DOMContentLoaded', () => window.scrollTo(0, 0));
