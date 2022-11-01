const router = require('express').Router()
const notiController = require('../controllers/notificationControllers')
const auth = require("../middlewares/auth")
const authAdmin = require("../middlewares/authAdmin")

router.route("/noti")
    .get(notiController.getNoti)
    .post(notiController.createNoti)
router.route("/noti/:id")
    .delete(notiController.deleteNoti)
    .put(notiController.updateNoti)

module.exports = router