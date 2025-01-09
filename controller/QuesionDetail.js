const dbconnection = require("../database/dbconfig");

async function getQuestionById(req, res) {
  const { questionid } = req.params; // Extract questionid from route params

  try {
    // Query the database for the specific questionid
    const [results] = await dbconnection.query(
      `
        SELECT 
          questions.questionid, 
          questions.title, 
          questions.description, 
          users.userid
        FROM 
          questions 
        INNER JOIN 
          users 
        ON 
          questions.userid = users.userid
        WHERE 
          questions.questionid = ?
      `,
      [questionid] // Pass the questionid dynamically to the query
    );

    // Check if the question was found
    if (!results || results.length === 0) {
      return res.status(404).json({ error: "No question found for the provided ID." });
    }

    // Return the question details
    res.status(200).json(results[0]); // Send the first result since questionid is unique
  } catch (err) {
    console.error("Error during selection:", err);
    res.status(500).json({ error: "An error occurred while fetching the question." });
  }
}

module.exports = getQuestionById;
