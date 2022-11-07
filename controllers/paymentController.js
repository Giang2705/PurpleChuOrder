const stripe = require("stripe")(process.env.STRIPE_KEY);
const Payments = require("../models/paymentModel");
const sendmailControllers = require("./sendmailControllers");

const paymentController = {
  getPayment: async (req, res) => {
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPayment: async (req, res) => {
    try {
      const { user_id, name, email, phone, amount, address, cart, images, method} =
        req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const newPayment = new Payments({
        user_id,
        name,
        email,
        phone,
        amount,
        images,
        address,
        cart,
        method,
      });

      await newPayment.save();

      sendmailControllers.sendmailOrdered(
        newPayment,
        newPayment.email,
        newPayment.amount
      );
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePayment: async (req, res) => {
    try {
      const { address, status } = req.body;
      await Payments.findOneAndUpdate(
        { _id: req.params.id },
        { address, status }
      );

      res.json({ msg: "Updated payment" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = paymentController;
