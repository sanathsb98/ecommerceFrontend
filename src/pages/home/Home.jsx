import React,{useEffect} from 'react';
import '../home/Home.jsx';
import { checkTokenValidity } from '../../auth/tokenValidity.js';

const Home = () => {

  useEffect(()=>{
  checkTokenValidity()
  },[])
  
  return (
    <div>Home</div>
  )
}

export default Home