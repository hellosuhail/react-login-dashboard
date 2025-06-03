import React, { useContext, useEffect, useState } from "react";
import { poki } from "../App";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaAnglesUp, FaUpDown } from "react-icons/fa6";

const Nav = () => {
  const [firstWord, setFirstWord] = useState(null);
  const [show, setShow] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 90);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    const storeUser = JSON.parse(localStorage.getItem("user"));
    if (storeUser?.email?.length > 0) {
      const first = storeUser.email[0].toUpperCase();
      setFirstWord(first);
    }
  }, []);

  const data = useContext(poki);
  console.log(data.searchTerm);

  const handleLogout = () => {
    localStorage.removeItem("user");
    data.setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <div className={`navbar shadow-4xl  transition-all duration-300 ease-in-out transform shadow-black md:h-20 bg-blue-400 ${show? "bg-gray-500  shadow-md fixed z-10":"bg-transparen "}`}>
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn text-white btn-ghost lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu text-white menu-sm dropdown-content bg-blue-400 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <NavLink>Deashboard</NavLink>
              </li>

              <li>
                <NavLink to="/viewallpokemon">View All Pokemon</NavLink>
              </li>
            </ul>
          </div>
          <a className="btn btn-ghost md:text-xl text-white">Pokemon</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 text-white">
            <li>
              <NavLink to="/dashboard">Dashboard</NavLink>
            </li>

            <li>
              <NavLink to="/viewallpokemon">View All Pokemons</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </div>
        <div className="flex gap-2 items-center justify-end flex-1">
          <input
            type="text"
            value={data.searchTerm}
            onChange={(e) => data.setSearchTerm(e.target.value)}
            placeholder="Search Pokemon by name"
            className="input input-bordered w-24 md:w-auto"
          />
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-14 bg-blue-500 p-1 rounded-full">
                <span className="text-2xl text-white">{firstWord}</span>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/settings">Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
  {show && (
            
        <div className="rounded-3xl fixed bottom-16 cursor-pointer right-0 w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white text-lg p-4"onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><FaAnglesUp/></div>
    )
  } 
</div>
  );
};

export default Nav;
