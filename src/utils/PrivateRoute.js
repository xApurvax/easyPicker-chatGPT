import React from 'react'
import { BrowserRouter, Routes, Outlet ,Navigate} from "react-router-dom";
import { getAccessToken } from './helper';

const PrivateRoute = ({children,...rest}) => {
    let auth = getAccessToken();
  return (
        auth
        ?
        <Outlet />
        :
        <Navigate to="/auth/signin" />
  )
}

export default PrivateRoute