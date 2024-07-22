const ExpressError = require("./ExpressError.js");
const Company = require("../models/companySchema.js");


module.exports.isLoggedIn = (req ,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;//original url where we wanted to go before login
        return res.redirect("/login");
    }
    next();
};

module.exports.saveRedirectUrl = (req ,res ,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async (req ,res, next)=>{
    let { id } = req.params;
    let company = await Company.findById(id);
    if(!company.owner._id.equals(res.locals.currUser._id)){
       return res.redirect(`/api/companies/${id}`);
    }

    next();
};