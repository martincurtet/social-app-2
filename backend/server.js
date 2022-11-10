const express = require('express')
const cors = require('cors')

const PORT = 8080

const app = express()
app.use(express.json())
app.use(cors())

// ROUTES
app.use('/auth', require('./routes/authRoutes'))
app.use('/post', require('./routes/postRoutes'))

//
app.listen(PORT, () => {
  console.log(`# Server is running on port ${PORT}`)
})