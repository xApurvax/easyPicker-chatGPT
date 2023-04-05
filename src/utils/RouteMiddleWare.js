import React, { useEffect, useState } from 'react'
import { getAccessToken } from './helper'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';

const RouteMiddleWare = ({ children }) => {
  const [unauthorized, setUnauthorized] = useState(false);
  const token = getAccessToken();
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
    //   navigate("/");
      navigate("/");
    }else {
      setUnauthorized(true);
    }
  }, [token])
  
  return <>{unauthorized && children}</>;
};

export default RouteMiddleWare;