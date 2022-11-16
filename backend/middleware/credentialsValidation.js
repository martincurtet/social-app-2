module.exports = (req, res, next) => {
  try {
    const { username, password } = req.body
    console.log(`# Validation of credentials`)

    // verify email format

    // check if empty values
    if (username === '' || password === '') {
      console.log(`# Empty parameter(s)`)
      return res.json({
        status: 400,
        message: 'Missing parameter(s)'
      })
    }

    next()
  } catch(err) {
    console.error(err.message)
    return res.json({
      status: 500,
      message: 'Server Error'
    })
  }
}
