import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import UserProfile from './components/Profile';
import Fuse from 'fuse.js';
import Nav from './components/Nav';
import Settings from './components/Setting;';
import Menu from './components/ViewPokemon';
import axios from 'axios';
import About from './components/About';

export const poki = React.createContext();

const App = () => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('loggedIn') === 'true';
  });
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const totalPages = 30;

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=300');
        const basicList = res.data.results;

        const detailedList = await Promise.all(
          basicList.map(pokemon => axios.get(pokemon.url).then(res => res.data))
        );
        setPokemonList(detailedList);

      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);



  const selectPageHandler = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) {
      setPage(pageNum);
    }
  };

  const renderPageButtons = () => {
    const buttons = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        buttons.push(
          <button
            key={i}
            className={`join-item btn  ${page === i ? 'bg-gray-500 text-white' : ''}`}
            onClick={() => selectPageHandler(i)}
          >
            {i}
          </button>
        );
      }
    } else {
      if (page > 2) {
        buttons.push(
          <button key={1} className="join-item btn" onClick={() => selectPageHandler(1)}>1</button>
        );
      }
      if (page > 3) {
        buttons.push(<span key="start-ellipsis" className="px-2">...</span>);
      }

      for (let i = page - 1; i <= page + 1; i++) {
        if (i > 1 && i < totalPages) {
          buttons.push(
            <button
              key={i}
              className={`join-item btn  ${page === i ? 'bg-gray-400 text-white' : ''}`}
              onClick={() => selectPageHandler(i)}
            >
              {i}
            </button>
          );
        }
      }

      if (page < totalPages - 2) {
        buttons.push(<span key="end-ellipsis" className="px-2">...</span>);
      }
      if (page < totalPages - 1) {
        buttons.push(
          <button key={totalPages} className="join-item btn" onClick={() => selectPageHandler(totalPages)}>
            {totalPages}
          </button>
        );
      }
    }

    return buttons;
  };

  const fuse = new Fuse(pokemonList, {
    keys: ['name', 'types.type.name'],
    threshold: 0.4,
  });
  const results = searchTerm ? fuse.search(searchTerm).map(result => result.item) : pokemonList;
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    const loggedIn = storedUser?.loggedIn === true;
    setIsLoggedIn(loggedIn);
  }, [location.pathname]);


  return (
    <poki.Provider value={{ selectPageHandler, results, page, renderPageButtons, totalPages, pokemonList, setPokemonList, searchTerm, setSearchTerm, setIsLoggedIn }}>
      {isLoggedIn ? <Nav /> : ""}
      <Routes>
        <Route path="/" element={isLoggedIn ? (<Navigate to="/dashboard" replace />) : (<Login />)} />
        <Route path="/dashboard" element={isLoggedIn ? (<Dashboard setIsLoggedIn={setIsLoggedIn} />) : (
          <Navigate to="/" replace />)} />
        <Route path='/profile' element={<UserProfile />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/viewallPokemon' element={<Menu />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </poki.Provider>
  );
};

export default App;
