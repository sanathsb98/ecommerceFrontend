import React,{useState} from 'react';
import '../signup/SignUp.css';
import {useDispatch} from 'react-redux';
import { registerState } from '../../features/registerSlice';
import loadingIcon from '/src/images/loadingicon.gif';



const SignUp = () => {

  const [userForRegData, setUserForRegData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
  })
  const[isLoading,setIsLoading] = useState(false)

  var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isValidEmail = emailPattern.test(userForRegData.email)

  //to show the validation icons on click:
  const [isEmailClicked,setIsEmailClicked] = useState(false)
  const [isPasswordClicked,setIsPasswordClicked] = useState(false)

  //changing the status of the checkbox:
  const [checked, setChecked] = useState(false)

 // getting the user data from input:
  const getRegUserData = (e) => {
    const { name, value} = e.target;
    setUserForRegData((prev) => ({ ...prev, [name]: value }))
  }

  // checking if the input fields are empty:
  const isAllFieldsFilled = Object.values(userForRegData).every((value)=> value != '') && checked && userForRegData.password.length >= 6;
  console.log('all fields filled',isAllFieldsFilled)

  //send data to backend:
  const UserSignUp = async() => {
    setIsLoading(true)
    const data = {
      name : userForRegData.firstname + ' ' + userForRegData.lastname,
      email : userForRegData.email,
      password : userForRegData.password
    }
   
    try{

      const respose = await fetch(' https://ecommerce-backend-eight-azure.vercel.app/api/signup',{
        method : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
      })

      if(respose){
        changeLoginStatus('registered')
        setIsLoading(false)
      }else{
        console.log('cant register user')
        setIsLoading(false)
      }

    }catch(err){
      console.log(err)
      setIsLoading(false)
    }
   

   
    
 
  }
  

  console.log(userForRegData)
  const dispatch = useDispatch()

  const changeLoginStatus = (status) => {
  console.log(status)
  dispatch(registerState({status:status}))
  }

  return (
    <div className='signup-container'>

      <div className='signup-title-des'>
        <div className='signup-title font-title'>Create New Account</div>
        <div className='signup-description'>Please enter details</div>
      </div>

      <div className='signup-auth-boxes'>

        <div className='auth-input-box'>
          <div className='auth-input-title'>First Name</div>

          <div className='user-input-box'>
          <input name='firstname' value={userForRegData.firstname} onChange={(e)=>{getRegUserData(e)}} className='signup-input-field' type='text' />

          

          

          </div>
       
        </div>

        <div className='auth-input-box'>
          <div className='auth-input-title'>Last Name</div>
          <input name='lastname' value={userForRegData.lastname} onChange={(e)=>{getRegUserData(e)}} className='signup-input-field' type='text' />
        </div>

        <div className='auth-input-box'>
          <div className='auth-input-title'>Email Address</div>

          <div className='user-input-box'>
          


            <input onClick={()=>{setIsEmailClicked(true)}} name='email' value={userForRegData.email} onChange={(e) => { getRegUserData(e) }} className='signup-input-field' type='text' />

            {userForRegData.email != '' && isEmailClicked === true && isValidEmail === true ? (
            <span className='tick-icon'>
              <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 30 30"
                stroke='green'>
                <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
              </svg>
            </span>) 
            : isEmailClicked === true && isValidEmail === false ? (
              <span className='cross-icon'>
              <svg x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24"
                stroke='red'>
                <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59 L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z"></path>
              </svg>
            </span>
            )
            :
            
            ("")}


          
          </div>
         
        </div>

        <div className='auth-input-box'>
          <div className='auth-input-title'>Password</div>

          <div className='user-input-box'>
            <input onClick={()=>(setIsPasswordClicked(true))} name='password' value={userForRegData.password} onChange={(e) => { getRegUserData(e) }} className='signup-input-field' type='text' />

            { userForRegData.password.length >= 6 && isPasswordClicked == true ? ( <span className='tick-icon'>
              <svg x="0px" y="0px" width="20px" height="20px" viewBox="0 0 30 30"
                stroke='green'>
                <path d="M 26.980469 5.9902344 A 1.0001 1.0001 0 0 0 26.292969 6.2929688 L 11 21.585938 L 4.7070312 15.292969 A 1.0001 1.0001 0 1 0 3.2929688 16.707031 L 10.292969 23.707031 A 1.0001 1.0001 0 0 0 11.707031 23.707031 L 27.707031 7.7070312 A 1.0001 1.0001 0 0 0 26.980469 5.9902344 z"></path>
              </svg>
            </span>)
            : userForRegData.password.length <= 6 && isPasswordClicked == true  ?      
            (<span className='cross-icon'>
              <svg x="110px" y="0px" width="20" height="20" viewBox="0 0 24 24"
                stroke='red'>
                <path d="M12,2C6.47,2,2,6.47,2,12s4.47,10,10,10s10-4.47,10-10S17.53,2,12,2z M17,15.59L15.59,17L12,13.41L8.41,17L7,15.59 L10.59,12L7,8.41L8.41,7L12,10.59L15.59,7L17,8.41L13.41,12L17,15.59z"></path>
              </svg>
            </span>):
            ("")
            
            }
            
          </div>
         
          
        </div>

      </div>

      <div className='signup-auth-checkbox'>
        <input name='checked' onClick={()=>{setChecked(!checked)}} type='checkbox' id='agreetocheckbox' />
        <label for="agreetocheckbox">I agree to the <b className='terms-conditions'>Terms & Conditions</b></label>
      </div>

      <button onClick={()=>UserSignUp()} disabled = {!isAllFieldsFilled} style={{opacity:`${isAllFieldsFilled && isValidEmail ? '1' : '0.3 '}`}} className={`${isAllFieldsFilled && isValidEmail ? 'signup-auth-button cursor' : 'signup-auth-button'}`}>Signup</button>

      {isLoading ? (<div className='loading-icon-box'>
        <img style={{ width: '30px', height: '30px' }} src={loadingIcon} />
      </div>) : ("")}
     

      <div>already registered ? <b className='terms-conditions' onClick={()=>changeLoginStatus('registered')}>login</b> </div>

    </div>
  )
}

export default SignUp