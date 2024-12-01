'use client';
import { useState } from 'react';
import PokemonList from './pokemon-list';
import { AllGens, Pokemon } from '../lib/definitions';

interface GenerationsProps {
  data: AllGens
}

export default function Generations({data}: GenerationsProps) {
  const [gen, setGen] = useState<string>('first');
  const [myList, setMyList] = useState<Pokemon[]>([]);

  function addToMyList (pokemon: Pokemon) {
      setMyList((prevList) => [...prevList, pokemon])
  }

  function removeFromList (pokemon: Pokemon) {
    setMyList(myList.filter((pok) => pok.id !== pokemon.id));
  }

  function listCheck (pokemon: Pokemon): boolean {
    return myList.some((pok) => pok.id === pokemon.id);
  }

  return (
    <>
    <div className='flex justify-center gap-7 text-2xl mb-6'>
      <div onClick={() => setGen('first')}
        className={`${gen === 'first' ? 'bg-slate-400' : 'bg-slate-500'} rounded-lg p-2 hover:cursor-pointer`}>
        First Generation</div>
      <div onClick={() => setGen('second')}
        className={`${gen === 'second' ? 'bg-slate-400' : 'bg-slate-500'} rounded-lg p-2 hover:cursor-pointer`}>
        Second Generation</div>
      <div onClick={() => setGen('third')}
        className={`${gen === 'third' ? 'bg-slate-400' : 'bg-slate-500'} rounded-lg p-2 hover:cursor-pointer`}>
        Third Generation</div>
      <div onClick={() => setGen('list')}
        className={`${gen === 'list' ? 'bg-slate-400' : 'bg-slate-500'} rounded-lg p-2 hover:cursor-pointer`}>
        My Pokemon</div>
    </div>
    {gen === 'first' && <PokemonList selection={data.gen1} addToMyList={addToMyList} removeFromList={removeFromList}  gen={gen} listCheck={listCheck}/>}
    {gen === 'second' && <PokemonList selection={data.gen2} addToMyList={addToMyList} removeFromList={removeFromList}  gen={gen} listCheck={listCheck}/>}
    {gen === 'third' && <PokemonList selection={data.gen3} addToMyList={addToMyList} removeFromList={removeFromList}  gen={gen} listCheck={listCheck}/>}
    {gen === 'list' && <PokemonList selection={myList} removeFromList={removeFromList} gen={gen} listCheck={listCheck}/>}
    </>
  );
}
