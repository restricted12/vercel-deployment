const express = require("express");
const router = express.Router();
   
const authmiddleware = require("../middleware/authmidlware")


const { register, login, check } = require('../controller/usercontroller');

// register
router.post('/users/register',register);

// login
router.post('/users/login',login);

// check user
router.get('/users/check',authmiddleware,check);


module.exports = router;