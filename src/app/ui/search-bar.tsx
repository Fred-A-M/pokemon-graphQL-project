import { HiMagnifyingGlass } from "react-icons/hi2";

interface SearchBarProps {
  searchFor: (term: string) => void;
  searchTerm: string;
}

export default function SearchBar({ searchFor, searchTerm }: SearchBarProps) {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg-background w-full pt-2 pb-1 z-50">
        <div className="flex items-center gap-1">
          <HiMagnifyingGlass size={20} />
          <input
            type="text"
            placeholder="Search Pokémon"
            value={searchTerm}
            onChange={(e) => searchFor(e.target.value)}
            className="w-48 self-center rounded-md p-2 border-circle2 border-2 bg-[#f0eeee]"
          />
        </div>
      </div>
    </>
  );
}
