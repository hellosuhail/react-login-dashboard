import React, { useContext } from "react";
import Card from "./Card";
import PieChart from "./PieChart";
import BarChart from "./Barchart";
import { poki } from "../App";

const Dashboard = () => {
  const pokemons = useContext(poki);

  return (
    <div className="min-h-screen ">
      {pokemons.pokemonList.length === 0 && (
        <div className="flex items-center justify-center h-screen">
          <div className="text-2xl font-bold text-gray-700">
            Loading Pokemon data...
          </div>
        </div>
      )}

      <div className="flex flex-col w-full rounded-lg shadow-md p-6">
        <div className="md:flex overflow-hidden w-full md:justify-center md:items-center  md:px-4">
          {pokemons.pokemonList.length === 0 ? (
            "Loding.."
          ) : (
            <div className="w-full md:flex lock ">
              {" "}
              <PieChart pokemonList={pokemons.pokemonList} /> <BarChart />
            </div>
          )}
        </div>
        {pokemons.results.length === 0 ? (
          <div className="text-center text-blue-500 p-6 text-lg mt-4">
            No Pokemon found.
          </div>
        ) : (
          <div className="grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 mb-10 gap-6">
            {pokemons.results
              .slice((pokemons.page - 1) * 10, pokemons.page * 10)
              .map((pokemon, index) => (
                
                <Card key={index} pokemon={pokemon} />
              ))}
          </div>
        )}

        {pokemons.pokemonList.length > 0 && (
          <div className="join  flex justify-center items-center gap-2">
            <button
              className="join-item btn  "
              onClick={() => pokemons.selectPageHandler(pokemons.page - 1)}
              disabled={pokemons.page === 1}
            >
              « previous
            </button>

            {pokemons.renderPageButtons()}

            <button
              className="join-item btn"
              onClick={() => pokemons.selectPageHandler(pokemons.page + 1)}
              disabled={pokemons.page === pokemons.totalPages}
            >
              Next »
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
