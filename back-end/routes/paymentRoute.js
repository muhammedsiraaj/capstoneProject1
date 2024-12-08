const express = require("express");
const Stripe = require("stripe");
const router = express.Router();

// Replace with your Stripe secret key
const stripe = new Stripe("sk_test_51QTK3SJYJCG6jnSseMiGD38im0Q7DVUx8QjwRUpxRxhqMs14qQGYzcbwKijVCtW58EaCMRN8qzr1u8d2x0taYNN700q4tBIhDA");

router.post("/create-payment-intent", async (req, res) => {
  const { amount, currency } = req.body;

  try {
    // Create a PaymentIntent with the specified amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount should be in the smallest currency unit (e.g., cents for USD)
      currency,
    });

    res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
