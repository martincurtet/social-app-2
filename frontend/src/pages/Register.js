import React, { Fragment } from 'react'
import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Register = () => {
  return (
    <Fragment>
      <Header />
      <h2 className='d-flex m-5 justify-content-center'>Register</h2>
      <div className='d-flex justify-content-center min-vh-100'>
        <Form className='w-25'>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control type='text'></Form.Control>
            <div className='text-danger'>username error</div>
          </Form.Group>
          <Form.Group className='mt-2'>
            <Form.Label>Password</Form.Label>
            <div><i>password requirements</i></div>
            <Form.Control type='password'></Form.Control>
            <div className='text-danger'>password error</div>
          </Form.Group>
          <Form.Group className='mt-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type='password'></Form.Control>
            <div className='text-danger'>password error 2</div>
          </Form.Group>
          <div className='mt-2'>Already have an account? <Link to='/login'>Login</Link></div>
          <div className='d-flex justify-content-end mt-3'>
            <Button className='d-flex align-items-end'>Register</Button>
          </div>
          <div className='d-flex justify-content-center text-danger'><i>error message, put in toaster instead?</i></div>
        </Form>
      </div>
      <Footer />
    </Fragment>
  )
}

export default Register
