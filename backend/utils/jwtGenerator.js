const jwt = require('jsonwebtoken')
require('dotenv').config()

const jwtGenerator = (user_id) => {
  const payload = {
    user: user_id
  }

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
}

module.exports = jwtGenerator
