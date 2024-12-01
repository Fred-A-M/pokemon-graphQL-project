import { Pokemon, pokemonImage } from '../lib/definitions';
import { capitalize } from 'lodash';
import Image from 'next/image';
import { HiOutlineHeart, HiHeart, HiOutlineXCircle } from 'react-icons/hi2';

interface PokemonListProps {
  selection: Pokemon[],
  gen: string,
  addToMyList?: (pokemon: Pokemon) => void,
  removeFromList?: (pokemon: Pokemon) => void,
  listCheck: (pokemon: Pokemon) => boolean;
}

export default function PokemonList({selection, gen, addToMyList, removeFromList, listCheck}: PokemonListProps) {


  if (gen === 'list' && selection.length === 0) {
    console.log('attaboy');
    return (
      <div>Your list is empty, go add some Pokemon!</div>
    )
  }

  return (
    <>
    <div className='grid grid-cols-2 sm:grid-cols-5 gap-5 sm:gap-32 content-center'>
        {selection.map((pokemon) => (
          <div key={pokemon.id} className='flex flex-col justify-center items-center bg-slate-500 rounded-lg p-2'>
            <h2>{capitalize(pokemon.name)}</h2>
            <Image src={pokemonImage + pokemon.id + '.png'} alt={pokemon.name} height={150} width={150} />
            <div onClick={() => gen === 'list' || listCheck(pokemon) ? removeFromList?.(pokemon) : addToMyList?.(pokemon)}
              className='hover:cursor-pointer'> 
              {gen === 'list' ? (
                <HiOutlineXCircle size={25} />
              ) : listCheck(pokemon) ? (
                <HiHeart size={25} />
              ) : (
                <HiOutlineHeart size={25} />
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}