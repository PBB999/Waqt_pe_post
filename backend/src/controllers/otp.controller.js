const express = require('express');
const { updateParcelStatus } = require('../services/postman.service');
const app = express();

app.use(express.json());

const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_SERVICE_SID = process.env.TWILIO_SERVICE_SID;

const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

const sendOtp = async (req, res) => {
  const phoneNumber = process.env.MOBILE_NUMBER_VERIFIED;

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${phoneNumber}`,
        channel: 'sms',
      });

    res.status(200).send({
      success: true,
      message: 'OTP sent successfully',
      payload: result,
    });
  } catch (err) {
    console.error('Error in sending OTP:', err);
    res.status(500).send({
      success: false,
      message: `Error in sending OTP: ${err.message}`,
    });
  }
};

const verifyOtp = async (req, res) => {
  const { otp } = req.body ?? {};
  const {deliveryId} = req.body;
  const phoneNumber = process.env.MOBILE_NUMBER_VERIFIED;

  try {
    const result = await client.verify
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${phoneNumber}`,
        code: otp,
      });

    if (result.status != "pending") {
    updateParcelStatus(deliveryId, 'Delivered');
    res.status(200).send({
      success: true,
      message: 'OTP verified successfully',
      payload: result,
    });
    }

  } catch (err) {
    console.error('Error in verifying OTP:', err);
    res.status(500).send({
      success: false,
      message: `Error in verifying OTP: ${err.message}`,
    });
  }
};


const sendOrderMessage = async (req, res) => {
  const { phoneNumber } = req.body;

  try {
    const message = await client.messages.create({
      body: 'Your Order is Created. Delivery will arrive soon.',
      to: `+${phoneNumber}`,
      from: process.env.TWILIO_PHONE_NUMBER,
    });

    res.status(200).send({
      success: true,
      message: 'Order message sent successfully',
      payload: message,
    });
  } catch (err) {
    console.error('Error in sending order message:', err);
    res.status(500).send({
      success: false,
      message: `Error in sending order message: ${err.message}`,
    });
  }
};


app.post('/send-order-message', sendOrderMessage);

module.exports = { sendOtp, verifyOtp, sendOrderMessage };