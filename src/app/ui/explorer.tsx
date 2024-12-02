'use client';
import { useState } from 'react';
import PokemonList from './pokemon-list';
import { AllGens, Pokemon } from '../lib/definitions';
import NavBar from './nav-bar';

interface GenerationsProps {
  data: AllGens
}

export default function Explorer({data}: GenerationsProps) {
  const [gen, setGen] = useState<string>('first');
  const [myList, setMyList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('')

  function addToMyList (pokemon: Pokemon) {
    setMyList((prevList) => [...prevList, pokemon])
  }

  function removeFromList (pokemon: Pokemon) {
    setMyList(myList.filter((pok) => pok.id !== pokemon.id));
  }

  function listCheck (pokemon: Pokemon): boolean {
    return myList.some((pok) => pok.id === pokemon.id);
  }

  function changeGen (generation: string) {
    setGen(generation);
  }

  function searchFor (term: string) {
    setSearchTerm(term);
  }

  return (
    <>
    <NavBar 
      changeGen={changeGen}
      gen={gen}
      searchFor={searchFor}
      searchTerm={searchTerm}
    />
    <PokemonList 
      data={data} 
      myList={myList}
      addToMyList={addToMyList} 
      removeFromList={removeFromList} 
      gen={gen} 
      listCheck={listCheck} 
      searchTerm={searchTerm}
    />
    </>
  );
}