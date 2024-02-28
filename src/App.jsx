import { useState ,useEffect} from 'react';
import './App.css';
import {BrowserRouter as Router,Routes,Route, useNavigate} from 'react-router-dom';
import SignUpSignIn from './pages/signupsignin/SignUpSignIn';
import Home from './pages/home/Home';




function App () {

  const logged = true;

  return (
    <>
    <Router>
    <Routes>
      <Route path='/' element={<SignUpSignIn/>}/>
      <Route path='/home' element={
        <ProtectedRoute user={logged}>
          <Home/>
        </ProtectedRoute>
      }/>
    </Routes>
    </Router>
    </>
  )
}

export default App


//protected routes:
export const ProtectedRoute = ({ user, children }) => {
  const navigate = useNavigate();

  useEffect(() => {
 
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  return user ? children : null;
};