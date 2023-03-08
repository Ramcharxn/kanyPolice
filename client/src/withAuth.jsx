import React, {useEffect} from 'react';
import { useNavigate, redirect } from 'react-router-dom';
// import { useJwt } from 'react-jwt';
import jwt from 'jwt-decode'

const withAuth = (allowedRoles) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const navigate = useNavigate()
    // console.log(localStorage.getItem('authToken'))
    useEffect(() => {
      const isAuthenticated = localStorage.getItem('authToken') != null;
  
      if (!isAuthenticated) {
        // console.log('inside')
        navigate("/");
        return
      }
  
      const token = localStorage.getItem('authToken');
      const decodedToken = jwt(token).user;
      // console.log('decodedtoken',decodedToken)
      const userRole = decodedToken.type;
  
      if (!allowedRoles.includes(userRole)) {
        navigate('/');
        return
      }
    },[])

    return <WrappedComponent {...props} />;
  }

  return WithAuthorization;
}

export default withAuth;
