const jwt = require('jsonwebtoken')
require('dotenv').config()

// middleware function to verify user before sending the next steo
module.exports = async (req, res, next) => {
  try {
    console.log(`# Verification of token...`)
    const token = req.header('token')

    if (!token) {
      console.log(`# Not Authorized - No token`)
      res.status(403).send('Not Authorized')
    } else {
      // just need this line?
      const payload = jwt.verify(token, process.env.JWT_SECRET)
  
      // gives back the user id
      req.user = payload.user
      next()
    }
  } catch(err) {
    if (err.message !== 'invalid token') {
      console.error(err.message)
    } else {
      console.log(`# Not Authorized - Invalid token`)
    }
    res.status(403).send('Not Authorized')
  }
}
