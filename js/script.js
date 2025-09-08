
// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Close mobile menu when a link is clicked
const mobileLinks = document.querySelectorAll('#mobile-menu a');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Header scroll effect
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('shadow-lg');
    } else {
        header.classList.remove('shadow-lg');
    }
});

// Theme Toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');

const updateThemeIcon = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    if (isDarkMode) {
        themeToggleIcon.classList.remove('fa-moon');
        themeToggleIcon.classList.add('fa-sun');
    } else {
        themeToggleIcon.classList.remove('fa-sun');
        themeToggleIcon.classList.add('fa-moon');
    }
};

const toggleTheme = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');

    if (isDarkMode) {
        // Switch to light mode
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    updateThemeIcon();
};

themeToggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTheme();
});

// Set initial icon on page load
updateThemeIcon();

// Resume button functionality
const resumeLinks = document.querySelectorAll('#resume-link, #mobile-resume-link, #hero-resume-link');
resumeLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // Path to your resume file (relative to website root)
        const resumeUrl = 'assets/Abdelrahman-Ahmed-Ibrahim-CV.pdf';
        window.open(resumeUrl, '_blank');
    });
});

// Global resume functionality - make any element with 'resume' text clickable
function makeResumeLinksClickable() {
    // Find all elements that contain the word "resume" (case insensitive)
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
        // Check if element has text content and contains "resume"
        if (element.textContent && element.textContent.toLowerCase().includes('resume') &&
            element.children.length === 0 && // Only text nodes, not parent elements
            element.textContent.trim().length > 0) {

            // Add cursor pointer and click functionality if not already a link
            if (!element.closest('a') && !element.onclick) {
                element.style.cursor = 'pointer';
                element.style.textDecoration = 'underline';
                element.addEventListener('click', (e) => {
                    e.preventDefault();
                    const resumeUrl = 'assets/Abdelrahman-Ahmed-Ibrahim-CV.pdf';
                    window.open(resumeUrl, '_blank');
                });
            }
        }
    });
}

// Navigation active state
function setActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Set active based on current scroll position
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const sectionHeight = section.offsetHeight;
            if (sectionTop <= 100 && sectionTop + sectionHeight > 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // Set active on click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Set home as active initially
    navLinks[0]?.classList.add('active');
}

// Call the function when page loads and after any dynamic content changes
document.addEventListener('DOMContentLoaded', makeResumeLinksClickable);
document.addEventListener('DOMContentLoaded', setActiveNavLink);
// Also call it after a short delay to catch any dynamically loaded content
setTimeout(makeResumeLinksClickable, 1000);

// Form submission
const contactForm = document.getElementById('contact-form');
const toast = document.getElementById('toast');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Show success message
    toast.classList.add('show');

    // Hide message after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);

    // Reset form
    contactForm.reset();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
