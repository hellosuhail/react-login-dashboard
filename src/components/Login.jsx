import React, { useContext, useState } from 'react';
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";
import { useNavigate } from 'react-router-dom';
import { poki } from '../App';

const Login = ( ) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loggedIn=useContext(poki)

  const handleLogin = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    if (password.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }

    const user = {
      name:name,
      email: email,
      loggedIn: true
    }
    localStorage.setItem('user', JSON.stringify(user));

    loggedIn.setIsLoggedIn(true);
    navigate('/dashboard');
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="md:w-full max-w-md bg-white text-black p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300">
        <h2 className="text-4xl font-bold text-center text-indigo-600 mb-8">Welcome</h2>

         <label className="input-validator relative mb-6 block">
          
          <input
            type="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="enter your name"
            required
            className="w-full pl-4 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        </label>


        <label className="input-validator relative mb-6 block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-400">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5">
                <rect width="20" height="16" x="2" y="4" rx="2" />
                <path d="M22 7 13.03 12.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </g>
            </svg>
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="mail@site.com"
            required
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"/>
        </label>
        <div className="validator-hint hidden">Enter valid email address</div>


        <div className="flex m-2 ml-0 border justify-center w-full h-12 p-4 border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none">
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full border-0 outline-0 pr-2"
          />
          <span onClick={togglePassword} className="text-2xl cursor-pointer">{showPassword ? <LuEye /> : <LuEyeClosed />}</span>
        </div>


        <p className="text-xs text-gray-500 mb-6 text-center">
          Password must be at least 8 characters long.
        </p>


        <button
          onClick={handleLogin}
          className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 shadow-md"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
