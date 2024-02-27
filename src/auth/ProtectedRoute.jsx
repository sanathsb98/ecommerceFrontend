import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {

    const token = localStorage.getItem('token')

    const authUser = () => {
        const user = {login:true}
        return user && user.login
    }

    const isAuth = authUser()

  return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute