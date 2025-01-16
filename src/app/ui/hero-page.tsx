import Image from 'next/image'

interface HeroPageProps {
  changeState: (newState: string) => void
}

export default function HeroPage ({changeState}: HeroPageProps) {

  return (
    <>
    <div className='flex flex-col justify-center items-center h-lvh gap-9 bg-nav'>
    <div>
      <Image 
        className='drop-bounce'
        src='/PELogo.png' 
        alt='logo' 
        height={400} 
        width={400}
      />
    </div>
      <div className='flex items-center gap-9 transition duration-300'>
        <div>
        <button onClick={() => changeState('next')} className="  bg-circle hover:bg-circle1 transition-colors duration-200 rounded-md w-24 text-background py-3 font-bold " type="submit">Start</button>
        </div>
      </div>
    </div>
    </>
  )
}