const express = require('express');
const dataClient = require('../Config/ConnectDatabase'); // Ensure the path is correct
const { sendOTP } = require('../Utils/sendOTP');

dataClient.connect(); // Establish the connection here once

// Ensure your email utility is correctly implemented

exports.Createuser = async (req, res, next) => {
    const { userName, motherName, mailId, password, studentClass } = req.body;

    // Check if all necessary fields are provided
    if (!userName || !motherName || !mailId || !password || !studentClass) {
        return res.status(400).json({
            success: false,
            message: "All fields are required!",
        });
    }

    try {
        // Check if the email already exists
        const emailCheckQuery = `SELECT "mailId" FROM public.usertable WHERE "mailId" = $1;`;
        const emailCheckResult = await dataClient.query(emailCheckQuery, [mailId]);

        if (emailCheckResult.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already in use!',
            });
        }

        // Prepare the SQL query (corrected query, added password)
        const query = `
            INSERT INTO public.usertable(
                "userName", "motherName", "mailId", "password", "studentClass"
            ) VALUES ($1, $2, $3, $4, $5)
            RETURNING "userId";  -- Return the generated userId
        `;

        // Execute the query with the provided values
        const result = await dataClient.query(query, [
            userName, 
            motherName, 
            mailId, 
            password, 
            studentClass
        ]);

        // Retrieve the generated userId
        const userId = result.rows[0].userId;

        // Send success response with userId only after successful insertion
        return res.status(201).json({
            success: true,
            message: 'User created successfully!',
            userId: userId, // Optionally send back the generated userId
        });

    } catch (error) {
        console.error('Error inserting user:', error);
        return res.status(500).json({
            success: false,
            message: 'Server error. Could not create user.',
        });
    }
};
