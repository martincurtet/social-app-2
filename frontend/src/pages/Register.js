import React, { Fragment, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useRegisterMutation } from '../app/api/authApi'
import { useNavigate } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const [errMessageUsername, setErrMessageUsername] = useState('')
  const [errMessagePassword, setErrMessagePassword] = useState('')

  const [register, { isLoading, isError }] = useRegisterMutation()
  const navigate = useNavigate()

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)
  const handlePasswordConfirmInput = (e) => setPasswordConfirm(e.target.value)

  const handlePasswordConfirm = () => {
    if (passwordConfirm !== '' && (password !== passwordConfirm)) {
      setErrMessagePassword('Password and Confirm password are different')
    } else {
      setErrMessagePassword('')
    }
  }

  useEffect(() => {
    handlePasswordConfirm()
  }, [password, passwordConfirm])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // input checking and error messages

      // should already be taken care of with the form input required attribute
      if (username === '' || password === '' || passwordConfirm === '') return

      if (password !== passwordConfirm) return

      let registerData = await register(({ username: username, password: password }))
      console.log(registerData.error)

      // get response code and display errors

      // redirect
      navigate('/login')
    } catch(err) {
      console.log(err.originalStatus)
      console.error(err.message)
    }
  }

  return (
    <Fragment>
      <Header />
      <h2 className='d-flex m-5 justify-content-center'>Register</h2>
      <div className='d-flex justify-content-center min-vh-100'>
        <Form onSubmit={handleSubmit} className='w-25'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              required
              value={username}
              onChange={handleUsernameInput}
            />
            <div className='text-danger'>{errMessageUsername}</div>
          </Form.Group>
          <Form.Group className='mt-2'>
            <Form.Label>Password</Form.Label>
            {/* <div><i>password requirements</i></div> */}
            <Form.Control
              type='password'
              required
              value={password}
              onChange={handlePasswordInput}
            />
            {/* <div className='text-danger'>password error</div> */}
          </Form.Group>
          <Form.Group className='mt-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              required
              value={passwordConfirm}
              onChange={handlePasswordConfirmInput}
            />
            <div className='text-danger'>{errMessagePassword}</div>
          </Form.Group>
          <div className='mt-2'>Already have an account? <Link to='/login'>Login</Link></div>
          <div className='d-flex justify-content-end mt-3'>
            <Button type='submit' className='d-flex align-items-end'>Register</Button>
          </div>
          {/* <div className='d-flex justify-content-center text-danger'><i>error message, put in toaster instead?</i></div> */}
        </Form>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Register
