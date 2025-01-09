const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authmidlware");
const getQuestionById = require("../controller/QuesionDetail");

// Define a route with a dynamic parameter for questionid
router.get("/detail-questions/:questionid", authMiddleware, getQuestionById);

module.exports = router;
