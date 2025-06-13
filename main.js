// Stripe Payment Implementation
const stripe = Stripe('YOUR_PUBLISHABLE_KEY'); // Replace with your key

// Cart functionality
let cart = [];
let cartTotal = 0;

// DOM Elements
const cartModal = document.getElementById('cart-modal');
const checkoutModal = document.getElementById('checkout-modal');
const cartButton = document.querySelector('.cart-button');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const checkoutTotalElement = document.getElementById('checkout-total');
const closeCartButton = document.querySelector('.close-cart');
const closeCheckoutButton = document.querySelector('.close-checkout');
const checkoutButton = document.querySelector('.checkout-btn');
const paymentForm = document.getElementById('payment-form');

// Initialize Stripe Elements
let elements;
let cardElement;

function initializeStripe() {
    elements = stripe.elements();
    cardElement = elements.create('card', {
        style: {
            base: {
                color: '#ffffff',
                fontFamily: '"Montserrat", sans-serif',
                fontSize: '16px',
                '::placeholder': {
                    color: '#888888'
                }
            }
        }
    });
    cardElement.mount('#card-element');
}

// Add to cart functionality
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        const productName = this.getAttribute('data-product-name');
        const productPrice = parseInt(this.getAttribute('data-product-price'));
        const productImage = this.getAttribute('data-product-image') || '';
        
        // Check if item exists in cart
        const existingItem = cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1,
                image: productImage
            });
        }
        
        updateCartDisplay();
        showCartNotification(productName);
        
        // Button animation
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Update cart display
function updateCartDisplay() {
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart total (in cents)
    cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotalElement.textContent = (cartTotal / 100).toFixed(2);
    checkoutTotalElement.textContent = (cartTotal / 100).toFixed(2);
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>$${(item.price / 100).toFixed(2)} x ${item.quantity}</p>
                </div>
                <div class="cart-item-controls">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                    <button onclick="removeFromCart('${item.id}')" class="remove-btn">×</button>
                </div>
            </div>
        `).join('');
    }
}

// Cart management functions
function updateQuantity(itemId, change) {
    const item = cart.find(item => item.id === itemId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCartDisplay();
        }
    }
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartDisplay();
}

// Checkout functionality
checkoutButton.addEventListener('click', async () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    // Close cart modal and open checkout modal
    cartModal.classList.remove('active');
    checkoutModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Initialize Stripe if not already done
    if (!elements) {
        initializeStripe();
    }
});

// Handle form submission
paymentForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = document.getElementById('submit-button');
    const paymentMessage = document.getElementById('payment-message');
    
    submitButton.disabled = true;
    paymentMessage.textContent = '';
    
    try {
        // Create payment intent on your server (you'll need to implement this)
        const response = await fetch('/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                items: cart,
                amount: cartTotal,
                currency: 'usd'
            }),
        });
        
        const { clientSecret } = await response.json();
        
        // Confirm payment with Stripe
        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement,
            }
        });
        
        if (error) {
            paymentMessage.textContent = error.message;
            submitButton.disabled = false;
        } else if (paymentIntent.status === 'succeeded') {
            paymentMessage.textContent = 'Payment successful!';
            // Clear cart and show success message
            cart = [];
            updateCartDisplay();
            setTimeout(() => {
                checkoutModal.classList.remove('active');
                document.body.style.overflow = 'auto';
                showSuccessNotification('Payment successful! Your order is being processed.');
            }, 2000);
        }
    } catch (err) {
        paymentMessage.textContent = 'An error occurred. Please try again.';
        submitButton.disabled = false;
    }
});

// Close modals
closeCartButton.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeCheckoutButton.addEventListener('click', () => {
    checkoutModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modals when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
        checkoutModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Notification functions
function showCartNotification(itemName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<strong>${itemName}</strong> added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

function showSuccessNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `<strong>${message}</strong>`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Your existing initialization code
});

// Mobile menu functionality
document.querySelector('.mobile-menu-toggle').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    const navLinks = document.querySelector('.nav-links');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    
    if (!navLinks.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        navLinks.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});