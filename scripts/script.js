// Mobile navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            navLinks.classList.remove('active');
        }
    });
});

// Review System - WITH DEMO REVIEWS FOR ALL VISITORS
let currentRating = 0;

// DEMO REVIEWS - These will show for EVERY visitor
const demoReviews = [
    {
        name: "Martin",
        company: "pepeurope.net",
        rating: 5,
        review: "I was struggling a lot in growing my business due to my busy routine but AutomationX helped me a lot to manage my patients through Chatagent on my website and my ads automation system with emails auto replies system",
        date: "11/12/2025"
    },
    {
        name: "Sarah Johnson",
        company: "TechSolutions Inc",
        rating: 5,
        review: "Amazing service! My business efficiency increased by 40% after implementing their automation systems. The team is incredibly responsive and professional.",
        date: "10/28/2025"
    },
    {
        name: "Mike Chen",
        company: "RetailPro",
        rating: 4,
        review: "Great support and quick implementation. The chatbot has reduced our customer response time from hours to minutes. Highly recommended!",
        date: "10/15/2025"
    }
];

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
    document.getElementById('reviewModal').style.display = 'block';
}

function closeReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    document.getElementById('reviewForm').reset();
    currentRating = 0;
    document.querySelectorAll('.star-rating .star').forEach(star => {
        star.classList.remove('active');
    });
}

// Save and show reviews - COMBINES DEMO + CLIENT REVIEWS
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    
    // If this is the first review, start with demo reviews
    if (reviews.length === 0) {
        reviews = [...demoReviews];
    }
    
    // Add the new client review to the top
    reviews.unshift(review);
    localStorage.setItem('automationxReviews', JSON.stringify(reviews));
    showAllReviews();
}

function showAllReviews() {
    const reviewsList = document.getElementById('reviews-list');
    let reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    
    // If no reviews in localStorage, show demo reviews
    if (reviews.length === 0) {
        reviews = [...demoReviews];
        // Save demo reviews to localStorage so they persist
        localStorage.setItem('automationxReviews', JSON.stringify(reviews));
    }
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to share your experience!</p>';
        return;
    }
    
    let html = '';
    reviews.forEach(review => {
        const stars = '★'.repeat(review.rating) + '☆'.repeat(5 - review.rating);
        html += `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <p>${review.company} • ${review.date}</p>
                </div>
                <div class="star-rating" style="color: #ffd700; font-size: 18px;">
                    ${stars}
                </div>
            </div>
            <p class="review-text">"${review.review}"</p>
        </div>
        `;
    });
    
    reviewsList.innerHTML = html;
}

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewerName').value.trim();
    const company = document.getElementById('reviewerCompany').value.trim();
    const reviewText = document.getElementById('reviewText').value.trim();
    
    if (currentRating === 0) {
        alert('Please select a rating');
        return;
    }
    
    if (!name || !reviewText) {
        alert('Please fill in your name and review');
        return;
    }
    
    const newReview = {
        name: name,
        company: company || 'Not specified',
        rating: currentRating,
        review: reviewText,
        date: new Date().toLocaleDateString('en-US', { 
            month: '2-digit', 
            day: '2-digit', 
            year: 'numeric' 
        })
    };
    
    saveReview(newReview);
    closeReviewForm();
    alert('Thank you for your review! It has been added to our testimonials.');
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('reviewModal')) {
        closeReviewForm();
    }
});

// Show reviews when page loads
document.addEventListener('DOMContentLoaded', showAllReviews);

// Package selection (if you have this feature)
function selectPackage(packageName) {
    sessionStorage.setItem('selectedPackage', packageName);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Initialize contact form with package selection
document.addEventListener('DOMContentLoaded', function() {
    showAllReviews();
    
    // Pre-fill package if selected
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
        const messageTextarea = document.querySelector('#message');
        if (messageTextarea) {
            messageTextarea.value = `I'm interested in the ${selectedPackage} package.`;
        }
        sessionStorage.removeItem('selectedPackage');
    }
});
