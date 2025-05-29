import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';
import PieChart from './PieChart';
import BarChart from './Barchart';

const Dashboard = ({ setIsLoggedIn }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [firstWord, setFirstWord] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
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


        const storeUser = JSON.parse(localStorage.getItem('user'));
        if (storeUser?.email?.length > 0) {
          const first = storeUser.email[0].toUpperCase();
          setFirstWord(first);
        }
      } catch (error) {
        console.error('Error fetching Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

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
            className={`join-item btn ${page === i ? 'bg-gray-400 text-white' : ''}`}
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
              className={`join-item btn ${page === i ? 'bg-gray-400 text-white' : ''}`}
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
   const filteredList = pokemonList.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen ">
      {pokemonList.length === 0 && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-bold text-gray-700">
            Loading Pokémon data...
          </div>
        </div>
      )}
   <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 p-6 bg-blue-200 mb-8 rounded-lg shadow">
  <div className="flex-1 md:max-w-sm">
    <input
      type="text"
      placeholder="Search Pokemon by name"
      className="w-full px-4 py-2 border border-gray-300  rounded-lg shadow-sm focus:outline-none focus:ring-2 bg-white"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>

  
  <h2 className="text-2xl md:text-3xl font-bold text-indigo-600 text-center md:text-left">
    Pokemon Dashboard
  </h2>
  <div className="flex items-center gap-4">
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Logout
    </button>

    <span className="w-10 h-10 flex items-center justify-center text-lg font-semibold bg-indigo-600 text-white rounded-full shadow-md">
      {firstWord}
    </span>
  </div>
</div>

      <div className="flex flex-col w-full bg-white rounded-lg shadow-md p-6">
<div className="flex w-full justify-center items-center  p-4">
 
    { pokemonList.length ===0 ? "Loding..":<div className="flex"> <PieChart pokemonList={pokemonList}/></div>}
    <BarChart />
       
</div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 m-4 gap-6">
        {filteredList
          .slice((page - 1) * 10, page * 10)
          .map((pokemon, index) => (
            <Card key={index} pokemon={pokemon} />
          ))}
      </div>

        {pokemonList.length > 0 && (
          <div className="join fixed right-0 bottom-0 left-0 mt-6 flex justify-center items-center gap-2">
            <button
              className="join-item btn"
              onClick={() => selectPageHandler(page - 1)}
              disabled={page === 1}
            >
              «
            </button>

            {renderPageButtons()}

            <button
              className="join-item btn"
              onClick={() => selectPageHandler(page + 1)}
              disabled={page === totalPages}
            >
              »
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
