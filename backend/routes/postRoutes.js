const router = require('express').Router()
const db = require('../database/db')
const authorization = require('../middleware/authorization')

// CREATE
router.post('/', authorization, async (req, res) => {
  try {
    console.log(`# CREATING NEW POST`)
    const message = req.body.message.replaceAll("'", "''")
    const createPost = await db.any(`INSERT INTO posts (user_id, message, timestamp) VALUES (${req.user}, '${message}', now())`)
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
    const posts = await db.any(`SELECT posts.id, users.username, posts.message, posts.timestamp FROM posts JOIN users ON posts.user_id = users.id`)
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
router.patch('/:id', authorization, async (req, res) => {
  try {
    console.log(`# UPDATING POST ${req.params.id}`)
    const message = req.body.message.replaceAll("'", "''")
    const updatePost = await db.any(`UPDATE posts SET message='${message}' WHERE id=${req.params.id}`)
    res.send('Post Updated')
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

// DELETE
router.delete('/:id', authorization, async (req, res) => {
  try {
    console.log(`# DELETING POST ${req.params.id}`)
    const deletePost = await db.any(`DELETE FROM posts WHERE id=${req.params.id}`)
    res.send('Post Deleted')
  } catch(err) {
    console.error(err.message)
    res.status(500).json('Server Error')
  }
})

module.exports = router
