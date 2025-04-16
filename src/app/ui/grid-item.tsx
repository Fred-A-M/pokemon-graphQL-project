import Image from 'next/image'
import { Pokemon, pokemonImage } from '../lib/definitions';
import { HiOutlineHeart, HiHeart, HiOutlineXCircle, HiInformationCircle } from 'react-icons/hi2';
import { capitalize } from 'lodash';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
// import Link from 'next/link';


interface GridItemProps {
  pokemon: Pokemon,
  gen: string,
  addToMyList: (pokemon: Pokemon) => void,
  removeFromList: (pokemon: Pokemon) => void,
  listCheck: (pokemon: Pokemon) => boolean;
}

export default function GridItem ({pokemon, gen, addToMyList, removeFromList, listCheck}: GridItemProps) {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [rotated, setRotated] = useState<boolean>(false);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    if (!rotated && !isFlipping && cardRef.current) {
      // Add wiggling class to start animation
      cardRef.current.classList.add('wiggling');
      
      // Remove the class when animation completes to allow it to run again
      setTimeout(() => {
        if (cardRef.current) {
          cardRef.current.classList.remove('wiggling');
        }
      }, 400); // Must match animation duration
    }
  };

  // Reset isFlipping after animation completes
  useEffect(() => {
    if (isFlipping) {
      const timer = setTimeout(() => {
        setIsFlipping(false);
      }, 650);
      return () => clearTimeout(timer);
    }
  }, [isFlipping]);

  return (
    <div 
      className="perspective"
      style={{ perspective: 1000 }}
    >
    <motion.div 
      ref={cardRef}
      key={pokemon.id} 
      className={`flex flex-col justify-between items-center ${!rotated && !isFlipping ? '' : ''} ${showInfo ? 'bg-circle' : 'bg-box'} bg-box rounded-lg p-2 shadow-xl text-background z-20`}
      onMouseEnter={handleMouseEnter}
      animate={{ 
        rotateY: rotated ? 180 : 0,
        rotateX: rotated ? 180 : 0,
        rotateZ: rotated ? 180 : 0
      }}
      transition={{ 
        duration: 0.6, 
        ease: 'easeInOut' 
      }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
    >
      <h1 className='font-bold text-xl'>{capitalize(pokemon.name)}</h1>
      {showInfo ?  (
        <div className='flex flex-col items-center justify-center text-center h-[145px] sm:h-[150px] font-bold text-sm sm:text-base'>
          <div>ID: {pokemon.id}</div>
          <div>Habitat: {capitalize(pokemon.pokemon_v2_pokemonhabitat.name)}</div>
          <div>Weight: {pokemon.pokemon_v2_pokemons[0].weight}</div>
          <div>Height: {pokemon.pokemon_v2_pokemons[0].height}</div>
        </div>) : (
        <Link href={`/pokemon-page/${pokemon.id}`}>
          <Image 
            src={pokemonImage + pokemon.id + '.png'} 
            alt={pokemon.name} 
            height={150} 
            width={150}
          />
        </Link>
      )}
      <div className='hover:cursor-pointer flex justify-between w-full'> 
        <HiInformationCircle 
          size={25} 
          onClick={() => {
            setIsFlipping(true); // Mark as flipping
            setRotated(!rotated); // Start rotation
            setTimeout(() => setShowInfo(!showInfo), 300); // Change content mid-flip
          }}
          onMouseDown={(e) => e.preventDefault()} 
        />
        {gen === 'list' ? (
          <HiOutlineXCircle
            size={25} 
            onClick={() => removeFromList(pokemon)}
            onMouseDown={(e) => e.preventDefault()}  
          />
          ) : listCheck(pokemon) ? (
          <HiHeart 
            size={25} 
            onClick={() => removeFromList(pokemon)}
            onMouseDown={(e) => e.preventDefault()} 
          />
          ) : (
          <HiOutlineHeart 
            size={25} 
            onClick={() => addToMyList(pokemon)}
            onMouseDown={(e) => e.preventDefault()} 
          />
        )}
      </div>
    </motion.div>
    </div>
  )
}