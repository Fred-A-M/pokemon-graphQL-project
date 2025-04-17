import React, { useEffect } from "react";
import Image from "next/image";
import { Pokemon, pokemonImage, PokemonStat } from "@/app/lib/definitions";
import { capitalize } from "lodash";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";
import { motion, useAnimation } from "framer-motion";
import { toast } from "react-hot-toast";

interface PokemonModalProps {
  pokemon: Pokemon;
  onClose: () => void;
  addToMyList: (pokemon: Pokemon) => void;
  removeFromList: (pokemon: Pokemon) => void;
  listCheck: (pokemon: Pokemon) => boolean;
}

// Same chart data generator as before
const generateChartData = (stats: PokemonStat[]) => {
  return stats.map((stat) => ({
    stat: capitalize(stat.pokemon_v2_stat.name),
    value: stat.base_stat,
  }));
};

const generateChartConfig = (stats: PokemonStat[]) => {
  if (!stats || stats.length === 0) {
    return {
      value: {
        label: "Base Stat",
        color: "hsl(var(--chart-1))",
      },
    } as ChartConfig;
  }

  return stats.reduce((config, stat) => {
    const statName = stat.pokemon_v2_stat.name;
    return {
      ...config,
      [statName]: {
        label: capitalize(statName),
        color: `hsl(var(--chart-1))`,
      },
    };
  }, {} as ChartConfig);
};

const PokemonChart = ({ stats }: { stats: PokemonStat[] }) => {
  if (!stats || stats.length === 0) {
    return <div>No stats available</div>;
  }

  const chartData = generateChartData(stats);
  const chartConfig = generateChartConfig(stats);

  return (
    <ChartContainer config={chartConfig}>
      <RadarChart data={chartData}>
        <PolarAngleAxis dataKey="stat" tick={{ fill: "white" }} />
        <PolarGrid />
        <Radar
          dataKey="value"
          fill="hsl(var(--chart-1))"
          fillOpacity={0.6}
          stroke="hsl(var(--chart-1))"
          dot={{
            r: 4,
            fillOpacity: 1,
          }}
        />
      </RadarChart>
    </ChartContainer>
  );
};

export default function PokemonModal({
  pokemon,
  onClose,
  addToMyList,
  removeFromList,
  listCheck,
}: PokemonModalProps) {
  const controls = useAnimation();
  useEffect(() => {
    // Close on escape key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    // Prevent scrolling when modal is open
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleClick = () => {
    controls.start({
      rotateZ: [0, 10, -7, 5, -3, 0],
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    });
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 md:p-4 p-8"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-box text-background rounded-lg shadow-xl md:p-10 p-4 max-w-4xl mx-auto relative max-h-[90vh] overflow-y-auto">
        <div className="flex items-center md:justify-between justify-center gap-6 text-3xl font-bold mb-6 text-left w-full pl-5">
          <h1>{capitalize(pokemon.name)}</h1>
          <div className="flex col-span-1 md:col-span-2 items-center justify-end gap-6">
            {listCheck(pokemon) ? (
              <button
                onClick={() => {
                  removeFromList(pokemon);
                  toast.success(`Removed ${capitalize(pokemon.name)} from your list`);
                }}
              >
                <HiHeart size={30} />
              </button>
            ) : (
              <button
                onClick={() => {
                  addToMyList(pokemon);
                  toast.success(`Added ${capitalize(pokemon.name)} to your list`);
                }}
              >
                <HiOutlineHeart size={30} />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            className="flex items-center justify-center "
            onClick={handleClick}
            animate={controls}
          >
            <Image
              src={`${pokemonImage}${pokemon.id}.png`}
              alt={pokemon.name || "Pokemon"}
              width={300}
              height={300}
              className="object-contain"
            />
          </motion.div>
          <div className="bg-circle1/20 p-5 rounded-lg">
            <h3 className="font-bold md:text-2xl text-xl mb-4">Battle Stats</h3>
            <div className="w-full">
              <PokemonChart stats={pokemon.pokemon_v2_pokemons[0].pokemon_v2_pokemonstats} />
            </div>
          </div>

          <div className="bg-circle1/20 p-5 rounded-lg w-full">
            <h2 className="font-bold md:text-2xl text-xl mb-4">Info</h2>

            <div className="grid grid-cols-2 gap-4 md:text-lg text-md">
              <div>
                <p className="mb-2">
                  <span className="font-semibold">ID:</span> {pokemon.id}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Habitat:</span>{" "}
                  {capitalize(pokemon.pokemon_v2_pokemonhabitat.name)}
                </p>
              </div>
              <div>
                <p className="mb-2">
                  <span className="font-semibold">Weight:</span>{" "}
                  {pokemon.pokemon_v2_pokemons[0].weight}
                </p>
                <p className="mb-2">
                  <span className="font-semibold">Height:</span>{" "}
                  {pokemon.pokemon_v2_pokemons[0].height}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-circle2/20 p-5 rounded-lg self-end">
            <h2 className="font-bold md:text-2xl text-xl mb-4">Bio</h2>
            <p className="mb-2 md:text-lg text-md">
              {capitalize(pokemon.name)} is a fascinating Pokemon with unique characteristics. It
              lives in {pokemon.pokemon_v2_pokemonhabitat.name} habitats and has a distinctive
              appearance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
