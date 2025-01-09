const dbconnection = require("../database/dbconfig");

async function getquestion(req, res) {
  try {
    // Use the promise-based query method
    const [results, fields] = await dbconnection.query(
      "SELECT users.username, questions.title, questions.questionid FROM users JOIN questions ON users.userid = questions.userid"
    );
    res.status(200).json(results); 
  } catch (err) {
    console.log("Error during selection", err);
    res.status(500).json({ error: "An error occurred while fetching the questions." });
  }
}

module.exports = getquestion;
