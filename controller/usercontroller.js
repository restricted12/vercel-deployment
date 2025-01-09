const dbconnection = require("../database/dbconfig"); // Import the database configuration
const bcrypt = require('bcrypt');
const { StatusCodes } = require("http-status-codes");
const jwt = require('jsonwebtoken');



// Function to handle user registration
async function register(req, res) {
    // Destructure the required user information from the request body
    const { username, firstname, lastname, email, password } = req.body;

    // Validate that all required fields are provided
    if (!username || !firstname || !lastname || !email || !password) {
        return res.status(400).json({ msg: "please provide all required info" }); // Send a 400 status if any required field is missing
    }

    try {
        // Query the database to check if the username or email is already registered
        const [user] = await dbconnection.query(
            "SELECT username,email from users WHERE username=? or email=?",
            [username, email]
        );

        // If the query returns any results, the user is already registered
        if (user.length > 0) {
            return res.status(StatusCodes.BAD_REQUEST).json({ msg: "user already registered" });
        }

        // Validate that the password is longer than 8 characters
        if (password.length <= 5) {
            return res.status(400).json({ msg: "please the password must be above 8" }); // Send a 400 status if the password is too short
        }
        // encrypt password
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt)
        // Insert the new user data into the database
        await dbconnection.query(
            "INSERT INTO users(username, firstname, lastname, email, password) VALUES (?,?,?,?,?)",
            [username, firstname, lastname, email, hashedpassword]
        );

        // Send a success response when the user is successfully registered
        return res.status(201).json({ msg: "user data created and inserted" });
    } catch (error) {
        // Log the error and send a 500 status if something goes wrong
        console.log(error.message);
        return res.status(500).json({ msg: "something went wrong !!" });
    }
}






// Function to handle user login (placeholder implementation)
async function login(req, res) {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
        return res.status(400).json({ msg: "Please insert all required fields!!" });
    }

    try {
        // Query the database for the user by email
        const [user] = await dbconnection.query(
            "SELECT username, userid, password FROM users WHERE email = ?",
            [email]
        );
        console.log(user)

        // Check if the user exists
        if (user.length === 0) {
            return res.status(404).json({ msg: "Invalid credentials" });
        };
        const ismatch = await bcrypt.compare(password, user[0].password);
        if (!ismatch) {
            return res.status(400).json({ msg: "invalid credentials!!" })
        }
        const username = user[0].username
        const userid = user[0].userid

        const token = jwt.sign({ username, userid }, process.env.JWT, { expiresIn: "1d" })

        return res.status(200).json({ msg: "user login successfully", token, username,userid });


    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ msg: "Something went wrong!!" });
    }

}


// Function to check user status or details (placeholder implementation)
async function check(req, res) {
    const username = req.user.username
    const userid = req.user.userid
    res.status(200).json({ msg: "Valid user", username, userid }) // Send a response to indicate the check functionality
}

// Export the functions for use in other parts of the application
module.exports = { register, login, check};
