import React, { useContext, useEffect, useState } from "react";
import { poki } from "../App";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

const ViewPokemon = () => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [favorite, setFavorite] = useState(() => {
    const saved = localStorage.getItem("fav");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("fav", JSON.stringify(favorite));
  }, [favorite]);

  const toggleFavorite = (pokemonId, name, type, height) => {
    setFavorite((prevFavs) => {
      const exists = prevFavs.some((p) => p.id === pokemonId);

      if (exists) {
        
        return prevFavs.filter((p) => p.id !== pokemonId);
      } else {
      
        return [...prevFavs, { id: pokemonId, name, type, height }];
      }
    });
  };

  const data = useContext(poki);
  return (
    <div>
      <div className="overflow-x-auto">
        {data.results.length === 0 ? (
          <div className="text-center text-blue-500 p-6 text-lg mt-4">
            No Pokemon found.
          </div>
        ) : (
          <div className="p-4">
              {data.pokemonList.length !== 0 && favorite.length !== 0 && (
                <div className="">
                <h1 className="w-full text-2xl text-center text-yellow-400 p-2 justify-center">Favorite Pokemons</h1>
            <table className='"table-auto w-full text-sm border rounded-lg shadow mb-4 text-center'>
                <>
                  <thead className="border-1 bg-amber-100 h-10">
                    <tr>
                      <th>Sno.</th>
                      <th>Name</th>
                      <th>Type</th>
                      <th>Height</th>
                      <th>Favorite</th>
                    </tr>
                  </thead>

                  <tbody>
                    {favorite.map((f, index) => (
                      <tr className="border-1" key={f.id}>
                        <td>{index + 1}</td>
                        <td>{f.name}</td>
                        <td>{f.type}</td>
                        <td>{f.height}dm</td>

                        <td>
                          <button className="btn btn-sm btn-error text-white"
                            onClick={() =>
                              toggleFavorite(f.id, f.name, f.type, f.height)
                            }
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </>
            </table></div>
              )}
            <h1 className="w-full text-2xl text-center text-blue-400 p-2 justify-center">All Pokemons</h1>

            <table className="table-auto w-full text-sm border rounded-lg shadow text-center">
              <thead className="border-1 bg-blue-100 h-10">
                <tr>
                  <th>Sno.</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Height</th>
                  <th>View Details</th>
                  <th>Favorite</th>
                </tr>
              </thead>
              <tbody>
                {data.results.map((pokemon, index) => {
                  const isFav = favorite.includes(index);
                  return (
                    <tr key={index} className="border-1">
                      <th>{index + 1}</th>
                      <td>{pokemon.name}</td>
                      <td>
                        {pokemon.types.map((ty) => ty.type.name).join(", ")}
                      </td>
                      <td>{pokemon.height}dm</td>
                      <td>
                        <button
                          className="link text-blue-500"
                          onClick={() => {
                            setSelectedPokemon(pokemon);
                            document
                              .getElementById("pokemon_modal")
                              .showModal();
                          }}
                        >
                          View Details
                        </button>
                      </td>
                      <td>
                        <button
                          onClick={() =>
                            toggleFavorite(
                              pokemon.id,
                              pokemon.name,
                              pokemon.types[0].type.name,
                              pokemon.height
                            )
                          }
                        >
                          {isFav ? (
                            <FaStar className="text-yellow-500 text-lg" />
                          ) : (
                            <FaRegStar className="text-gray-400 text-lg" />
                          )}
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <dialog id="pokemon_modal" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                {selectedPokemon && (
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="sm:w-1/3 justify-center items-center flex">
                      <img
                        className="w-32"
                        src={selectedPokemon.sprites.front_default}
                        alt={selectedPokemon.name}
                      />
                    </div>
                    <div className="sm:w-2/3">
                      <h2 className="text-lg font-semibold capitalize">
                        {selectedPokemon.name}
                      </h2>
                      <p className="text-sm text-gray-600">
                        Height: {(selectedPokemon.height / 10).toFixed(1)} m
                      </p>
                      <p className="text-sm text-gray-600">
                        Weight: {(selectedPokemon.weight / 10).toFixed(1)} kg
                      </p>
                      <p className="text-sm text-gray-600">
                        Types:{" "}
                        {selectedPokemon.types
                          .map((t) => t.type.name)
                          .join(", ")}
                      </p>
                      <p className="text-sm text-gray-600">
                        Abilities:{" "}
                        {selectedPokemon.abilities
                          .map((a) => a.ability.name)
                          .join(", ")}
                      </p>
                       <ul className="py-4 space-y-1">
                      <p>Combat Attributes</p>
            {selectedPokemon.stats.map((stat, i) => (
              <li key={i}>
                <span className="text-sm text-gray-600">{stat.stat.name}:</span>{" "}
                {stat.base_stat}
              </li>
            ))}
          </ul>
                    </div>
                  </div>
                )}
              </div>
            </dialog>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPokemon;
