const Teacher = require("../models/Teacher");
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET;

exports.LoginTeacher = async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log("Login attempt with email:", email);

        // Find the teacher by email
        const teacher = await Teacher.findOne({ email });

        if (!teacher) {
            console.log("Teacher not found");
            return res.status(400).json({ error: 'Teacher not found with this email' });
        }

        // Check if the provided password matches the stored password
        const isMatch = await teacher.comparePassword(password);

        if (!isMatch) {
            console.log("Password is match");
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate a JWT token
        const token = jwt.sign({ id: teacher._id }, jwtSecret, { expiresIn: '1h' });

        console.log("Login successful");
        res.status(200).json({ token });
             

    } catch (error) {
        console.log("Error in logging in:", error);
        res.status(500).json({ error: 'Server error during login' });
    }
};
