const express = require("express");
const router = express.Router();  


const authmiddleware = require("../middleware/authmidlware");
const getquestion = require('../controller/QuesionListHome');
// quesion router
router.get('/get-questions',authmiddleware,getquestion);



// router.get('/all-questions',authmiddleware,(req,res)=>{
//     res.send('all quesions')
// });



module.exports = router;