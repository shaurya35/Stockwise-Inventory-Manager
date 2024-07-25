const User = require("../models/userSchema.js");

//render signup page
const renderSignupForm = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};


//signup
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err); 
            }
            res.redirect("/api/companies");
        });
    } catch (e) {
        console.error('Error during signup:', e);
        res.status(500).redirect("/signup");
    }
};


//render login page
const renderLoginForm = async (req, res) => {
    try {
        let users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'An error occurred while fetching users' });
    }
};


//login
const login = async (req, res) => {
    try {
        let redirectUrl = res.locals.redirectUrl || "/api/companies";
        
        // Respond with a success status and the redirect URL
        res.status(200).json({ redirectUrl });
    } catch (error) {
        // Handle any errors that might occur
        console.error(error);
        
        // Respond with an error status and message
        res.status(500).json({ error: 'An error occurred during login' });
    }
};

//logout
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.status(200).json("/api/companies");
    });
};


module.exports ={
    signup,
    login,
    renderSignupForm,
    renderLoginForm,
    logout,
};