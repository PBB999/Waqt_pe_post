const nodemailer = require("nodemailer");
require("dotenv").config();

function generateParcelNotificationEmail() {
  const deliveryDate = "2024-12-15";
  const deliveryTime = "2:00 PM";

  return `
    <div style="font-family: 'Arial', sans-serif; max-width: 600px; margin: auto; color: #333;">
      <div style="background-color: #B91C1C; color: white; padding: 20px; border: 1px solid #ddd; border-radius: 10px 10px 0 0; text-align: center;">
        <h1 style="margin: 0;">Parcel Delivery Notification</h1>
      </div>
      <div style="padding: 20px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 0 0 10px 10px; text-align: center;">
        <h2 style="color: #333;">Your Parcel Will Arrive Soon!</h2>
        <p style="font-size: 16px; color: #555;">Good news! Your parcel is on its way and will be arriving soon. We are working hard to ensure it reaches you as quickly as possible.</p>

        <p style="font-size: 16px; color: #555;">We’ll notify you once it’s out for delivery. Thank you for choosing our service!</p>
        
        <h3 style="color: #B91C1C;">Expected Delivery</h3>
        <p style="font-size: 18px; font-weight: bold; color: #333;">
          Your parcel will arrive on <span style="color: #B91C1C;">${deliveryDate}</span> at <span style="color: #B91C1C;">${deliveryTime}</span>.
        </p>

        <div style="margin: 20px 0;">
          <a href="http://10.1.50.254/sendPackage" style="display: inline-block; padding: 10px 20px; color: white; background-color: #B91C1C; text-decoration: none; border-radius: 5px;">
            <i class="fas fa-calendar-alt"></i> Reschedule Your Time Slot
          </a>
        </div>

        <p>If you have any questions, feel free to contact our support team.</p>
      </div>
    </div>
  `;
}

module.exports = async (email, subject, text, appointment) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const emailBody = generateParcelNotificationEmail();

    if (appointment) {
      console.log("appointment", appointment);
      await transporter.sendMail(appointment);
    } else {
      await transporter.sendMail({
        from: process.env.USER,
        to: email,
        subject: subject || "Your Parcel Update",
        html: emailBody,
      });
    }

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};