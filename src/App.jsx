import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SignUpSignIn from './pages/signupsignin/SignUpSignIn';
import Home from './pages/home/Home';
import { useSelector } from 'react-redux';

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' element={<SignUpSignIn />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;

export const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token, navigate]);

  // You might want to add additional token validation logic here

  // Render children only if token is valid
  return token ? children : null;
};
