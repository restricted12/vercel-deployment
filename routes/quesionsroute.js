const express = require("express");
const router = express.Router();  


const authmiddleware = require("../middleware/authmidlware");
const Question = require('../controller/Quesioncontroller');
// quesion router
router.post('/ask-questions',authmiddleware,Question);



// router.get('/all-questions',authmiddleware,(req,res)=>{
//     res.send('all quesions')
// });



module.exports = router;