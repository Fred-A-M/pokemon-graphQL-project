'use client';
import Image from 'next/image';

interface GenerationChoicesProps {
  changeGen: (generation: string) => void,
  gen: string
}

export default function GenerationChoices({changeGen, gen}: GenerationChoicesProps) {
  

  return (
    <>
    <div className='flex justify-center gap-7 text-2xl mb-3'>
      <div onClick={() => changeGen('first')}
        className={`${gen === 'first' ? 'bg-circle2' : 'bg-circle'} rounded-full hover:cursor-pointer`}>
        <Image src='/1g.png' alt='First Gen' height={100} width={100} /></div>
      <div onClick={() => changeGen('second')}
        className={`${gen === 'second' ? 'bg-circle2' : 'bg-circle'} rounded-full hover:cursor-pointer`}>
        <Image src='/2g.png' alt='Second Gen' height={100} width={100} /></div>
      <div onClick={() => changeGen('third')}
        className={`${gen === 'third' ? 'bg-circle2' : 'bg-circle'} rounded-full hover:cursor-pointer`}>
        <Image src='/3g.png' alt='Third Gen' height={100} width={100} /></div>
    </div>
    </>
  );
}
