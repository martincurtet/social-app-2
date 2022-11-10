const router = require('express').Router()
const db = require('../database/db')
const authorization = require('../middleware/authorization')

// CREATE
router.post('/', authorization, (req, res) => {
  try {
    console.log(`# CREATING NEW POST`)
    db.any(`INSERT INTO posts (user_id, message, timestamp) VALUES (${req.user}, '${req.body.message}', now())`)
    res.send('Post Created')
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

// READ
router.get('/', authorization, async (req, res) => {
  try {
    console.log(`# GET ALL POSTS`)
    const posts = await db.any(`SELECT * FROM posts`)
    res.json(posts)
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

router.get('/:id', authorization, async (req, res) =>{
  try {
    console.log(`# GET ALL POSTS OF USER ${req.params.id}`)
    const posts = await db.any(`SELECT * FROM posts WHERE user_id=${req.params.id}`)
    res.json(posts)
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

// UPDATE
router.put('/:id', authorization, (req, res) => {
  try {
    console.log(`# UPDATING POST ${req.params.id}`)
    db.any(`UPDATE posts SET message='${req.body.message}' WHERE id=${req.params.id}`)
    res.send('Post Updated')
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

// DELETE
router.delete('/:id', authorization, (req, res) => {
  try {
    console.log(`# DELETING POST ${req.params.id}`)
    db.any(`DELETE FROM posts WHERE id=${req.params.id}`)
    res.send('Post Deleted')
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
