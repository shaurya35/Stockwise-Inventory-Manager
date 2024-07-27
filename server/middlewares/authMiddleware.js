const jwt = require('jsonwebtoken');
const Company = require("../models/companyModel.js");
const ExpressError = require("./ExpressError.js");
const User = require("../models/userModel.js");

// check if the user if logged in
const isLoggedIn = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }

  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next(); 
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// save the redirected url
const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

// check if the user is the owner of the company
const isOwner = async (req, res, next) => {
  let { companyId } = req.params;
  let company = await Company.findById(companyId);
  if (!company) {
    return next(new ExpressError('Company not found', 404));
  }
  if (!company.owner.equals(req.user._id)) {
    return res.status(403).json({ error: 'You do not have permission to perform this action' });
  }
  next();
};

const isAuthenticated = async (req, res, next) => {
  try {
      const authHeader = req.header('Authorization');
      console.log('Authorization Header:', authHeader); // Debugging statement

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
          return res.status(401).json({ error: 'No token provided or token is invalid' });
      }

      const token = authHeader.replace('Bearer ', '');
      console.log('Token:', token); // Debugging statement

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded Token:', decoded); // Debugging statement

      const user = await User.findById(decoded._id);
      console.log('User:', user); // Debugging statement

      if (!user) {
          return res.status(401).json({ error: 'Invalid token' });
      }

      req.user = user;
      next();
  } catch (error) {
      console.error('Authentication Error:', error); // Debugging statement
      res.status(401).json({ error: 'Unauthorized access' });
  }
};




module.exports = { isLoggedIn, saveRedirectUrl, isOwner ,isAuthenticated};
