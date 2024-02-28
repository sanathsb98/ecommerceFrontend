import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {

  const logged = localStorage.getItem('logged')
    const token = localStorage.getItem('token')

    console.log('logged',logged)

    const authUser = () => {
        const user = {login:true}
        return user && user.login
    }

    const isAuth = authUser()

  return logged ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute