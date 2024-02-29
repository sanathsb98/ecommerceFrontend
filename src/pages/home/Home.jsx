import React,{useEffect} from 'react';
import '../home/Home.jsx';
import '../home/Home.css';
import {useNavigate} from "react-router-dom";
import { checkTokenValidity } from '../../auth/tokenValidity.js';


const Home = () => {

  const navigate = useNavigate()

  useEffect(()=>{
    checkTokenValidity(navigate)
  },[])

 
  
  return (
    <div className='home-page'>Home</div>
  )
}

export default Home