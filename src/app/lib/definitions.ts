export interface Pokemon {
  __typename: string;
  name: string;
  id: number;
  pokemon_v2_pokemonhabitat: Habitat;
  pokemon_v2_pokemons: Mass[]; 
}

interface Habitat {
  __typename: string;
  name: string;
}

interface Mass {
  weight: number;
  height: number;
}


export interface AllGens {
  gen1: Pokemon[];
  gen2: Pokemon[];
  gen3: Pokemon[];
}

export const pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'