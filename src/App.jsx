import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });

 useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const loggedIn = storedUser?.loggedIn === true;
  setIsLoggedIn(loggedIn);
}, [location.pathname]);


  return (
    <Routes>
      <Route path="/" element={   isLoggedIn ? (<Navigate to="/dashboard" replace />) : (<Login setIsLoggedIn={setIsLoggedIn} />  )}/>
      <Route  path="/dashboard"  element={ isLoggedIn ? ( <Dashboard setIsLoggedIn={setIsLoggedIn} />  ) : (
            <Navigate to="/" replace /> ) } />
    </Routes>
  );
};

export default App;
