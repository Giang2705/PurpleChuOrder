const Noti = require("../models/notificationModel");

const notificationController = {
  getNoti: async (req, res) => {
    try {
      const notifications = await Noti.find();
      res.json(notifications);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createNoti: async (req, res) => {
      try {
        const {content} = req.body;

        const newNoti = new Noti({content})

        await newNoti.save();

        res.json("Tạo thông báo thành công")

    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
  },

  deleteNoti: () => {},

  updateNoti: async (req, res) => {
    try {
      const { content } = req.body;
      await Noti.findOneAndUpdate(
        { _id: req.params.id },
        { content }
      );

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = notificationController;
