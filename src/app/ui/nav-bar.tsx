import Image from 'next/image'
import GenerationChoices from './generation-choices';
import SearchBar from './search-bar';

interface NavBarProps {
  changeGen: (generation: string) => void,
  gen: string
  searchFor: (term: string) => void,
  searchTerm: string,
  changeState: (newState : string) => void
}

export default function NavBar ({changeGen, gen, searchFor, searchTerm, changeState}: NavBarProps) {

  return (
    <>
    <div className='flex flex-col items-center w-full fixed'>
      <div className='flex flex-col pt-3 w-full items-center bg-nav z-50'>
        <div className='flex mb-3 justify-between items-center w-[60%] border-b-2 p-1'>
          <Image 
            src='/PELogo.png' 
            alt='logo' 
            height={150} 
            width={150}
            onClick={() => changeState('start')}
            className='hover:cursor-pointer'
          />
          <button 
            onClick={() => changeGen('list')}
            className={`${gen === 'list' ? 'bg-circle2' : 'bg-circle'} ${gen !== 'list' && 'hover:bg-circle1'} transition-colors duration-200 rounded-md w-24 text-background py-3 font-bold `}
          >
            My list
          </button>
        </div>
        <GenerationChoices 
          changeGen={changeGen} 
          gen={gen}
        />
        <SearchBar 
          searchFor={searchFor}
          searchTerm={searchTerm}
        />
      </div>
      <div className='w-full h-4 bg-gradient-to-b from-background'></div>
    </div>
    </>
  )
}