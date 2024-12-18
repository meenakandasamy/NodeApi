
const express = require('express');
const dataClient = require('../Config/ConnectDatabase'); // Ensure the path is correct
const { sendOTP } = require('../Utils/sendOTP');

dataClient.connect(); // Establish the connection here once

 // Ensure your email utility is correctly implemented

exports.Createuser = async (req, res, next) => {
    const { userName, motherName, mailId, studentClass } = req.body;

    // Validate required fields
    if (!userName || !motherName || !mailId || !studentClass) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        // Generate a random OTP to use as the password
        const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
        const otp = generateOTP();

        // Insert user details into the database
        const query = `
            INSERT INTO public.usertable(
                "userName", "motherName", "mailId", password, "studentClass"
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING "userId";
        `;

        const result = await dataClient.query(query, [userName, motherName, mailId, otp, studentClass]);
        const userId = result.rows[0].userId;

        // Respond with success
        res.status(201).json({
            success: true,
            message: 'User created successfully!',
            userId: userId,
        });

        // Send the OTP via email
        try {
            await sendOTP(mailId, otp);
            console.log(`OTP sent successfully to ${mailId}`);
        } catch (emailError) {
            console.error('Error sending OTP email:', emailError);
        }
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            success: false,
            message: 'Server error. Could not create user.',
        });
    }
};