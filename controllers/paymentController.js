const stripe = require("stripe")(process.env.STRIPE_KEY);
const Payment = require("../models/paymentModel")

const paymentController = {
    getPayment: async(req, res) => {
      try {
          const payments = await Payments.find()
          res.json(payments)
      } catch (err) {
          return res.status(500).json({msg: err.message})
      }
    },
    
    createPayment: async(req, res) => {
        try {
            stripe.charges.create(
                {
                  source: req.body.tokenId,
                  amount: req.body.amount,
                  currency: "usd",
                },
                async (stripeErr, stripeRes) => {
                  if (stripeErr) {
                    res.status(500).json(stripeErr);
                  } else {
                    const newPayment = new Payment({
                        user_id: req.body.user_id,
                        tokenId: req.body.tokenId,
                        name: req.body.name,
                        email: req.body.email,
                        amount: req.body.amount,
                        address: req.body.address,
                        cart: req.body.cart
                    })
        
                    await newPayment.save();
                  }
                }
            );

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = paymentController;