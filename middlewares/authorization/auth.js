const CustomError = require("../../helpers/error/CustomError");
const asyncErrorWrapper = require("express-async-handler");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const {isTokenIncluded,getAccessTokenFromHeader} = require("../../helpers/authorization/tokenHelpers")

const getAccessToRoute = (req,res,next) => {

    // token
    //  ya doğru bir formda değildir yada kullanıcı herhangi bir token göndermemiştir.
    const {JWT_SECRET_KEY} = process.env;

    if(!isTokenIncluded(req)){
        return next(new CustomError("You are not authorized to access this route",401));
    }

    const accessToken = getAccessTokenFromHeader(req);
    
    jwt.verify(accessToken,JWT_SECRET_KEY,(err,decoded) => {
        
        if (err) {
            return next(new CustomError("You are not authorized to access this route",401));
        }

        req.user = {
            id: decoded.id,
            name: decoded.name,
            
        }

        console.log(decoded);
        next(); 

    });
    // CustomError
};


const getAdminAccess = asyncErrorWrapper( async (req,res,next) => {

    const {id} = req.user;

    const user = await User.findById(id);

    if(user.role !== "admin"){
        return next(new CustomError("Only admins can access this route",403));
    }
    next();

}); 


module.exports = {
    getAccessToRoute,
    getAdminAccess
};