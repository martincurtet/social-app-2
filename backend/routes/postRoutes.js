const router = require('express').Router()
const db = require('../database/db')
const authorization = require('../middleware/authorization')

// CREATE
router.post('/', authorization, async (req, res) => {
  try {
    console.log(`# CREATING NEW POST`)
    const message = req.body.message.replaceAll("'", "''")
    const createPost = await db.any(`INSERT INTO posts (user_id, message, timestamp) VALUES (${req.user}, '${message}', now())`)
    return res.json({
      status: 200,
      message: 'Post Created',
      createPost
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status:500,
      message: 'Server Error'
    })
  }
})

// READ
router.get('/', authorization, async (req, res) => {
  try {
    console.log(`# GET ALL POSTS`)
    const posts = await db.any(`
      SELECT posts.id, users.username, posts.message, posts.timestamp
      FROM posts JOIN users ON posts.user_id = users.id
      ORDER BY timestamp
    `)
    return res.json({
      status: 200,
      message: 'Posts Fetched',
      posts
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status:500,
      message: 'Server Error'
    })
  }
})

router.get('/:id', authorization, async (req, res) =>{
  try {
    console.log(`# GET ALL POSTS OF USER ${req.params.id}`)
    const posts = await db.any(`SELECT * FROM posts WHERE user_id=${req.params.id}`)
    return res.json({
      status: 200,
      message: 'Posts Fetched',
      posts
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status:500,
      message: 'Server Error'
    })
  }
})

// UPDATE
router.put('/:id', authorization, async (req, res) => {
  try {
    console.log(`# UPDATING POST ${req.params.id}`)
    const message = req.body.message.replaceAll("'", "''")
    const updatePost = await db.any(`UPDATE posts SET message='${message}' WHERE id=${req.params.id}`)
    return res.json({
      status: 200,
      message: 'Post Updated',
      updatePost
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status:500,
      message: 'Server Error'
    })
  }
})

// DELETE
router.delete('/:id', authorization, async (req, res) => {
  try {
    console.log(`# DELETING POST ${req.params.id}`)
    const deletePost = await db.any(`DELETE FROM posts WHERE id=${req.params.id}`)
    return res.json({
      status: 200,
      message: 'Post Deleted',
      deletePost
    })
  } catch(err) {
    console.error(err.message)
    return res.json({
      status:500,
      message: 'Server Error'
    })
  }
})

module.exports = router
