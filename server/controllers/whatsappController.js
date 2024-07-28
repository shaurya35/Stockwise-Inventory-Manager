require('dotenv').config();
const twilio = require("twilio");
const { getPredictions } = require("./predictionController.js");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendWhatsAppMessage = async (req, res) => {
  const { companyId } = req.params;
  const predictionData = await getPredictions(companyId);
  const messageBody = predictionData.map(p => `Stock: ${p.stockName}, Purchase Quantity: ${p.purchaseQuantity}`).join('\n');

  const message = await client.messages.create({
    from: "whatsapp:+14155238886",
    body: messageBody,
    to: "whatsapp:+919142681475",  // This should be dynamic based on retailer's WhatsApp number
  });

  res.status(200).json({ message: "WhatsApp message sent", predictionData });
};

module.exports = { sendWhatsAppMessage };