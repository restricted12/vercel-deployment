const dbconnection = require("../database/dbconfig");

async function Question(req, res) {
  // Destructure and validate the request body
  const { title, description, tag } = req.body;

  // Ensure `userid` is extracted from the authenticated user
  const userid = req.user?.userid; // Assuming `userid` is added by auth middleware
  
  if (!userid) {
    return res.status(401).json({ msg: "Unauthorized. Please log in first." });
  }

  // Validate inputs
  if (!title || !description || !tag) {
    return res.status(400).json({ msg: "All fields (title, description, tag) are required." });
  }

  if (title.trim().length < 3 || description.trim().length < 5 || tag.trim().length < 2) {
    return res.status(400).json({
      msg: "Title must be at least 3 characters, description 5 characters, and tag 2 characters.",
    });
  }

  try {
    // Insert data into the database and capture the result
    const [result] = await dbconnection.query(
      "INSERT INTO questions (userid, title, description, tag) VALUES (?, ?, ?, ?)",
      [userid, title.trim(), description.trim(), tag.trim()]
    );
    
    // Return a success response with the inserted question ID and the user ID
    res.status(201).json({
      message: "Question saved successfully!",
      questionId: result.insertId, // Send the inserted question ID for reference
      userid: userid, // Include the user ID in the response
    });
  } catch (error) {
    console.error("Database error:", error.message);
    res
      .status(500)
      .json({ error: "An error occurred while saving the question. Please try again." });
  }
}

module.exports = Question;




