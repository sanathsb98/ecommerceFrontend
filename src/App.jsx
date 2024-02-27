import { useState } from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';
import SignUpSignIn from './pages/signupsignin/SignUpSignIn';
import Home from './pages/home/Home';
import ProtectedRoute from './auth/ProtectedRoute';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<SignUpSignIn/>}/>
      <Route element={<ProtectedRoute/>}>
      <Route path='/home' element={<Home/>}/>
      </Route>
    </Routes>
    </Router>
    </>
  )
}

export default App
