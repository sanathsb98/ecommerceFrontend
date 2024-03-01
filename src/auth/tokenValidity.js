// tokenUtils.js
import Cookies from "js-cookie";

export const checkTokenValidity = async (navigate) => {

  const email = localStorage.getItem('loggedInEmail');
  const token = localStorage.getItem('token');


  if (token) {
    try {
      const response = await fetch("https://ecommerce-backend-eight-azure.vercel.app/api/data", {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email })
      });

      if (!response.ok) {
        localStorage.removeItem('rememberMeStatus');
        Cookies.remove('loggedInUser');
        localStorage.removeItem('token');
      
        navigate('/')

      }
    } catch (err) {
      console.log(err);
    }
  } else {
    // Token doesn't exist, redirect to sign-in page
 
    navigate('/')
  }
};

