const jwt = require('jsonwebtoken');

async function authmiddleware(req, res, next) {
  const authheader = req.headers.authorization;
  // console.log(authheader)
  if (!authheader) {
    return res.status(401).json({ msg: "Invalid new!!" }); // Add return here
  }
  try {
    const { username, userid } = jwt.verify(authheader, process.env.JWT);
    req.user = { username, userid };
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Authentication invalid !!" }); // Add return here
  }
}

module.exports = authmiddleware;
