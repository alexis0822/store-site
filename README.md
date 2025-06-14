# Streetwear E-commerce Store Template (Created by Alexis Negron)

A modern, responsive e-commerce website template for a streetwear brand built with HTML, CSS, and JavaScript, integrated with Snipcart for seamless checkout functionality.

## 🌟 Features

- Responsive design that works on all devices
- Modern and clean UI with smooth animations
- Product catalog with detailed product information
- Shopping cart functionality
- Secure checkout process
- Test mode for development and testing
- Mobile-friendly navigation

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- [Snipcart](https://snipcart.com/) - E-commerce platform
- [Google Fonts](https://fonts.google.com/) - Typography
- [GitHub Pages](https://pages.github.com/) - Hosting

## 🚀 Live Demo

Visit the live site: [URBANX Store](https://alexis0822.github.io/store-site/)

## 💻 Local Development

1. Clone the repository:
```bash
git clone https://github.com/alexis0822/store-site.git
```

2. Navigate to the project directory:
```bash
cd store-site
```

3. Start a local server:
```bash
python3 -m http.server 8000
```

4. Open your browser and visit:
```
http://localhost:8000/home.html
```

## 🔧 Configuration

### Snipcart Setup

1. Sign up for a [Snipcart account](https://snipcart.com/)
2. Get your API key from the Snipcart dashboard
3. Update the API key in `home.html`:
```html
<div hidden id="snipcart" data-api-key="YOUR_API_KEY"></div>
```

### Test Mode

The site is currently configured for testing. To test the checkout process:
- Use test card number: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any 5-digit ZIP code

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones

## 🎨 Customization

### Adding Products

To add new products, use this template in the products section:
```html
<div class="product-card">
    <div class="product-image">PRODUCT_IMAGE</div>
    <div class="product-info">
        <h3 class="product-name">Product Name</h3>
        <p class="product-price">$XX.XX</p>
        <button 
            class="snipcart-add-item add-to-cart"
            data-item-id="unique-id"
            data-item-price="XX.XX"
            data-item-url="product-url"
            data-item-description="Product description"
            data-item-image="image-url"
            data-item-name="Product Name">
            Add to Cart
        </button>
    </div>
</div>
```

### Styling

- Main styles are in `main.css`
- Customize colors in the CSS variables section
- Modify animations in the keyframes section

## 🔒 Security

- All payments are processed securely through Snipcart
- Test mode is enabled for development
- SSL certificate required for production

## 🚀 Deployment

The site is currently deployed on GitHub Pages. To deploy to a custom domain:

1. Update Snipcart configuration in `home.html`
2. Update product URLs to use the new domain
3. Configure DNS settings
4. Set up SSL certificate

## 👥 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Alexis Negron Lopez**
- GitHub: [@alexis0822](https://github.com/alexis0822)

## 🙏 Acknowledgments

- Snipcart for the e-commerce platform
- Google Fonts for the typography
- GitHub Pages for hosting 
