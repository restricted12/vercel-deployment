const dbconnection = require("../database/dbconfig");

async function getAnswersByQuestionId(req, res) {
  const { quesionid } = req.params; // Extract questionid from route params

  console.log("Received questionid:",quesionid); // Debugging: check the questionid

  try {
    // Query the database to get answers and their corresponding usernames
    const [results] = await dbconnection.query(
      `
        SELECT 
          answers.answerid, 
          answers.answer, 
          users.username 
        FROM 
          answers
        INNER JOIN 
          users ON answers.userid = users.userid
        WHERE 
          answers.questionid = ?
      `,
      [quesionid] // Pass the questionid dynamically to the query
    );

    // Debugging: Check the results from the database
    console.log("Query results:", results);

    // Check if there are any answers for the provided questionid
    if (results.length === 0) {
      return res.status(404).json({ error: "No answers found for the provided question ID." });
    }

    // Return the list of answers and usernames
    res.status(200).json(results);
  } catch (err) {
    console.error("Error during selection:", err);
    res.status(500).json({ error: "An error occurred while fetching the answers." });
  }
}

module.exports = getAnswersByQuestionId;
