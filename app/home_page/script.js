// Initialize cart count
let cartCount = 0;

// Function to update cart icon
function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    cartIcon.setAttribute('data-count', cartCount); // You can style this in CSS to show a badge
}

// Event listener for the "Shop Now" button
document.addEventListener('DOMContentLoaded', () => {
    const shopNowButton = document.querySelector('#hero button');
    
    shopNowButton.addEventListener('click', () => {
        alert('Redirecting to shop...');
        // You can redirect to a shopping page or perform any other action here
        // For example: window.location.href = 'shop.html';
    });

    // Add event listeners to product add-to-cart buttons
    const cartButtons = document.querySelectorAll('.cart');
    cartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault(); // Prevent the default anchor action
            cartCount++; // Increase cart count
            alert('Product added to cart!');
            updateCartIcon(); // Update the cart icon
        });
    });

    updateCartIcon(); // Initial update
});
