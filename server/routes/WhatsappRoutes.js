const express = require("express");
const router = express.Router();
const wrapAsync = require("../middlewares/wrapAsync.js");
const { isAuthenticated } = require("../middlewares/authMiddleware.js");
const { sendWhatsAppMessage } = require("../controllers/whatsappController.js");

router.post("/send/:companyId", isAuthenticated, wrapAsync(sendWhatsAppMessage));

module.exports = router;