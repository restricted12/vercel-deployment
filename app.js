require('dotenv').config()
const express = require('express');
const app = express();
const port = 7048;
   

const cors = require('cors')

app.use(cors())
// Add body-parser middleware
app.use(express.json()); // For parsing JSON
app.use(express.urlencoded({ extended: true })); // For parsing URL-encoded data

// dbconnection
const dbconnection = require("./database/dbconfig");

// Import the user router
const userrouter = require('./routes/userrouter');
// const authmiddleware = require("./middleware/authmidlware");
const quesionsroute = require("./routes/quesionsroute");
const getquesions = require('./routes/getquesions')
const detailQuestionsRouter = require("./routes/QuesionDetail")
const AnswerRoute = require('./routes/AnswerRoute');
const getAnswersByQuestionId = require('./routes/getAnswers');


// Use the router
app.use('/api', userrouter);

// quesion routes middleware
app.use("/api/quesions",quesionsroute)

app.use("/api/quesions",getquesions)


app.use("/api/quesions", detailQuestionsRouter);

app.use("/api/answer",AnswerRoute)

app.use("/api/answeres",getAnswersByQuestionId)



// Start the application
const start = async () => {
    try {
        const [result] = await dbconnection.execute("SELECT 'test' AS message");
        console.log("Database test query result:", result);
        
        // Start the server only after a successful DB connection
        app.listen(port, () => {
            console.log(`Server is running and listening on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start the application:", error.message);
    }
};

start();

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to my server');
});
