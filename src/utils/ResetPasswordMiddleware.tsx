import React, { ReactNode, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'

type resetMiddleWareProps = {
  children?: ReactNode;
}
const ResetPasswordMiddleware = ({ children } : resetMiddleWareProps) => {
  const navigate = useNavigate();
  const userMail = Cookies.get('user_mail')
  const [unauthorized, setUnauthorized] = useState<Boolean>(false)
  const { forgotModal } = useSelector((state) => ({
    forgotModal: state.forgotPasswordSlice.forgotModal,
  }));
  
    useEffect(() => {
      if (forgotModal?.email === null) navigate("/auth/forgot");
      else setUnauthorized(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userMail || forgotModal?.email])
    return <>{unauthorized && children}</>;
}

export default ResetPasswordMiddleware
