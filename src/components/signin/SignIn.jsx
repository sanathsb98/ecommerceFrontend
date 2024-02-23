import React,{useState} from 'react';
import '../signin/SignIn.css';
import { useDispatch } from 'react-redux';
import { registerState } from '../../features/registerSlice';
import bcrypt from 'bcryptjs';



const SignIn = () => {

  const[loginInfo,setLoginInfo] = useState({
    email : '',
    password : '',
  })
  const[loggedUserInfo,setLoggedUserInfo] = useState()

  const getLoginInfo = (event) => {
    const {name,value} = event.target;
    setLoginInfo((prev)=>({...prev,[name]:value}))
    console.log(loginInfo)
  }

  const userLogin = async () => {

    try{
      const response = await fetch(`https://ecommerce-backend-eight-azure.vercel.app/api/signin?email=${loginInfo.email}`,{
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
        },
      
       })
       
       if(!response){
        throw new Error('cant get login details')
       }
    
       // getting and setting the logged user deatils in a state:
       const {loginDetails} = await response.json()
       console.log(loginDetails)
      
     

      // checking if the hashed password and actual password is same:
      const hashedPassword = loginDetails.password;
      await bcrypt.compare(loginInfo.password, hashedPassword, (err, result) => {
        if (err) {
          console.log('error')
        }
        if (result) {

          console.log('password matched')
          window.location.href = "/home";

        } else {

          console.log('wrong password')
        }
      })


    }
    catch (err) {
      console.log(err)
    }


  }

  const dispatch = useDispatch()

  const changeLoginStatus = (status) => {
  console.log(status)
  dispatch(registerState({status:status}))
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
        <input name='email' value={loginInfo.email} onChange={(e)=>{getLoginInfo(e)}} className='signup-input-field' type='text' />
      </div>

      <div className='auth-input-box'>
        <div className='auth-input-title'>Password</div>
        <input name='password' value={loginInfo.password} onChange={(e)=>{getLoginInfo(e)}} className='signup-input-field' type='text' />
        <div className='auth-input-error'>Invalid Credentials</div>
      </div>

    </div>

    <div className='signup-auth-checkbox'>
      <input type='checkbox' id='agreetocheckbox' />
      <label for="agreetocheckbox">Remember Me</label>
    </div>

    <div onClick={()=>{userLogin()}} className='signup-auth-button'>Login</div>

  
    <div>not registered ? <b onClick={()=>changeLoginStatus('notregistered')} className='terms-conditions'>register</b> </div>
  </div>
  )
}

export default SignIn