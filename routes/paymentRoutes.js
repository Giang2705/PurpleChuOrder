const router = require('express').Router()
const paymentController = require('../controllers/paymentController')
const auth = require("../middlewares/auth")
const authAdmin = require("../middlewares/authAdmin")

router.route('/payment')
    .get(paymentController.getPayment)
    .post(paymentController.createPayment)

router.route('/payment/:id')
    .put(paymentController.updatePayment)

module.exports = router