import React from 'react'

const Card = ({ pokemon }) => {

    return (
        <div>
            <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition flex flex-col items-center" >

                <img src={pokemon.sprites.front_default} alt={pokemon.name} className="w-20 h-20" />

                <h4 className="text-lg font-semibold capitalize text-gray-700 mb-2">{pokemon.name}</h4>
                <p className='text-sm text-gray-600'>Height : {pokemon.height}</p>
                <p className="text-sm text-gray-600">Type: {pokemon.types.map(t => t.type.name).join(', ')} </p>
                <a href={pokemon.url} target="_blank" rel="noreferrer" className="text-indigo-500 text-sm hover:underline cursor-pointer" >
                    View Details
                </a>
            </div>

        </div>
    )
}

export default Card
