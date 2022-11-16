const jwt = require('jsonwebtoken')
require('dotenv').config()

module.exports = async (req, res, next) => {
  try {
    console.log(`# Verification of token...`)
    const token = req.header('token')

    if (!token) {
      console.log(`# Not Authorized - No token`)
      return res.json({
        status: 403,
        message: 'Not Authorized'
      })
    }

    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload.user
    next()
  } catch(err) {
    if (err.message !== 'invalid token') {
      console.error(err.message)
    } else {
      console.log(`# Not Authorized - Invalid token`)
    }
    return res.json({
      status: 403,
      message: 'Not Authorized'
    })
  }
}
