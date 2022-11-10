const pgOptions = {
  error: (err, e) => {
    console.log(`# Database Connection: ${e.cn}`)
    console.log(`# Database Event: ${err.message}`)
  }
}
const pgp = require('pg-promise')(pgOptions)

DB_AUTH = require('./db_credentials')
const connection = `postgres://postgres:${DB_AUTH[1]}@localhost:5432/${DB_AUTH[0]}`
const db = pgp(connection)

// TEST CONNECTION
db.connect()
  .then((obj) => {
    obj.done()
    console.log(`# Database Connection established`)
  })
  .catch((err) => {
    console.error(`# Database Error: ${err.message}`)
  })

module.exports = db
