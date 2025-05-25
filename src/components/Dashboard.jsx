import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from './Card';

const Dashboard = ({ setIsLoggedIn }) => {
  const [pokemonList, setPokemonList] = useState([]);
  const [firstWord, setFirstWord] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20');
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

  return (
    <div className="min-h-screen bg-blue-100 ">
      <div className="flex justify-between items-center p-6 bg-blue-200 mb-8">
        <h2 className="text-3xl font-bold text-indigo-600">Pokemon Dashboard</h2>

        <div className="flex items-center gap-4">
          <button onClick={handleLogout}  className="bg-red-500 cursor-pointer text-white px-4 py-2 rounded-lg hover:bg-red-600 transition">
            Logout
          </button>

          <span className="w-10 h-10 flex items-center justify-center text-lg font-semibold bg-indigo-600 text-white rounded-full shadow-md">
            {firstWord}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 m-4 gap-6">
        {pokemonList.map((pokemon, index) => (
          <Card key={index} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
