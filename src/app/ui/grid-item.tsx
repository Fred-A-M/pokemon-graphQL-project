import Image from 'next/image'
import { Pokemon, pokemonImage } from '../lib/definitions';
import { HiOutlineHeart, HiHeart, HiOutlineXCircle, HiInformationCircle } from 'react-icons/hi2';
import { capitalize } from 'lodash';
import { useState } from 'react';
// import Link from 'next/link';


interface GridItemProps {
  pokemon: Pokemon,
  gen: string,
  addToMyList: (pokemon: Pokemon) => void,
  removeFromList: (pokemon: Pokemon) => void,
  listCheck: (pokemon: Pokemon) => boolean;
}

export default function GridItem ({pokemon, gen, addToMyList, removeFromList, listCheck}: GridItemProps) {
  const [showInfo, setShowInfo] = useState<boolean>(false)

  return (
    <>
    <div key={pokemon.id} className={`flex flex-col justify-between items-center ${showInfo ? 'bg-circle' : 'bg-box'} bg-box rounded-lg p-2 shadow-xl text-background `}>
      <h1 className='font-bold text-xl'>{capitalize(pokemon.name)}</h1>
      {showInfo ?  (
        <div className='flex flex-col items-center justify-center text-center h-[145px] sm:h-[150px] font-bold text-sm sm:text-base'>
          <div>ID: {pokemon.id}</div>
          <div>Habitat: {capitalize(pokemon.pokemon_v2_pokemonhabitat.name)}</div>
          <div>Weight: {pokemon.pokemon_v2_pokemons[0].weight}</div>
          <div>Height: {pokemon.pokemon_v2_pokemons[0].height}</div>
        </div>) : (
        // <Link href={`/pokemon-page/${pokemon.id}`}>
        <Image 
          src={pokemonImage + pokemon.id + '.png'} 
          alt={pokemon.name} 
          height={150} 
          width={150}
        />
        // </Link>
      )}
      <div className='hover:cursor-pointer flex justify-between w-full'> 
        <HiInformationCircle 
          size={25} 
          onClick={() => setShowInfo(!showInfo)}
          onMouseDown={(e) => e.preventDefault()} 
        />
        {gen === 'list' ? (
          <HiOutlineXCircle
            size={25} 
            onClick={() => removeFromList(pokemon)}
            onMouseDown={(e) => e.preventDefault()}  
          />
          ) : listCheck(pokemon) ? (
          <HiHeart 
            size={25} 
            onClick={() => removeFromList(pokemon)}
            onMouseDown={(e) => e.preventDefault()} 
          />
          ) : (
          <HiOutlineHeart 
            size={25} 
            onClick={() => addToMyList(pokemon)}
            onMouseDown={(e) => e.preventDefault()} 
          />
        )}
      </div>
    </div>
    </>
  )
}