const User = require("../../models/user");
const CustomError = require("../../helpers/error/CustomError");
const Question = require("../../models/Question");
const asyncErrorWrapper = require("express-async-handler");


const checkUserExist = asyncErrorWrapper(async (req,res,next) => {

    const {id} = req.params;

    const user = await User.findById(id);

    if(!user){
        return next(new CustomError("There is no such user with that id",400));
    }

    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

});


const checkQuestionExist = asyncErrorWrapper(async (req,res,next) => {

    const {id} = req.params;

    const question = await Question.findById(id);

    if(!question){
        return next(new CustomError("There is no such question with that id",400));
    }

    // kullanıcı var ise yani hata yok ise next() ile bir sonraki controllers'a yani user.js controllerına gidicek
    next();

});

module.exports = {
    checkUserExist,
    checkQuestionExist
};

