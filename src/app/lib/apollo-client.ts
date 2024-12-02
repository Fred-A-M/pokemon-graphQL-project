import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://beta.pokeapi.co/graphql/v1beta', 
  cache: new InMemoryCache(),
  ssrMode: true,
});

export const GET_POKEMON = gql`
  query GetPokemons {
    gen1: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-i"}}}, order_by: {id: asc}) {
      name
      id
      pokemon_v2_pokemonhabitat {
        name
      }
        pokemon_v2_pokemons {
        weight
        height
      }
    }
  
    gen2: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-ii"}}}, order_by: {id: asc}) {
      name
      id
      pokemon_v2_pokemonhabitat {
        name
      }
        pokemon_v2_pokemons {
        weight
        height
      }
    }
  
    gen3: pokemon_v2_pokemonspecies(where: {pokemon_v2_generation: {name: {_eq: "generation-iii"}}}, order_by: {id: asc}) {
      name
      id
      pokemon_v2_pokemonhabitat {
        name
      }
        pokemon_v2_pokemons {
        weight
        height
      }
    }
  }
`;