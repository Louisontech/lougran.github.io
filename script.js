document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    const htmlLang = document.documentElement;

    function switchLanguage(lang) {
        // Update HTML lang attribute
        htmlLang.lang = lang;
        
        // Toggle active class on language buttons
        langButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Show/hide language-specific elements
        document.querySelectorAll('[data-lang]').forEach(element => {
            // Handle navigation links separately
            if (element.tagName === 'A' && element.closest('.nav-links')) {
                if (element.dataset.lang === lang) {
                    element.style.display = '';
                } else {
                    element.style.display = 'none';
                }
                return;
            }

            // Skip language buttons
            if (element.classList.contains('lang-btn')) {
                return;
            }
            
            // Handle all other elements
            if (element.dataset.lang === lang) {
                element.style.display = '';
            } else {
                element.style.display = 'none';
            }
        });
    }

    // Add click event listeners to language buttons
    langButtons.forEach(button => {
        button.addEventListener('click', () => {
            const lang = button.dataset.lang;
            switchLanguage(lang);
        });
    });

    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.navbar')) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Close mobile menu if open
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Smooth scroll to target
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            if (item.style.display !== 'none') { // Only check visible items
                item.classList.remove('active');
                if (item.getAttribute('href').slice(1) === current) {
                    item.classList.add('active');
                }
            }
        });
    });
}); 