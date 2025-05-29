import React from 'react'

const Search = () => {
  return (
    <div>
      <input
  type="text"
  placeholder="Search Pokémon"
  className="px-4 py-2 border rounded-lg w-full mb-4"
  onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
/>

    </div>
  )
}

export default Search
