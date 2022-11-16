const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../database/db')
const jwtGenerator = require('../utils/jwtGenerator')
const authorization = require('../middleware/authorization')
const credentialsValidation = require('../middleware/credentialsValidation')

// REGISTER
router.post('/register', credentialsValidation, async (req, res) => {
  try {
    // get post data
    const { username, password } = req.body
    console.log(`# Creating user ${username}...`)

    // check is username already exists
    const users = await db.any(`SELECT id FROM users WHERE username='${username}'`)
    if (users.length !== 0) {
      console.log(`# User ${username} already exists`)
      return res.json({
        status: 400,
        message: 'User already exists'
      })
    }

    // encryp the password
    const salt = await bcrypt.genSalt(10)
    const bcryptPassword = await bcrypt.hash(password, salt)

    // add the user to the database
    db.any(`INSERT INTO users (username, password) VALUES ('${username}', '${bcryptPassword}')`)
    console.log(`# User ${username} created`)
    return res.json({
      status: 200,
      message: 'User created'
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status: 500,
      message: 'Server Error'
    })
  }
})

// LOGIN
router.post('/login', credentialsValidation, async (req, res) => {
  try {
    // get post data
    const { username, password } = req.body
    console.log(`# Logging in user ${username}...`)

    // check if user exists
    const user = await db.any(`SELECT * FROM users WHERE username='${username}'`)
    if (user.length === 0) {
      console.log(`# User ${username} doesn't exist`)
      return res.json({
        status: 401,
        message: 'Invalid credentials'
      })
    }

    // check credentials
    const validPassword = await bcrypt.compare(password, user[0].password)
    if (!validPassword) {
      console.log(`# Invalid credentials for user ${username}`)
      return res.json({
        status: 401,
        message: 'Invalid credentials'
      })
    }

    // send token
    const token = jwtGenerator(user[0].id)
    console.log(`# Login successful for user ${username}`)
    return res.json({ token: token })
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/is-verify', authorization, async (req, res) => {
  try {
    console.log(`# Valid token`)
    return res.json({
      status: 200,
      message: 'valid token'
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status: 500,
      message: 'Server Error'
    })
  }
})

module.exports = router
