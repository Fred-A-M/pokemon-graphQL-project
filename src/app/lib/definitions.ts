export interface Pokemon {
  __typename: string,
  name: string,
  id: number
  pokemon_v2_pokemonhabitat: Habitat;
}

interface Habitat {
  __typename: string,
  name: string,
}

export interface AllGens {
  gen1: Pokemon[];
  gen2: Pokemon[];
  gen3: Pokemon[];
}

export const pokemonImage = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'