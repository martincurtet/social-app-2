import React, { useState } from 'react'
import { Modal, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { selectCurrentUsername } from '../features/auth/authSlice'
import { useDeletePostMutation, useEditPostMutation } from '../app/api/postApi'

const Post = ({ postData }) => {
  const username = useSelector(selectCurrentUsername)

  const [editModalOpen, setEditModalOpen] = useState(false)
  const [editPost, editResult] = useEditPostMutation()

  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [deletePost, deleteResult] = useDeletePostMutation()

  const [editInput, setEditInput] = useState('')

  const navigate= useNavigate()

  const openEditModal = () => {
    setEditInput(postData.content)
    setEditModalOpen(true)
  }

  const closeEditModal = async (edit) => {
    if (edit) {
      await editPost({ id: postData.id, message: editInput })
      navigate(0)
    }
    setEditModalOpen(false)
  }

  const openDeleteModal = () => {
    setDeleteModalOpen(true)
  }
  
  const closeDeleteModal = async (del) => {
    if (del) {
      await deletePost({ id: postData.id })
      navigate(0)
    }
    setDeleteModalOpen(false)
  }

  const formatDate = (timestamp) => {
    let time = timestamp.split('T')[1].substring(0, timestamp.split('T')[1].length - 5).split(':')

    let date = timestamp.split('T')[0].replaceAll('-', '/').split('/').slice(0).reverse()

    // works for new york timezone in winter time
    if (time[0] <= 4) {
      time[0] = time[0] - 5 + 24
      date[2] = date[2] - 1
    } else {
      time[0] = time[0] - 5
    }

    return `${time.join(':')} ${date.join('/')}`
  }

  return (
    <div className='border rounded px-5 pt-4 pb-3 mb-5 bg-light w-75'>
      <div className='d-flex justify-content-between'>
        <div><b>{postData.user}</b></div>
        <div>{formatDate(postData.time)}</div>
      </div>
      <div className='mb-2'>{postData.content}</div>
      {username === postData.user ? (
      <div className='d-flex flex-row-reverse gap-2'>
        <FaTrash style={{ cursor: 'pointer' }} size={24} onClick={openDeleteModal} />
        <FaEdit style={{ cursor: 'pointer' }} size={24} onClick={openEditModal} />
      </div>
      ) : null}

      {/* EDIT MODAL */}
      <Modal show={editModalOpen} onHide={closeEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Control
            as='textarea'
            rows={3}
            className='rounded-start w-100 h-100'
            value={editInput}
            onChange={e => setEditInput(e.target.value)}
            />
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => closeEditModal(false)}>Cancel</Button>
          <Button variant='primary' onClick={() => closeEditModal(true)}>Edit</Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE MODAL */}
      <Modal show={deleteModalOpen} onHide={closeDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Post</Modal.Title>
        </Modal.Header>

        <Modal.Body>Are you sure you want to delete this post?</Modal.Body>

        <Modal.Footer>
          <Button variant='secondary' onClick={() => closeDeleteModal(false)}>Cancel</Button>
          <Button variant='danger' onClick={() => closeDeleteModal(true)}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default Post