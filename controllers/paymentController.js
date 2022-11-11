const stripe = require("stripe")(process.env.STRIPE_KEY);
const Payments = require("../models/paymentModel");
const sendmailControllers = require("./sendmailControllers");

// Filter, sorting and paginating
// class APIfeatures {
//   constructor(query, queryString) {
//     this.query = query;
//     this.queryString = queryString;
//   }
//   filtering() {
//     const queryObject = { ...this.queryString }; //queryString = req.query

//     const excludedFields = ["page", "sort", "limit"];
//     excludedFields.forEach((el) => delete queryObject[el]);

//     let queryStr = JSON.stringify(queryObject);

//     queryStr = queryStr.replace(
//       /\b(gte|gt|lt|lte|regex)\b/g,
//       (match) => "$" + match
//     );

//     this.query.find(JSON.parse(queryStr));

//     return this;
//   }
//   sorting() {
//     if (this.queryString.sort) {
//       const sortBy = this.queryString.sort.split(",").join(" ");
//       this.query = this.query.sort(sortBy);
//     } else {
//       this.query = this.query.sort("-createdAt");
//     }

//     return this;
//   }
// }

const paymentController = {
  getPayment: async (req, res) => {
    // try {
    //   const features = new APIfeatures(Payments.find(), req.query).filtering().sorting()

    //   const payments = await features.query

    //   res.json({
    //       status: "success",
    //       result: payments.length,
    //       payment: payments
    //   })

    //   res.json(payments);
    try {
      const payments = await Payments.find();
      res.json(payments);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createPayment: async (req, res) => {
    try {

      const {
        user_id,
        name,
        email,
        phone,
        amount,
        address,
        cart,
        images,
        method,
      } = req.body;

      if (method !== "cod" && images.length === 0) return res.status(400).json({ msg: "Hãy up bill thanh toán" });

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
