const bcrypt = require('bcrypt');
const model = require('../models/usermodel');
const { validatelogin, validatesignup } = require('../middleware/usermids');

// Signup function
const signup = async (req, res) => {
    const { error } = validatesignup(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
        const existingUser = await model.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedpassword = await bcrypt.hash(req.body.password, 10);
        
        const newuser = new model({
            name: req.body.name,
            email: req.body.email,
            password: hashedpassword
        });

        await newuser.save();
        
        const token = newuser.generateAuthToken(); // Assuming generateAuthToken is a method in the User model
        res.status(201).json({
            success: true,
            user: { id: newuser._id, name: newuser.name },
            token,
            message: 'Registration successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Registration failed',
            message: error.message
        });
    }
};

// Login function
const login = async (req, res) => {
    const { error } = validatelogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    try {
        const existingUser = await model.findOne({ email: req.body.email });
        if (!existingUser) {
            return res.status(400).send('Invalid email or password');
        }

        // Check if the password matches
        const validPassword = await bcrypt.compare(req.body.password, existingUser.password);
        if (!validPassword) {
            return res.status(400).send('Invalid email or password');
        }

        const usertoken = existingUser.generateAuthToken(); // Assuming generateAuthToken is a method in the User model
        
        res.status(200).json({
            success: true,
            user: { id: existingUser._id, name: existingUser.name },
            usertoken,
            message: 'Login successful'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Login failed',
            message: error.message
        });
    }
};

// Logout function
const logout = async (req, res) => {
    try {
        res.status(200).send('User logged out successfully!');
    } catch (error) {
        res.status(500).send('There has been an error logging out!');
    }
};

module.exports = { signup, login, logout };
