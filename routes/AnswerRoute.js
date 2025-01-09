const express = require("express");
const router = express.Router();  


const authmiddleware = require("../middleware/authmidlware");
const Answer = require('../controller/AnswerController');
// quesion router
router.post('/responsed-answers',authmiddleware,Answer);



// router.get('/all-questions',authmiddleware,(req,res)=>{
//     res.send('all quesions')
// });



module.exports = router;