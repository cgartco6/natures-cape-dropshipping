document.addEventListener('DOMContentLoaded', function() {
    // Add animation to elements when they come into view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.product-card, .ai-process-step, .testimonial-card, .ai-stat').forEach(el => {
        observer.observe(el);
    });
    
    // Add to cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    let cartCount = 3; // Initial cart count
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.card-title').textContent;
            
            // Update cart count
            cartCount++;
            document.querySelector('.fa-shopping-cart').nextSibling.textContent = `Cart (${cartCount})`;
            
            // Show success message
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-check me-1"></i> Added!';
            this.classList.remove('btn-outline-primary');
            this.classList.add('btn-success');
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'alert alert-success position-fixed top-0 end-0 m-3';
            notification.style.zIndex = '1060';
            notification.style.transition = 'all 0.5s';
            notification.innerHTML = `<i class="fas fa-check-circle me-2"></i> Added ${productName} to cart`;
            document.body.appendChild(notification);
            
            // Remove notification after 3 seconds
            setTimeout(() => {
                notification.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(notification);
                }, 500);
            }, 3000);
            
            // Reset button after 2 seconds
            setTimeout(() => {
                this.innerHTML = originalText;
                this.classList.remove('btn-success');
                this.classList.add('btn-outline-primary');
            }, 2000);
        });
    });
    
    // Simulate AI activity updates
    const aiActivity = document.querySelector('.ai-activity');
    const activities = [
        {
            type: 'success',
            icon: 'fas fa-check-circle',
            text: 'Order #4102 shipped via Paxi Lockers',
            time: 'Just now'
        },
        {
            type: 'info',
            icon: 'fas fa-chart-line',
            text: 'Ad campaign ROI increased by 18% this week',
            time: '5 mins ago'
        },
        {
            type: 'primary',
            icon: 'fas fa-camera',
            text: 'Generated 5 new product images using AI',
            time: '20 mins ago'
        }
    ];
    
    let activityIndex = 0;
    
    function addAiActivity() {
        const activity = activities[activityIndex];
        const activityEl = document.createElement('div');
        activityEl.className = `ai-activity-item ${activity.type}`;
        activityEl.innerHTML = `
            <i class="${activity.icon}"></i>
            <div>
                <p class="mb-0">${activity.text}</p>
                <small class="text-muted">${activity.time}</small>
            </div>
        `;
        
        aiActivity.prepend(activityEl);
        
        // Remove oldest activity if more than 5
        if (aiActivity.children.length > 5) {
            aiActivity.removeChild(aiActivity.lastChild);
        }
        
        activityIndex = (activityIndex + 1) % activities.length;
    }
    
    // Add initial activities
    addAiActivity();
    addAiActivity();
    
    // Add new activity every 30 seconds
    setInterval(addAiActivity, 30000);
});
