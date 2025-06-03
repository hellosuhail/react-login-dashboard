import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen px-6 py-12 flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-blue-700 mb-4">About This Pokemon Dashboard</h1>
      
      <p className="text-lg max-w-2xl mb-6">
        This interactive dashboard allows you to explore and analyze Pokemon data fetched from the open-source
        <a href="https://pokeapi.co" target="_blank" rel="noreferrer" className="text-blue-500 underline ml-1">PokeAPI</a>.
        It provides a visual breakdown of types, height rankings, search functionality, and a list view of all available Pokemon.
      </p>

      <ul className="text-left max-w-xl list-disc list-inside space-y-2">
        <li> Search Pokemon by name or type using fuzzy search.</li>
        <li> View a pie chart showing Pokemon type distribution.</li>
        <li> See the top 10 tallest Pokemon in a bar chart.</li>
        <li> Explore a sortable and paginated list of all Pokemon.</li>
        <li> Responsive layout for desktop and mobile devices.</li>
      </ul>

      <a href="https://pokemondb.net/" target='_blank' className='link text-blue-500'>Learn about Pokemon</a>

      <p className="text-md text-gray-500 mt-10">
        Built with using React Tailwind CSS, ApexCharts, and Fuse.js.
      </p>

      <p className="text-md text-gray-400 mt-2">
        Created by <strong>Suhail</strong> – for learning & demonstration purposes.
      </p>
    </div>
  );
};

export default About;
