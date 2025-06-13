// server.js
const express = require('express');
const stripe = require('stripe')('YOUR_SECRET_KEY');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public')); // Serve your static files

// Create payment intent
app.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount, currency } = req.body;
        
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency,
        });
        
        res.json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Handle webhooks (for payment confirmation)
app.post('/webhook', (req, res) => {
    // Verify webhook signature and handle events
    // This is where you'd update your database when payments succeed
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));