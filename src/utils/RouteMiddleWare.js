import React, { useEffect, useState } from 'react'
import { getAccessToken } from './helper'
import { useNavigate } from 'react-router'

const RouteMiddleWare = ({ children }) => {
  const [unauthorized, setUnauthorized] = useState(false)
  const token = getAccessToken()
  const navigate = useNavigate()
  useEffect(() => {
    if (!token) {
      navigate('/')
    } else {
      setUnauthorized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <>{unauthorized && children}</>
}

export default RouteMiddleWare
