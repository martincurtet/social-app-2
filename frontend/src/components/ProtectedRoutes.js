import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectCurrentToken } from '../features/auth/authSlice'

const ProtectedRoutes = () => {
  const token = useSelector(selectCurrentToken)

  return (
    token ? <Outlet /> : <Navigate to='login' />
  )
}

export default ProtectedRoutes
