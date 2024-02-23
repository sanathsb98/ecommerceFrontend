import React from 'react';
import '../signupsignin/SignUpSignIn.css';
import SignUp from '../../components/signup/SignUp';
import signupimg from '/src/images/signupimg.png';
import SignIn from '../../components/signin/SignIn';
import { useSelector } from 'react-redux';

const SignUpSignIn = () => {

  const registered = useSelector((store)=>store.register.register)
  console.log(registered)

  return (
    <div className='container'>
      <div className='signupsignin-content subcontainer'>

        <div className={`signupsignin-image-container ${registered === 'notregistered' ? 'signinimage' : 'signupimage'}`}>
          {/* <img className='signupimg' src={signupimg}/> */}
        </div>

        <div className='signupsignin-auth-container'>
          
          {registered === 'notregistered' ? (<SignUp/>):(<SignIn/>)}
    
       
        </div>

      </div>
    </div>
  )
}

export default SignUpSignIn