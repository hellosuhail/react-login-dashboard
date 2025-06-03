import React from "react";

const Card = ({ pokemon, index }) => {
  const openModal = () => {
    const modal = document.getElementById(`stats_modal_${index}`);
    if (modal) modal.showModal();
  };

  return (
    <div>
      <div
        className="shadow-gray-500 rounded-xl md:w-56 shadow-md p-4 hover:shadow-lg transition flex flex-col items-center"
        key={index}
      >
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          className="w-20 h-20"
        />

        <h4 className="text-lg font-semibold capitalize mb-2">
          {pokemon.name}
        </h4>

        <p className="text-sm text-gray-600">Height : {pokemon.height}</p>
        <p className="text-sm text-gray-600">
          Type: {pokemon.types.map((t) => t.type.name).join(", ")}
        </p>

        {/* View Stats Button */}
        <button
          onClick={openModal}
          className="text-green-600 cursor-pointer hover:underline text-sm mt-2"
        >
          View Details
        </button>
      </div>

      {/* Modal */}
      <dialog id={`stats_modal_${index}`} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg capitalize">{pokemon.name} </h3>
          <ul className="py-4 space-y-1">
            {pokemon.stats.map((stat, i) => (
              <li key={i}>
                <span className="font-semibold capitalize">{stat.stat.name}:</span>{" "}
                {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
      </dialog>
    </div>
  );
};

export default Card;
