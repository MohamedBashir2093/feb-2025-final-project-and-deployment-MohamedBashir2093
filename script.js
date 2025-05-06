// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or default to dark mode
const currentTheme = localStorage.getItem('theme') || 'dark';

// Apply theme on load
if (currentTheme === 'dark') {
    document.body.setAttribute('data-theme', 'dark');
    themeToggle.textContent = '☀️';
}

// Theme toggle click handler
themeToggle.addEventListener('click', () => {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
});

// Form Validation
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    const formFields = {
        name: {
            element: document.getElementById('name'),
            error: document.getElementById('nameError'),
            validate: (value) => {
                if (!value.trim()) return 'Name is required';
                if (value.length < 2) return 'Name must be at least 2 characters';
                return '';
            }
        },
        email: {
            element: document.getElementById('email'),
            error: document.getElementById('emailError'),
            validate: (value) => {
                if (!value.trim()) return 'Email is required';
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) return 'Please enter a valid email';
                return '';
            }
        },
        subject: {
            element: document.getElementById('subject'),
            error: document.getElementById('subjectError'),
            validate: (value) => {
                if (!value.trim()) return 'Subject is required';
                if (value.length < 5) return 'Subject must be at least 5 characters';
                return '';
            }
        },
        message: {
            element: document.getElementById('message'),
            error: document.getElementById('messageError'),
            validate: (value) => {
                if (!value.trim()) return 'Message is required';
                if (value.length < 10) return 'Message must be at least 10 characters';
                return '';
            }
        }
    };

    // Real-time validation
    Object.entries(formFields).forEach(([fieldName, field]) => {
        field.element.addEventListener('input', () => {
            const error = field.validate(field.element.value);
            field.error.textContent = error;
            field.element.style.borderColor = error ? 'var(--error-color)' : 'var(--border-color)';
        });
    });

    // Form submission
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        Object.entries(formFields).forEach(([fieldName, field]) => {
            const error = field.validate(field.element.value);
            field.error.textContent = error;
            field.element.style.borderColor = error ? 'var(--error-color)' : 'var(--border-color)';
            if (error) isValid = false;
        });

        if (isValid) {
            // Simulate form submission
            contactForm.style.display = 'none';
            document.getElementById('formSuccess').classList.remove('hidden');
            
            // Clear form data
            Object.values(formFields).forEach(field => {
                field.element.value = '';
                field.error.textContent = '';
                field.element.style.borderColor = 'var(--border-color)';
            });

            // Reset form after 5 seconds
            setTimeout(() => {
                contactForm.style.display = 'block';
                document.getElementById('formSuccess').classList.add('hidden');
            }, 5000);
        }
    });
}

// Smooth scrolling for anchor links
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