const nodemailer = require('nodemailer');

const sendOTP = async (mailId, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail', // Or your preferred email service
        auth: {
            user: 'your-email@gmail.com', // Your email
            pass: 'your-email-password', // Your email password or app-specific password
        },
    });

    const mailOptions = {
        from: 'your-email@gmail.com',
        to: mailId,
        subject: 'Your OTP for Account Registration',
        text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = { sendOTP };