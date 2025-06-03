import React from "react";

const BarChart = () => {
  const pokemons = [
    { name: "Eternatus", height: 200 },
    { name: "Wailord", height: 145 },
    { name: "Rayquaza", height: 108 },
    { name: "Onix", height: 88 },
    { name: "Steelix", height: 92 },
    { name: "Gyarados", height: 65 },
    { name: "Dragonite", height: 55 },
    { name: "Tyranitar", height: 55 },
    { name: "Charizard", height: 45 },
    { name: "Snorlax", height: 42 },
  ];
  const name = "ash";
  console.log("hello " + name);
  const maxHeight = Math.max(...pokemons.map((p) => p.height));

  return (
    <div className=" p-6 mb-4 md:w-[30%] rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
        Top 10 Tallest Pokemon
      </h2>
      <div className="space-y-4">
        {pokemons.map((pokemon) => {
          const barWidth = (pokemon.height / maxHeight) * 100;
          return (
            <div key={pokemon.name}>
              <div className="flex justify-between text-sm font-medium  mb-1">
                <span>{pokemon.name}</span>
                <span>{pokemon.height} dm</span>
              </div>
              <div className="w-full bg-gray-200 h-5 rounded-full">
                <div
                  className="bg-indigo-500 h-5 rounded-full transition-all duration-300"
                  style={{ width: `${barWidth}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BarChart;
