const jwt = require('jsonwebtoken');
const Company = require("../models/companyModel.js");
const ExpressError = require("./ExpressError.js");

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

module.exports = { isLoggedIn, saveRedirectUrl, isOwner };
