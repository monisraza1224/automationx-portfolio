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

// Tab functionality for Expertise section
function initExpertiseTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    if (tabBtns.length > 0) {
        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons and panes
                tabBtns.forEach(b => b.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));
                
                // Add active class to clicked button
                btn.classList.add('active');
                
                // Show corresponding pane
                const tabId = btn.getAttribute('data-tab');
                const tabPane = document.getElementById(tabId);
                if (tabPane) {
                    tabPane.classList.add('active');
                }
            });
        });
    }
}

// Review System - WITH DEMO REVIEWS FOR ALL VISITORS
let currentRating = 0;

// DEMO REVIEWS - These will show for EVERY visitor
const demoReviews = [
    {
        name: "Nathan Baxter",
        company: "Everse Travel Tech",
        rating: 5,
        review: "I am working With this young man since he started doing automations and he has helped me a lot to grow my sale effectively and I have made a good from the saas project Monis developed for me",
        date: "11/13/2025"
    },
    {
        name: "Martin",
        company: "pepeurope.net",
        rating: 5,
        review: "I was struggling a lot in growing my business due to my busy routine but AutomationX helped me a lot to manage my patients by through Chatagent on my website and my ads automation system with emails auto replies system",
        date: "11/12/2024"
    },
    {
        name: "Sarah Johnson",
        company: "TechSolutions Inc",
        rating: 5,
        review: "Amazing service! My business efficiency increased by 40% after implementing their automation systems. The team is incredibly responsive and professional.",
        date: "10/28/2024"
    },
    {
        name: "Mike Chen",
        company: "RetailPro",
        rating: 5,
        review: "Great support and quick implementation. The chatbot has reduced our customer response time from hours to minutes. Highly recommended!",
        date: "10/15/2024"
    }
];

// Project Details Data
const projectDetails = {
    project1: {
        title: "AI Marketing Automation Platform",
        subtitle: "The Command Center - Enterprise-grade marketing automation",
        badge: "Full-Stack Development",
        overview: "Built a comprehensive AI-powered marketing automation platform serving as the central command center for marketing teams. This system provides real-time performance tracking and integrates multiple AI modules for content generation, strategy analysis, and campaign automation.",
        features: [
            {
                title: "Real-Time Performance Tracking",
                description: "Four-card metric display showing AI Content Requests, Content Generated, Leads Processed, and Strategy Calls Analyzed with real-time backend analytics service."
            },
            {
                title: "AI Content Generator",
                description: "Generative AI module creating highly optimized marketing copy tailored to specific funnel stages, solving content velocity challenges."
            },
            {
                title: "Strategy Call Intelligence",
                description: "Speech-to-Text and NLP integration to analyze client calls, extracting actionable marketing insights and intent signals."
            },
            {
                title: "Campaign Automation",
                description: "Multi-channel marketing funnel deployment infrastructure handling scheduling, delivery, and tracking of complex campaigns."
            }
        ],
        techStack: ["React", "Node.js", "Python", "OpenAI API", "PostgreSQL", "AWS", "WebSocket"],
        results: [
            { number: "70%", label: "Faster Content Creation" },
            { number: "45%", label: "Increase in Lead Quality" },
            { number: "24/7", label: "Automated Campaigns" },
            { number: "3.5x", label: "ROI Improvement" }
        ]
    },
    project2: {
        title: "Everse Support Chatbot",
        subtitle: "AI-Driven Customer Service Solution for E-commerce",
        badge: "AI Integration",
        overview: "Developed a context-aware, real-time customer support chatbot for the Everse e-commerce platform. This Tier 1 support system handles common inquiries automatically, freeing human agents for complex issues while ensuring customers receive accurate information immediately.",
        features: [
            {
                title: "Conversational AI Engine",
                description: "Natural Language Processing model that understands intent behind user questions, not just keyword matching."
            },
            {
                title: "Knowledge Base Integration",
                description: "Trained on Everse's entire product catalog, FAQs, shipping policies, and brand values for accurate responses."
            },
            {
                title: "Seamless Frontend Integration",
                description: "Non-intrusive chat widget with asynchronous loading that doesn't impact page performance."
            },
            {
                title: "Scalable Architecture",
                description: "Handles high volume of concurrent user sessions without latency, providing 24/7 availability."
            }
        ],
        techStack: ["JavaScript", "Node.js", "NLP", "WebSocket", "MongoDB", "React", "API Integration"],
        results: [
            { number: "80%", label: "Inquiries Handled Automatically" },
            { number: "2min", label: "Average Response Time" },
            { number: "94%", label: "Customer Satisfaction" },
            { number: "60%", label: "Cost Reduction" }
        ]
    },
    project3: {
        title: "Social Media Manager",
        subtitle: "Automation and Oversight Dashboard",
        badge: "Multi-Platform Integration",
        overview: "Created a comprehensive social media management platform that centralizes operations across Facebook, Instagram, and WhatsApp. This system eliminates manual login requirements and provides a single interface for scheduling, tracking, and engagement management.",
        features: [
            {
                title: "Centralized Analytics Core",
                description: "Aggregates data across all integrated platforms to provide real-time metrics including total posts, scheduled content, and active conversations."
            },
            {
                title: "Content Pipeline Tracking",
                description: "Future publishing queue with secure API integration to social platform scheduling endpoints."
            },
            {
                title: "Cross-Platform Navigation",
                description: "Unified interface for managing content pipeline, client accounts, and customer engagement across multiple platforms."
            },
            {
                title: "Secure API Integration",
                description: "Persistent authentication and data synchronization with various social media platforms simultaneously."
            }
        ],
        techStack: ["Vue.js", "Python", "REST API", "OAuth", "PostgreSQL", "Redis", "Docker"],
        results: [
            { number: "4", label: "Platforms Integrated" },
            { number: "75%", label: "Time Saved" },
            { number: "2K+", label: "Posts Scheduled Monthly" },
            { number: "100%", label: "Uptime" }
        ]
    },
    project4: {
        title: "AI YouTube Automation Platform",
        subtitle: "End-to-End Content Creation Engine",
        badge: "Video Production AI",
        overview: "Developed a complete YouTube automation platform that leverages AI for video content creation and channel management. This end-to-end system automates the entire workflow from idea generation to publication, minimizing manual effort through deep automation.",
        features: [
            {
                title: "AI Script Generator",
                description: "Large Language Model fine-tuned for video structure to instantly create production-ready scripts based on user topics."
            },
            {
                title: "Auto Video Creator",
                description: "Complex module that compiles stock footage, overlays voice-overs, and renders complete video clips automatically."
            },
            {
                title: "Channel Analytics & SEO",
                description: "YouTube Analytics API integration providing data-driven insights for content optimization and audience growth."
            },
            {
                title: "Performance Metric Aggregation",
                description: "Real-time tracking of video scripts generated, clips rendered, watch time, and subscriber growth."
            }
        ],
        techStack: ["Next.js", "Python", "OpenAI", "YouTube API", "FFmpeg", "AWS S3", "Redis"],
        results: [
            { number: "150", label: "Video Scripts Generated" },
            { number: "250", label: "Video Clips Rendered" },
            { number: "50K", label: "Minutes Watched Monthly" },
            { number: "1.2K+", label: "Subscribers Gained" }
        ]
    },
    project5: {
        title: "AI News Aggregation Pipeline",
        subtitle: "Automated Newsletter System using n8n",
        badge: "Workflow Automation",
        overview: "Built an automated workflow using n8n that sources, processes, and publishes daily AI news newsletters. This zero-maintenance content engine ensures consistent delivery of fresh, high-quality content by automating research and compilation processes.",
        features: [
            {
                title: "Parallel Data Ingestion",
                description: "Multi-threaded workflow with simultaneous data collection from top AI news sources for comprehensive coverage."
            },
            {
                title: "Data Processing & Filtering",
                description: "Three-stage process for data collection, normalization, and filtering to ensure only high-quality content proceeds."
            },
            {
                title: "AI Transformation",
                description: "OpenAI integration to summarize news and structure it into professional newsletter format with proper attribution."
            },
            {
                title: "Automated Delivery Pipeline",
                description: "HTML newsletter generation and deployment system ready for CMS integration or server upload."
            }
        ],
        techStack: ["n8n", "Python", "OpenAI API", "RSS", "HTML/CSS", "REST API", "Cron Jobs"],
        results: [
            { number: "5", label: "News Sources Integrated" },
            { number: "100%", label: "Automation Coverage" },
            { number: "0", label: "Manual Intervention" },
            { number: "24/7", label: "Content Delivery" }
        ]
    },
    project6: {
        title: "RetailFlow AI - E-commerce Growth Suite",
        subtitle: "Intelligent Analytics and Optimization Platform",
        badge: "Machine Learning",
        overview: "Developed a sophisticated e-commerce optimization platform that leverages data science and machine learning to drive revenue growth. This solution moves beyond simple reporting to provide predictive and prescriptive actions for online stores.",
        features: [
            {
                title: "Predictive Product Trends",
                description: "Time-series forecasting and trend analysis model for proactive inventory management and strategic merchandising."
            },
            {
                title: "AI-Driven Personalization",
                description: "Machine learning recommendation engine analyzing user behavior with A/B testing validation for optimization."
            },
            {
                title: "Omnichannel Campaign Performance",
                description: "Robust reporting mechanism pulling data from Google Ads, Facebook, Email, and other marketing channels."
            },
            {
                title: "High-Impact Metric Visualization",
                description: "Real-time KPI dashboard showing revenue, conversion rates, customer lifetime value, and advertising ROI."
            }
        ],
        techStack: ["React", "Python", "Machine Learning", "Stripe API", "Google Ads API", "MongoDB", "D3.js"],
        results: [
            { number: "3.5M+", label: "Revenue Generated" },
            { number: "8.2%", label: "Conversion Rate" },
            { number: "120K+", label: "Customer Lifetime Value" },
            { number: "45%", label: "Ad Spend ROI" }
        ]
    }
};

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
    document.body.classList.add('modal-open');
}

function closeReviewForm() {
    document.getElementById('reviewModal').style.display = 'none';
    document.body.classList.remove('modal-open');
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
        reviewsList.innerHTML = '<p class="no-reviews">No reviews yet. Be the first to share your experience!</p>';
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
                <div class="star-rating" style="color: #fbbf24; font-size: 18px;">
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

// Project Modal Functions
function openProjectModal(projectId) {
    const project = projectDetails[projectId];
    if (!project) return;
    
    const modalContent = document.getElementById('projectModalContent');
    
    // Generate features HTML
    const featuresHTML = project.features.map(feature => `
        <div class="project-feature">
            <h4>${feature.title}</h4>
            <p>${feature.description}</p>
        </div>
    `).join('');
    
    // Generate tech stack HTML
    const techStackHTML = project.techStack.map(tech => `
        <span class="tech-stack-item">${tech}</span>
    `).join('');
    
    // Generate results HTML
    const resultsHTML = project.results.map(result => `
        <div class="result-item-modal">
            <div class="result-number">${result.number}</div>
            <div class="result-label">${result.label}</div>
        </div>
    `).join('');
    
    modalContent.innerHTML = `
        <div class="project-modal-header">
            <h2>${project.title}</h2>
            <p class="project-modal-subtitle">${project.subtitle}</p>
            <span class="project-modal-badge">${project.badge}</span>
        </div>
        <div class="project-modal-body">
            <div class="project-overview">
                <h3>Project Overview</h3>
                <p>${project.overview}</p>
            </div>
            
            <div class="project-features-grid">
                ${featuresHTML}
            </div>
            
            <div class="project-tech-stack">
                <h3>Technologies Used</h3>
                <div class="tech-stack-items">
                    ${techStackHTML}
                </div>
            </div>
            
            <div class="project-results">
                <h3>Key Results & Impact</h3>
                <div class="results-grid">
                    ${resultsHTML}
                </div>
            </div>
            
            <div class="project-cta">
                <a href="#contact" class="btn primary" onclick="closeProjectModal()">Start Similar Project</a>
            </div>
        </div>
    `;
    
    document.getElementById('projectModal').style.display = 'block';
    document.body.classList.add('modal-open');
}

function closeProjectModal() {
    document.getElementById('projectModal').style.display = 'none';
    document.body.classList.remove('modal-open');
}

// Close modals when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('reviewModal')) {
        closeReviewForm();
    }
    if (event.target === document.getElementById('projectModal')) {
        closeProjectModal();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeReviewForm();
        closeProjectModal();
    }
});

// Package selection
function selectPackage(packageName) {
    sessionStorage.setItem('selectedPackage', packageName);
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}

// Initialize contact form with package selection
function initPackageSelection() {
    const selectedPackage = sessionStorage.getItem('selectedPackage');
    if (selectedPackage) {
        const serviceSelect = document.getElementById('service');
        if (serviceSelect) {
            // Try to find matching option
            for (let option of serviceSelect.options) {
                if (option.text.includes(selectedPackage)) {
                    option.selected = true;
                    break;
                }
            }
        }
        
        const messageTextarea = document.querySelector('#message');
        if (messageTextarea) {
            const currentText = messageTextarea.value;
            messageTextarea.value = currentText + `\n\nI'm interested in the ${selectedPackage} package.`;
        }
        sessionStorage.removeItem('selectedPackage');
    }
}

// Past Projects Image Handling
function initProjectImages() {
    const projectImages = document.querySelectorAll('.screenshot-image');
    
    projectImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        img.addEventListener('error', function() {
            console.log('Image failed to load:', this.src);
        });
    });
}

// Navbar background on scroll
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = '#fff';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navLinks.classList.remove('active');
            }
        });
    });
}

// Add loading animation for images
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.getAttribute('src');
        if (src) {
            const image = new Image();
            image.src = src;
        }
    });
}

// Stats counter animation
function initStatsCounter() {
    const statsGrid = document.querySelector('.stats-grid');
    if (!statsGrid) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsGrid);
}

function animateStats() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const isPercentage = originalText.includes('%');
        const isPlus = originalText.includes('+');
        const target = parseInt(originalText.replace(/[^0-9]/g, ''));
        
        let current = 0;
        const increment = target / 30; // Faster animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
                clearInterval(timer);
            } else {
                const displayValue = Math.floor(current);
                stat.textContent = displayValue + (isPercentage ? '%' : '') + (isPlus ? '+' : '');
            }
        }, 30);
    });
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    preloadImages();
    showAllReviews();
    initExpertiseTabs();
    initPackageSelection();
    initProjectImages();
    initNavbarScroll();
    initSmoothScrolling();
    initStatsCounter();
    
    // Add some console branding
    console.log('%c🚀 AutomationX - AI Automation Solutions', 'color: #50C878; font-size: 16px; font-weight: bold;');
    console.log('%cGDPR-compliant automation for European businesses', 'color: #64748b;');
});

// Make functions available globally
window.selectPackage = selectPackage;
window.openReviewForm = openReviewForm;
window.closeReviewForm = closeReviewForm;
window.setRating = setRating;
window.openProjectModal = openProjectModal;
window.closeProjectModal = closeProjectModal;
window.showAllReviews = showAllReviews;
