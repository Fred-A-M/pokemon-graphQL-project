import { Pokemon, AllGens } from '../lib/definitions';
import GridItem from './grid-item';

interface PokemonListProps {
  data: AllGens,
  myList: Pokemon[],
  gen: string,
  searchTerm: string,
  addToMyList: (pokemon: Pokemon) => void,
  removeFromList: (pokemon: Pokemon) => void,
  listCheck: (pokemon: Pokemon) => boolean;
}

export default function PokemonList({data, myList, gen, searchTerm, addToMyList, removeFromList, listCheck}: PokemonListProps) {
  const key = gen === 'first' ? 'gen1' : gen === 'second' ? 'gen2' : 'gen3';
  const myListOrData = gen === 'list' ? myList : data[key];

  const searchedList = myListOrData.filter((pokemon) => {
    return pokemon.name.includes(searchTerm.toLowerCase())
  });

  if (searchTerm && searchedList.length === 0) {
    return (
      <div className='mt-[50vh] self-center text-4xl text-center text-circle2 font-bold'>No matching results, try another search.</div>
    )
  }

  if (gen === 'list' && myList.length === 0) {
    return (
      <div className='mt-[50vh] self-center text-4xl text-center text-circle2 font-bold'>Your list is empty, go add some Pokémon!</div>
    )
  }

  return (
    <>  
    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5 content-center px-8 mt-[270px]'>
        {searchTerm && searchedList.length > 0 ? searchedList.map((pokemon) => (
          <GridItem 
            key={pokemon.id}
            pokemon={pokemon} 
            gen={gen}
            addToMyList={addToMyList}
            removeFromList={removeFromList}
            listCheck={listCheck}
          />
        )) :
        myListOrData.map((pokemon) => (
          <GridItem 
            key={pokemon.id}
            pokemon={pokemon} 
            gen={gen}
            addToMyList={addToMyList}
            removeFromList={removeFromList}
            listCheck={listCheck}
          />
        ))}
      </div>
    </>
  );
}