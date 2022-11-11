import React, { useState } from 'react'
import { Button, Form, InputGroup } from 'react-bootstrap'

import { useCreatePostMutation } from '../app/api/postApi'

const CreatePost = () => {
  const [createInput, setCreateInput] = useState('')

  const [createPost, result] = useCreatePostMutation()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      createPost({ message: createInput })
      setCreateInput('')
    } catch (err) {
      console.error(err.message)
    }
  }

  return (
    <Form onSubmit={handleSubmit} className='d-flex m-5 justify-content-center w-75'>
      <InputGroup className='d-flex justify-content-center'>
        <Form.Control
          as='textarea'
          rows={3}
          className='w-75 rounded-start'
          value={createInput}
          onChange={e => setCreateInput(e.target.value)}
          />
        <Button type='submit'>Post</Button>
      </InputGroup>
    </Form>
  )
}

export default CreatePost
