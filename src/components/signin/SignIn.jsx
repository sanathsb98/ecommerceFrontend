import React, { useEffect, useState } from 'react';
import '../signin/SignIn.css';
import { useDispatch } from 'react-redux';
import { registerState } from '../../features/registerSlice';
import loadingIcon from '/src/images/loadingicon.gif';
import { useNavigate } from 'react-router-dom';
import { changeLoggedStatus } from '../../features/loggedSlice';
import Cookies from 'js-cookie';


const SignIn = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [loginStatus, setLoginStatus] = useState({ message: '', token: '' })
  const [rememberMe, setRememberMe] = useState(false) // Initialize with false

  const navigate = useNavigate()

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  })

  // Function to perform automatic login if cookies are present
  const autoLoginIfCookiesPresent = () => {
    const loggedInUser = Cookies.get('loggedInUser');
    const token = localStorage.getItem('token');
    console.log('cookies user', loggedInUser)
    console.log('cookies token', token)
    if (loggedInUser && token) {
      dispatch(changeLoggedStatus({ logged: true }));
      navigate('/home');
    }
  };

  useEffect(() => {
    autoLoginIfCookiesPresent();
    checkRememberMeStatus();
    setIsLoading(false);
   
  }, [])

  useEffect(() => {
    const rememberMeStatus = localStorage.getItem('rememberMeStatus');
    if (rememberMeStatus !== null) {
      setRememberMe(JSON.parse(rememberMeStatus));
    }
  }, []);

  const changeRememberMeStatus = () => {
    const newRememberMe = !rememberMe;
    setRememberMe(newRememberMe);

    localStorage.setItem('rememberMeStatus', JSON.stringify(newRememberMe));

    Cookies.set('loggedInUser', loginInfo.email);

    if (!newRememberMe) {
      // If remember me is unchecked, clear the email from local storage
      localStorage.removeItem('loggedInEmail');
      Cookies.remove('loggedInUser');
    }
  }


  const checkRememberMeStatus = () => {
    const status = localStorage.getItem('rememberMeStatus');
    if (status === 'true') {
      Cookies.set('loggedInUser', loginInfo.email);
    }
    if (status === 'false') {
      Cookies.remove('loggedInUser');
    }
  }


  const rememberMeStatus = localStorage.getItem('rememberMeStatus')
  console.log(rememberMeStatus)
  const isValidEmail = emailPattern.test(loginInfo.email)

  const getLoginInfo = (event) => {
    const { name, value } = event.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }))
    console.log(loginInfo)
  }

  const isLoginFieldEmpty = Object.values(loginInfo).every((value) => value !== '')

  const userLogin = async () => {

    checkRememberMeStatus();

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
        dispatch(changeLoggedStatus({ logged: false }))
        setIsLoading(false)
        throw new Error('cant get login details')

      } else {
        // getting and setting the logged user deatils in a state:
        const loginDetails = await response.json()
        setLoginStatus(loginDetails)
        console.log("login details:", loginDetails)

        //storing the token:
        localStorage.setItem('token', loginDetails.token)

        //if valid token in response navigate to home:
        if ('token' in loginDetails) {
          dispatch(changeLoggedStatus({ logged: true }))
          setIsLoading(false)
          navigate("/home")
        }
        setIsLoading(false)
      }
    }
    catch (err) {
      console.log(err)
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
        <input checked={rememberMe} onChange={changeRememberMeStatus} type='checkbox' id='agreetocheckbox' />
        <label htmlFor="agreetocheckbox">Remember Me</label>
      </div>

      <button disabled={!isValidEmail || !isLoginFieldEmpty} onClick={userLogin} style={{ opacity: `${isLoginFieldEmpty && isValidEmail ? '1' : '0.3'}` }} className={`${isLoginFieldEmpty && isValidEmail ? 'signup-auth-button cursor' : 'signup-auth-button'}`} >Login</button>

      {isLoading ? (<div className='loading-icon-box'>
        <img style={{ width: '30px', height: '30px' }} src={loadingIcon} alt="Loading icon" />
      </div>) : ("")}

      <div>not registered ? <b onClick={() => changeLoginStatus('notregistered')} className='terms-conditions'>register</b> </div>
    </div>
  )
}

export default SignIn;
