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

// REVIEW SYSTEM CODE
let currentRating = 0;

function setRating(rating) {
    currentRating = rating;
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

function openReviewForm() {
    console.log('Opening review form'); // Debug line
    document.getElementById('reviewModal').style.display = 'block';
}

function closeReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    // Reset form
    document.getElementById('reviewForm').reset();
    currentRating = 0;
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => star.classList.remove('active'));
}

// Initialize review system when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Initialize reviews
    displayReviews();
    
    // Add event listener to review form
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reviewerName').value;
            const company = document.getElementById('reviewerCompany').value;
            const review = document.getElementById('reviewText').value;
            
            if (currentRating === 0) {
                alert('Please select a rating');
                return;
            }
            
            // Save review to localStorage
            const newReview = {
                name: name,
                company: company,
                rating: currentRating,
                review: review,
                date: new Date().toLocaleDateString()
            };
            
            saveReview(newReview);
            displayReviews();
            closeReviewForm();
            alert('Thank you for your review!');
        });
    }
    
    // Add click listeners to stars
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach((star, index) => {
        star.addEventListener('click', () => setRating(index + 1));
    });
});

// Save review to localStorage
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    reviews.unshift(review); // Add to beginning
    localStorage.setItem('automationxReviews', JSON.stringify(reviews));
}

// Display reviews
function displayReviews() {
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) return;
    
    const reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = `
            <div class="review-card">
                <p style="text-align: center; color: #64748b;">
                    No reviews yet. Be the first to share your experience!
                </p>
            </div>
        `;
        return;
    }
    
    reviewsList.innerHTML = reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <p>${review.company} • ${review.date}</p>
                </div>
                <div class="star-rating">
                    ${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}
                </div>
            </div>
            <p class="review-text">"${review.review}"</p>
        </div>
    `).join('');
}
function openReviewForm() {
    console.log('Opening review form');
    document.getElementById('reviewModal').style.display = 'block';
    document.body.classList.add('modal-open'); // Prevent background scroll
}

function closeReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    document.body.classList.remove('modal-open'); // Re-enable background scroll
    // Reset form
    document.getElementById('reviewForm').reset();
    currentRating = 0;
    const stars = document.querySelectorAll('.star-rating .star');
    stars.forEach(star => star.classList.remove('active'));
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('reviewModal');
    if (event.target === modal) {
        closeReviewForm();
    }
// Simple fix for reviews display
function showAllReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet</p>';
        return;
    }
    
    let html = '';
    reviews.forEach(review => {
        html += `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <p>${review.company}</p>
                </div>
                <div class="star-rating">
                    ${'★'.repeat(review.rating)}
                </div>
            </div>
            <p class="review-text">"${review.review}"</p>
        </div>
        `;
    });
    
    reviewsList.innerHTML = html;
}

// Show reviews when page loads
document.addEventListener('DOMContentLoaded', showAllReviews);
});
