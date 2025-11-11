// Mobile navigation toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const body = document.querySelector('body');

hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    }
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
            // Close mobile menu if open
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#fff';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Add loading animation to service cards
document.addEventListener('DOMContentLoaded', () => {
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// Form success message (for Formspree)
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        // Check if form was submitted successfully (Formspree redirects to thank you page)
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('success') === 'true') {
            alert('Thank you for your message! I will get back to you soon.');
        }
        
        // Optional: Add form validation feedback
        contactForm.addEventListener('submit', function(e) {
            const submitBtn = this.querySelector('.form-btn');
            const originalHTML = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;
            
            // Re-enable button after 5 seconds in case form doesn't submit
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
            }, 5000);
        });
    // Package selection for contact form
function selectPackage(packageName) {
    // Store the selected package
    sessionStorage.setItem('selectedPackage', packageName);
    
    // Scroll to contact form
    document.getElementById('contact').scrollIntoView({
        behavior: 'smooth'
    });
    
    // Update form after a short delay
    setTimeout(() => {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            const selectedPackage = sessionStorage.getItem('selectedPackage');
            messageTextarea.value = `I'm interested in the ${selectedPackage} package. Please contact me with more details.`;
        }
    }, 1000);
}

// Pre-fill package info on page load
document.addEventListener('DOMContentLoaded', function() {
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
        const messageTextarea = document.getElementById('message');
        if (messageTextarea) {
            messageTextarea.value = `I'm interested in the ${selectedPackage} package. Please contact me with more details.`;
        }
        sessionStorage.removeItem('selectedPackage');
    }
});

