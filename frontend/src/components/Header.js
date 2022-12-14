import React, { Fragment } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useCookies } from 'react-cookie'

import { useSelector, useDispatch } from 'react-redux'
import { selectCurrentUsername, logOut } from '../features/auth/authSlice'

const Header = () => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const username = useSelector(selectCurrentUsername)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = async () => {
    removeCookie('username')
    removeCookie('token')
    await dispatch(logOut())
    navigate(0)
  }

  return (
    <Container className='mw-100 p-3 bg-light'>
      <Row>
        <Col className='d-flex align-items-center'>
          <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>Social App 2</Link>
        </Col>
        {username &&
        <Col className='d-flex justify-content-center align-items-center'>Welcome, {username}</Col>
        }
        <Col className='d-flex justify-content-end gap-2'>
          {username && location.pathname !== '/wall' ? (<Link to='/wall'><Button>Wall</Button></Link>) : (<></>)}
          {username ?
            
            <Link to='/'><Button onClick={handleLogout}>Logout</Button></Link>
            :
            <Fragment>
              <Link to='/register'><Button>Register</Button></Link>
              <Link to='/login'><Button>Login</Button></Link>
            </Fragment>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Header
