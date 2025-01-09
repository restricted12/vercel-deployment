const dbconnection = require("../database/dbconfig");

async function Answer(req, res) {
  const { Answer, questionid } = req.body; // Include `questionid` in the request body
  const userid = req.user?.userid; // Assuming `userid` is added by auth middleware

  if (!userid) {
    return res.status(401).json({ msg: "Unauthorized. Please log in first." });
  }

  if (!Answer || !questionid) {
    return res.status(400).json({ msg: "Answer and question ID fields are required." });
  }

  try {
    // Ensure the `questionid` exists in the `questions` table for validation
    const [questionResult] = await dbconnection.query(
      "SELECT questionid FROM questions WHERE questionid = ?",
      [questionid]
    );

    if (!questionResult.length) {
      return res.status(404).json({ msg: "The specified question ID does not exist." });
    }

    // Insert the answer into the database
    const [result] = await dbconnection.query(
      "INSERT INTO answers (userid, questionid, answer) VALUES (?, ?, ?)",
      [userid, questionid, Answer.trim()]
    );
    // console.log(result)
    // Retrieve the auto-generated `answerid` from the result
    const answerid = result.insertId;

    res.status(201).json({
      message: "Answer saved successfully!",
      questionId: questionid,
      userid: userid,
      answerid: answerid,
    });
  } catch (error) {
    console.error("Database error:", error.message);
    res.status(500).json({ error: "An error occurred while saving the answer. Please try again." });
  }
}

module.exports = Answer;
