import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignUpSignIn from './pages/signupsignin/SignUpSignIn';
import Home from './pages/home/Home';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<SignUpSignIn/>}/>
      <Route path='/home' element={<Home/>}/>
    </Routes>
    </Router>
    </>
  )
}

export default App
