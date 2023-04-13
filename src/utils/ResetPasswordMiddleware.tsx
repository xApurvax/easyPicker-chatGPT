import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { RootState } from '../redux/store/store'

interface Props {
  children: React.ReactNode
}

const ResetPasswordMiddleware: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate()
  const userMail = Cookies.get('user_mail')
  const [unauthorized, setUnauthorized] = useState(false)

  const { forgotModal } = useSelector((state: RootState) => ({
    forgotModal: state.ForgotPasswordSlice.forgotModal,
  }))

  useEffect(() => {
    if (forgotModal?.email === null) navigate('/auth/forgot')
    else setUnauthorized(true)
  }, [userMail, forgotModal?.email, navigate])

  return <>{unauthorized && children}</>
}

export default ResetPasswordMiddleware
