import React, { ReactNode } from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { getAccessToken } from './helper'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children, ...rest }: PrivateRouteProps) => {
  let auth = getAccessToken()
  return auth ? <Outlet {...rest} /> : <Navigate to="/auth/signin" replace />
}

export default PrivateRoute
