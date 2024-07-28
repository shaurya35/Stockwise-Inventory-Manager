const User = require("../models/userModel.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// ensures that JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET environment variable is not set.");
}

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const signup = async (req, res) => {
    const { username, email, password } = req.body;
    
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            if (existingUser.username === username) {
                return res.status(400).json({ error: 'Username already in use' });
            }
            if (existingUser.email === email) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    signup,
    login,
};
