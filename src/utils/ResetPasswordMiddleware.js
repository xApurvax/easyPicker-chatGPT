import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

const ResetPasswordMiddleware = ({ children }) => {
  const [unauthorized, setUnauthorized] = useState(false)
  const { forgotModal } = useSelector((state) => ({
    forgotModal: state.forgotPasswordSlice.forgotModal,
  }))
  const navigate = useNavigate()
  useEffect(() => {
    if (forgotModal?.email === null) {
      navigate('/auth/forgot')
      // navigate("/auth/login");
    } else {
      setUnauthorized(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Cookies.get('user_mail') || forgotModal?.email])
  return <>{unauthorized && children}</>
}

export default ResetPasswordMiddleware
