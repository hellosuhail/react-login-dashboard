import React, { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom"

const Settings = () => {
  const [username, setUsername] = useState("User");
   const [darkMode, setDarkMode] = useState(()=>{
    const savedTheme = localStorage.getItem("theme")
    return savedTheme ? savedTheme === "dark" : false;
   });

   const navigate=useNavigate()


  useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.setItem("theme", "dark");
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.setItem("theme", "light");
  }
}, [darkMode]);

  
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const changeHandler=()=>{
 const existing = JSON.parse(localStorage.getItem("user")) || {};

  // Step 2: Update only the name
  const updated = {
    ...existing,
    name: username
  };

  // Step 3: Save the updated object back
  localStorage.setItem("user", JSON.stringify(updated));
    setUsername(username.toUpperCase())
  }

 useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.name) {
    setUsername(user.name.toUpperCase());
  }
}, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    // data.setIsLoggedIn(false);
    navigate('/');
  };
  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"} p-6`}>
      <div className="max-w-xl mx-auto shadow-md shadow-gray-500  dark:bg-gray-800  rounded-xl p-6">
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

    
          <label className="block mb-1 font-semibold">Display Name</label>
        <div className="mb-4 flex border rounded-lg">
          <input
            type="text"
            className="w-full p-2  dark:bg-gray-700 dark:text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={changeHandler} className="btn rounded-r-lg btn-primary">Change</button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold">Dark Mode</span>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only"
              checked={darkMode}
    onChange={() => setDarkMode(!darkMode)}
            />
            <div className="w-10 h-5 bg-gray-300 rounded-full shadow-inner dark:bg-gray-600">
              <div
                className={`w-5 h-5 bg-white dark:bg-gray-300 rounded-full shadow transform transition-transform ${
                  darkMode ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </div>
          </label>
        </div>

      
 <button  onClick={()=>navigate("/dashboard" )}  className="btn w-full py-2 m-2 btn-primary cursor-pointer text-white rounded-lg font-semibold"  >   
  Back </button>
        
        <button onClick={handleLogout} className="w-full m-2 cursor-pointer py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold"  >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Settings;
