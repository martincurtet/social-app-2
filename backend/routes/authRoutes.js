const router = require('express').Router()
const bcrypt = require('bcrypt')
const db = require('../database/db')
const jwtGenerator = require('../utils/jwtGenerator')
const authorization = require('../middleware/authorization')

// REGISTER
router.post('/register', /* middleware goes here,*/ async (req, res) => {
  try {
    // get post data
    const { username, password } = req.body
    console.log(`# Creating user ${username}...`)

    // TODO move verifications to middleware credentialsValidation

    // check if username or password is empty
    if (username === '' || password === '') {
      console.log(`# Empty parameter, cannot create user`)
      res.status(400).send('Missing parameter(s)')
    } else {
      // check is username already exists
      const users = await db.any(`SELECT id FROM users WHERE username='${username}'`)

      if (users.length !== 0) {
        console.log(`# User ${username} already exists`)
        res.status(401).send('User already exists')
      } else {
        // encryp the password
        const salt = await bcrypt.genSalt(10)
        const bcryptPassword = await bcrypt.hash(password, salt)

        // add the user to the database
        db.any(`INSERT INTO users (username, password) VALUES ('${username}', '${bcryptPassword}')`)
        console.log(`# User ${username} created`)
        res.status(200).send('User created')
      }
    }
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

// LOGIN
router.post('/login', /* middleware goes here,*/ async (req, res) => {
  try {
    // get post data
    const { username, password } = req.body
    console.log(`# Logging in user ${username}...`)

    // TODO move verifications to middleware credentialsValidation

    // check if username or password is empty
    if (username === '' || password === '') {
      console.log(`# Empty parameter, cannot login user ${username}`)
      res.status(400).send('Missing parameter(s)')
    } else {
      // check if user exists
      const user = await db.any(`SELECT * FROM users WHERE username='${username}'`)
      if (user.length === 0) {
        console.log(`# User ${username} doesn't exist`)
        // don't tell the user the username doesn't exist, spread of personal information
        res.status(401).send(`Invalid credentials`)
      } else {
        // check credentials
        const validPassword = await bcrypt.compare(password, user[0].password)
        if (!validPassword) {
          console.log(`# Invalid credentials for user ${username}`)
          res.status(401).send(`Invalid credentials`)
        } else {
          // send token
          const token = jwtGenerator(user[0].id)
          console.log(`# Login successful for user ${username}`)
          res.json({ token })
        }
      }
    }
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.get('/is-verify', authorization, async (req, res) => {
  try {
    console.log(`# Valid token`)
    res.json(true)
  } catch(err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
