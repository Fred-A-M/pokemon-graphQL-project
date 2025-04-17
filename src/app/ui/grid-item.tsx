import Image from "next/image";
import { Pokemon, pokemonImage } from "../lib/definitions";
import { HiOutlineHeart, HiHeart, HiOutlineXCircle, HiInformationCircle } from "react-icons/hi2";
import { capitalize } from "lodash";
import { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { toast } from "react-hot-toast";
import PokemonModal from "@/app/ui/pokemon-modal";

interface GridItemProps {
  pokemon: Pokemon;
  gen: string;
  addToMyList: (pokemon: Pokemon) => void;
  removeFromList: (pokemon: Pokemon) => void;
  listCheck: (pokemon: Pokemon) => boolean;
}

export default function GridItem({
  pokemon,
  gen,
  addToMyList,
  removeFromList,
  listCheck,
}: GridItemProps) {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [rotated, setRotated] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const controls = useAnimation();

  const handleMouseEnter = () => {
    if (!rotated && !isFlipping) {
      // Wiggle animation
      controls.start({
        rotateZ: [0, 10, -7, 5, -3, 0],
        transition: {
          duration: 0.4,
          ease: "easeInOut",
        },
      });
    }
  };

  // Handle card flipping
  useEffect(() => {
    if (isFlipping) {
      // Start flipping animation
      controls.start({
        rotateY: rotated ? 180 : 0,
        rotateX: rotated ? 180 : 0,
        rotateZ: rotated ? 180 : 0,
        transition: {
          duration: 0.6,
          ease: "easeInOut",
        },
      });

      // Reset flipping state after animation
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 650);

      return () => clearTimeout(timer);
    }
  }, [isFlipping, rotated, controls]);

  return (
    <>
      <div className="perspective" style={{ perspective: 1000 }}>
        <motion.div
          key={pokemon.id}
          className={`flex flex-col justify-between items-center ${showInfo ? "bg-circle" : "bg-box"} bg-box rounded-lg p-2 shadow-xl text-background z-20`}
          animate={controls}
          initial={{ rotateY: 0 }}
          style={{
            perspective: 1000,
            transformStyle: "preserve-3d",
          }}
        >
          <h1 className="font-bold text-xl">{capitalize(pokemon.name)}</h1>
          {showInfo ? (
            <div className="flex flex-col items-center justify-center text-center h-[145px] sm:h-[150px] font-bold text-sm sm:text-base">
              <div>ID: {pokemon.id}</div>
              <div>Habitat: {capitalize(pokemon.pokemon_v2_pokemonhabitat.name)}</div>
              <div>Weight: {pokemon.pokemon_v2_pokemons[0].weight}</div>
              <div>Height: {pokemon.pokemon_v2_pokemons[0].height}</div>
            </div>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              onMouseEnter={handleMouseEnter}
              className="focus:outline-none hover:cursor-pointer"
            >
              <Image
                src={pokemonImage + pokemon.id + ".png"}
                alt={pokemon.name}
                height={150}
                width={150}
              />
            </button>
          )}
          <div className=" flex justify-between w-full">
            <HiInformationCircle
              size={25}
              className="hover:cursor-pointer"
              onClick={() => {
                setIsFlipping(true);
                setRotated(!rotated);
                setTimeout(() => setShowInfo(!showInfo), 300);
              }}
              onMouseDown={(e) => e.preventDefault()}
            />
            {gen === "list" ? (
              <HiOutlineXCircle
                className="hover:cursor-pointer"
                size={25}
                onClick={() => {
                  removeFromList(pokemon);
                  toast.success(`Removed ${capitalize(pokemon.name)} from your list`);
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
            ) : listCheck(pokemon) ? (
              <HiHeart
                className="hover:cursor-pointer"
                size={25}
                onClick={() => {
                  removeFromList(pokemon);
                  toast.success(`Removed ${capitalize(pokemon.name)} from your list`);
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
            ) : (
              <HiOutlineHeart
                className="hover:cursor-pointer"
                size={25}
                onClick={() => {
                  addToMyList(pokemon);
                  toast.success(`Added ${capitalize(pokemon.name)} to your list`);
                }}
                onMouseDown={(e) => e.preventDefault()}
              />
            )}
          </div>
        </motion.div>
      </div>

      {showModal && (
        <PokemonModal
          pokemon={pokemon}
          onClose={() => setShowModal(false)}
          addToMyList={addToMyList}
          removeFromList={removeFromList}
          listCheck={listCheck}
        />
      )}
    </>
  );
}
