const express = require("express");
const { askNewQuestion, getAllQuestions, getSingleQuestion} = require("../controllers/question");
const { getAccessToRoute } = require("../middlewares/authorization/auth");
const { checkQuestionExist } = require("../middlewares/database/databaseErrorHelpers")


const router = express.Router();

// get all questions 
router.get("/",getAllQuestions)
// get question by id
router.get("/:id", checkQuestionExist, getSingleQuestion);
// ask questions 
router.post("/ask", getAccessToRoute, askNewQuestion);




module.exports = router;