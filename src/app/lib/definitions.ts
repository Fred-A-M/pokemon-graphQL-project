export interface Pokemon {
  __typename: string;
  name: string;
  id: number;
  pokemon_v2_pokemonhabitat: Habitat;
  pokemon_v2_pokemons: PokemonDetails[];
}

// Add these new interfaces
export interface PokemonDetails {
  weight: number;
  height: number;
  pokemon_v2_pokemonstats: PokemonStat[];
}

export interface PokemonStat {
  __typename: string;
  base_stat: number;
  pokemon_v2_stat: {
    name: string;
  };
}

interface Habitat {
  __typename: string;
  name: string;
}

export interface AllGens {
  gen1: Pokemon[];
  gen2: Pokemon[];
  gen3: Pokemon[];
}

export const pokemonImage =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/";
