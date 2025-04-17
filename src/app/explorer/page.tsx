"use client";
import { useState, useEffect } from "react";
import PokemonList from "../ui/pokemon-list";
import { AllGens, Pokemon } from "../lib/definitions";
import NavBar from "../ui/nav-bar";
import { client } from "@/app/lib/apollo-client";
import { GET_POKEMON } from "@/app/lib/apollo-client";

export default function ExplorerPage() {
  const [gen, setGen] = useState<string>("first");
  const [myList, setMyList] = useState<Pokemon[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [data, setData] = useState<AllGens | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await client.query({
          query: GET_POKEMON,
        });
        setData(result.data as AllGens);
      } catch (err) {
        console.error("Error fetching Pokémon data:", err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-circle2 text-xl font-bold">
          Error loading Pokémon data. Please try again later.
        </p>
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-30 w-30 border-t-4 border-b-4 border-circle2"></div>
      </div>
    );
  }

  function addToMyList(pokemon: Pokemon) {
    setMyList((prevList) => [...prevList, pokemon]);
  }

  function removeFromList(pokemon: Pokemon) {
    setMyList(myList.filter((pok) => pok.id !== pokemon.id));
  }

  function listCheck(pokemon: Pokemon): boolean {
    return myList.some((pok) => pok.id === pokemon.id);
  }

  function changeGen(generation: string) {
    setGen(generation);
  }

  function searchFor(term: string) {
    setSearchTerm(term);
  }

  return (
    <>
      <NavBar changeGen={changeGen} gen={gen} searchFor={searchFor} searchTerm={searchTerm} />
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
