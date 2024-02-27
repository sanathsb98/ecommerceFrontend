import React, { useEffect, useState } from 'react';
import '../signin/SignIn.css';
import { useDispatch } from 'react-redux';
import { registerState } from '../../features/registerSlice';
import loadingIcon from '/src/images/loadingicon.gif';

const SignIn = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState({ message: '' })

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const isValidEmail = emailPattern.test(loginInfo.email)

  const getLoginInfo = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }))
    console.log(loginInfo)
  }

  const isLoginFieldEmpty = Object.values(loginInfo).every((value) => value != '')

  const userLogin = async () => {

    const data = {
      email: loginInfo.email,
      password: loginInfo.password
    }

    try {
      setIsLoading(true)
      const response = await fetch("https://ecommerce-backend-eight-azure.vercel.app/api/signin", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })

      if (!response) {
     
        throw new Error('cant get login details')
        setIsLoading(false)
      }

      // getting and setting the logged user deatils in a state:

      const loginDetails = await response.json()
      setLoginStatus(loginDetails)
      console.log("login details:", loginDetails)
      setIsLoading(false)

    }
    catch (err) {
      console.log(err)
      setIsWrongPassword(true)
      setIsLoading(false)
    }
  }

  const dispatch = useDispatch()

  const changeLoginStatus = (status) => {
    console.log(status)
    dispatch(registerState({ status: status }))
  }

  return (
    <div className='signup-container'>

      <div className='signup-title-des'>
        <div className='signup-title font-title'>Welcome👋 </div>
        <div className='signup-description'>Please login here</div>
      </div>

      <div className='signup-auth-boxes'>
        <div className='auth-input-box'>
          <div className='auth-input-title'>Email Address</div>
          <input name='email' value={loginInfo.email} onChange={(e) => { getLoginInfo(e) }} className='signup-input-field' type='text' />
        </div>

        <div className='auth-input-box'>
          <div className='auth-input-title'>Password</div>
          <input name='password' value={loginInfo.password} onChange={(e) => { getLoginInfo(e) }} className='signup-input-field' type='text' />
          <div className='auth-input-error'>{loginStatus.message}</div>
        </div>

      </div>

      <div className='signup-auth-checkbox'>
        <input type='checkbox' id='agreetocheckbox' />
        <label for="agreetocheckbox">Remember Me</label>
      </div>

      <button disabled={!isValidEmail} onClick={() => { userLogin() }} style={{ opacity: `${isLoginFieldEmpty && isValidEmail ? '1' : '0.3'}` }} className={`${isLoginFieldEmpty && isValidEmail ? 'signup-auth-button cursor' : 'signup-auth-button'}`} >Login</button>

      {isLoading ? (<div className='loading-icon-box'>
        <img style={{ width: '30px', height: '30px' }} src={loadingIcon} />
      </div>) : ("")}

      <div>not registered ? <b onClick={() => changeLoginStatus('notregistered')} className='terms-conditions'>register</b> </div>
    </div>
  )
}

export default SignIn