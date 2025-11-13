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

// Review System
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

// Save and show reviews
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    reviews.unshift(review);
    localStorage.setItem('automationxReviews', JSON.stringify(reviews));
    showAllReviews();
}

function showAllReviews() {
    const reviewsList = document.getElementById('reviews-list');
    const reviews = JSON.parse(localStorage.getItem('automationxReviews')) || [];
    
    if (reviews.length === 0) {
        reviewsList.innerHTML = '<p>No reviews yet. Be the first to share your experience!</p>';
        return;
    }
    
    let html = '';
    reviews.forEach(review => {
        html += `
        <div class="review-card">
            <div class="review-header">
                <div class="reviewer-info">
                    <h4>${review.name}</h4>
                    <p>${review.company} • ${review.date}</p>
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

// Handle form submission
document.getElementById('reviewForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('reviewerName').value;
    const company = document.getElementById('reviewerCompany').value;
    const reviewText = document.getElementById('reviewText').value;
    
    if (currentRating === 0) {
        alert('Please select a rating');
        return;
    }
    
    const newReview = {
        name: name,
        company: company,
        rating: currentRating,
        review: reviewText,
        date: new Date().toLocaleDateString()
    };
    
    saveReview(newReview);
    closeReviewForm();
    alert('Thank you for your review!');
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('reviewModal')) {
        closeReviewForm();
    }
});

// Show reviews when page loads
document.addEventListener('DOMContentLoaded', showAllReviews);
