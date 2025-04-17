import { client, GET_POKEMON } from "@/app/lib/apollo-client";
import Explorer from "./ui/explorer";

export default async function Home() {
  let data;

  try {
    const result = await client.query({
      query: GET_POKEMON,
    });
    data = result.data;
  } catch (error) {
    console.error("Error fetching Pokémon data:", error);
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-circle2 text-xl font-bold">
          Error loading Pokémon data. Please try again later.
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-xl font-bold">Loading Pokémon data...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col">
        <Explorer data={data} />
      </div>
    </>
  );
}
