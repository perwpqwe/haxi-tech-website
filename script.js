// Language switching functionality
let currentLanguage = 'zh';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'zh' ? 'en' : 'zh';
    updateLanguage();
    updateLanguageButton();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-zh][data-en]');
    
    elements.forEach(element => {
        if (currentLanguage === 'zh') {
            element.textContent = element.getAttribute('data-zh');
        } else {
            element.textContent = element.getAttribute('data-en');
        }
    });
    
    // Update HTML lang attribute
    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';
    
    // Update page title
    const title = document.querySelector('title');
    if (currentLanguage === 'zh') {
        title.textContent = '四川哈夕信息技术有限责任公司 | Sichuan Haxi Information Technology Co., Ltd.';
    } else {
        title.textContent = 'Sichuan Haxi Information Technology Co., Ltd. | 四川哈夕信息技术有限责任公司';
    }
}

function updateLanguageButton() {
    const button = document.querySelector('.lang-text');
    if (currentLanguage === 'zh') {
        button.textContent = 'EN';
    } else {
        button.textContent = '中文';
    }
}

// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const company = this.querySelectorAll('input[type="text"]')[1]?.value || '';
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert(currentLanguage === 'zh' ? '请填写所有必填字段' : 'Please fill in all required fields');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert(currentLanguage === 'zh' ? '请输入有效的邮箱地址' : 'Please enter a valid email address');
            return;
        }
        
        // Simulate form submission
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        submitButton.textContent = currentLanguage === 'zh' ? '发送中...' : 'Sending...';
        submitButton.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert(currentLanguage === 'zh' ? '消息已发送！我们会尽快回复您。' : 'Message sent! We will get back to you soon.');
            this.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
}

// Intersection Observer for animations
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
    const animatedElements = document.querySelectorAll('.service-card, .stat-item, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updateLanguage();
    updateLanguageButton();
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add typing effect on page load
// Uncomment the following lines if you want a typing effect
/*
document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title span');
    const originalText = heroTitle.textContent;
    
    setTimeout(() => {
        typeWriter(heroTitle, originalText, 50);
    }, 1000);
});
*/ 