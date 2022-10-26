const router = require('express').Router()
const inquiryController = require('../controllers/inquiryControllers')
const auth = require("../middlewares/auth")
const authAdmin = require("../middlewares/authAdmin")

router.route("/inquiries")
    .get(inquiryController.getInquiry)
    .post(inquiryController.createInquiry)
router.route("/inquiries/:id")
    .delete(inquiryController.deleteInquiry)
    .put(inquiryController.updateInquiry)

module.exports = router