const nodemailer = require('nodemailer');

const sendOTP = async (mailId, otp) => {
    // Validate inputs
    if (!mailId || !otp) {
        throw new Error('Email or OTP is missing');
    }

    // Create a transporter with detailed error logging
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: "meenakandasamy2002@gmail.com", 
            pass: "Meenakandasamy@5422",
        },
        logger: true,
        debug: true,
        tls: {
            rejectUnauthorized: false, // Accept self-signed certificates
        }
    });

    const mailOptions = {
        from:" meenakandasamy2002@gmail.com",
        to: mailId,
        subject: 'Your OTP for Registration',
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2>Account Registration</h2>
                <p>Your One-Time Password (OTP) is:</p>
                <h3 style="background-color: #f0f0f0; padding: 10px; text-align: center; letter-spacing: 2px;">
                    ${otp}
                </h3>
                <p>This OTP is valid for a short time. Do not share it with anyone.</p>
            </div>
        `
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info);
        return info;
    } catch (error) {
        console.error('Detailed Email Sending Error:', {
            message: error.message,
            stack: error.stack,
            code: error.code
        });
        throw error; // Re-throw to be caught in the controller
    }
};

module.exports = { sendOTP };