import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { withCookies, useCookies} from 'react-cookie'
import { setCredentials } from './features/auth/authSlice'
import { useDispatch } from 'react-redux'

import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Wall from './pages/Wall'

import PublicRoutes from './components/PublicRoutes'
import ProtectedRoutes from './components/ProtectedRoutes'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const dispatch = useDispatch()

  if (cookies['token'] && cookies['username']) {
    dispatch(setCredentials({ username: cookies['username'], token: cookies['token']}))
  }

  return (
    <Router>
      <Routes>
        <Route path='/' element={<PublicRoutes />}>
          {/* PUBLIC ROUTES */}
          <Route index element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>

        <Route element={<ProtectedRoutes />}>
          {/* PROTECTED ROUTES */}
          <Route path='/wall' element={<Wall />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default withCookies(App)
