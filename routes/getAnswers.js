const express = require("express");
const router = express.Router();  


const authmiddleware = require("../middleware/authmidlware");
const getAnswersByQuestionId = require('../controller/getAnswers');
// quesion router
router.get('/get-answers/:quesionid',authmiddleware,getAnswersByQuestionId);



// router.get('//get-answers:quesionid',authmiddleware,(req,res)=>{
//     res.send('all quesions')
// });



module.exports = router;
