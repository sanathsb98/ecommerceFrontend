import React from 'react';
import '../logout/LogoutModale.css';
import { useDispatch, useSelector } from 'react-redux';
import { logoutModaleStatus } from '../../features/modalSlice';
import { useNavigate } from 'react-router-dom';


const LogoutModale = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const redirectLogin = () => {
        dispatch(logoutModaleStatus({status:false}))
        localStorage.removeItem('token')
        navigate('/')
    }

  return (
    <div className='modale-container'>
        <div className='logout-content'>
            <div className='logout-title'>Are you sure you want to logout ?</div>
            <div className='logout-btns-container'>
                <div onClick={()=>dispatch(logoutModaleStatus({status:false}))} className='reject-btn'>No</div>
                <div onClick={()=>{redirectLogin()}} className='accept-btn'>Yes</div>
            </div>
        </div>
    </div>
  )
}

export default LogoutModale