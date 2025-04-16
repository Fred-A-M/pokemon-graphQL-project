'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Pokemon, pokemonImage } from '../../lib/definitions';
import { capitalize } from 'lodash';
import { HiOutlineArrowLeft } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { client } from '../../lib/apollo-client';
import { gql } from '@apollo/client';

interface PokemonPageProps {
  params: Promise<{ id: string }>;
}

// GraphQL query for a single Pokemon by ID
const GET_POKEMON_BY_ID = gql`
  query GetPokemonById($id: Int!) {
    pokemon_v2_pokemonspecies(where: {id: {_eq: $id}}) {
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

export default function PokemonPage({ params }: PokemonPageProps) {
  const resolvedParams = React.use(params);
  const id = resolvedParams.id;
  
  const router = useRouter();
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        // Using Apollo client to fetch data, matching your main page approach
        const result = await client.query({
          query: GET_POKEMON_BY_ID,
          variables: { id: parseInt(id) }
        });
        
        // Extract the pokemon from the result
        const fetchedPokemon = result.data.pokemon_v2_pokemonspecies[0];
        
        if (fetchedPokemon) {
          setPokemon(fetchedPokemon);
        }
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemon();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-circle"></div>
      </div>
    );
  }

  if (!pokemon) {
    return <div className="text-center py-10">Pokemon not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <button 
        onClick={() => router.back()}
        className="flex items-center text-circle2 hover:text-circle1 transition-colors mb-6"
      >
        <HiOutlineArrowLeft size={24} className="mr-2" />
        Back to list
      </button>

      <div className="bg-box text-background rounded-lg shadow-xl p-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Image
              src={`${pokemonImage}${id}.png`}
              alt={pokemon.name || 'Pokemon'}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          <div className="flex-grow">
            <h1 className="text-3xl font-bold mb-6">{capitalize(pokemon.name)}</h1>
            
            <div className="bg-circle1/20 p-5 rounded-lg mb-6">
              <h2 className="font-bold text-2xl mb-4">Stats</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-lg">
                <div>
                  <p className="mb-2"><span className="font-semibold">ID:</span> {pokemon.id}</p>
                  <p className="mb-2"><span className="font-semibold">Habitat:</span> {capitalize(pokemon.pokemon_v2_pokemonhabitat.name)}</p>
                </div>
                <div>
                  <p className="mb-2"><span className="font-semibold">Weight:</span> {pokemon.pokemon_v2_pokemons[0].weight}</p>
                  <p className="mb-2"><span className="font-semibold">Height:</span> {pokemon.pokemon_v2_pokemons[0].height}</p>
                </div>
              </div>
            </div>
            
            <div className="bg-circle2/20 p-5 rounded-lg">
              <h2 className="font-bold text-2xl mb-4">Additional Information</h2>
              <p className="mb-2 text-lg">
                {capitalize(pokemon.name)} is a fascinating Pokemon with unique characteristics. It lives in 
                {' '}{pokemon.pokemon_v2_pokemonhabitat.name} habitats and has a distinctive appearance.
              </p>
              
              <div className="mt-4">
                <button 
                  onClick={() => router.back()}
                  className="bg-circle hover:bg-circle1 transition-colors text-background font-bold py-2 px-6 rounded-lg"
                >
                  Return to Collection
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}