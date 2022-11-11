import React, { Fragment, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import Header from '../components/Header'
import Footer from '../components/Footer'

import { useDispatch } from 'react-redux'
import { setCredentials } from '../features/auth/authSlice'
import { useLoginMutation } from '../app/api/authApi'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [cookies, setCookie, removeCookie] = useCookies([])

  const handleUsernameInput = (e) => setUsername(e.target.value)
  const handlePasswordInput = (e) => setPassword(e.target.value)

  const navigate = useNavigate()

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const tokenData = await login({ username: username, password: password }).unwrap()
      const token = tokenData['token']

      // error handling
      setErrorMessage('')

      dispatch(setCredentials({ username, token }))

      // set cookie
      setCookie('username', username, {sameSite: true})
      setCookie('token', token, {sameSite: true})

      setUsername('')
      setPassword('')
      navigate('/wall')
    } catch (err) {
      console.log(err.originalStatus)
      console.error(err.message)
    }
  }

  return (
    <Fragment>
    <Header />
    <h2 className='d-flex m-5 justify-content-center'>Login</h2>
    {isLoading ? 
    <div>Loading...</div>
    :
    <div className='d-flex justify-content-center min-vh-100'>
      <Form className='w-25' onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            required
            value={username}
            onChange={handleUsernameInput}
          />
        </Form.Group>
        <Form.Group className='mt-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            required
            value={password}
            onChange={handlePasswordInput}
          />
        </Form.Group>
        <div className='mt-2'>Don't have an account ? <Link to='/register'>Register</Link></div>
        <div className='d-flex justify-content-end mt-3'>
          <Button className='d-flex align-items-end' type='submit'>Login</Button>
        </div>
        <div className='d-flex justify-content-center text-danger'><i>{errorMessage}</i></div>
      </Form>
    </div>
    }
    <Footer />
  </Fragment>
  )
}

export default Login
