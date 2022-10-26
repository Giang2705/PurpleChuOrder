const sendmailControllers = require("./sendmailControllers");
const Inquiries = require("../models/inquiryModel");

const inquiryController = {
  getInquiry: async (req, res) => {
    try {
      const inquiries = await Inquiries.find();
      res.json(inquiries);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createInquiry: async (req, res) => {
    try {
      const newInquiry = new Inquiries({
        user_id: req.body.user_id,
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        content: req.body.content,
      });

      await newInquiry.save();
      
      sendmailControllers.sendmailNewQuestionUser(newInquiry.email)
      sendmailControllers.sendmailNewQuestionAdmin()

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteInquiry: () => {},

  updateInquiry: async (req, res) => {
    try {
      const { answer, status, email } = req.body;
      await Inquiries.findOneAndUpdate(
        { _id: req.params.id },
        { answer, status }
      );

      res.json({ msg: "Updated inquiry" });
      sendmailControllers.sendmailNewAnswer(email)

    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = inquiryController;
