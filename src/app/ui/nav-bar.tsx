import Image from "next/image";
import GenerationChoices from "./generation-choices";
import SearchBar from "./search-bar";
import { useState } from "react";
import { motion, useScroll } from "framer-motion";
import { useRef } from "react";
import { useMotionValueEvent } from "framer-motion";
import Link from "next/link";

interface NavBarProps {
  changeGen: (generation: string) => void;
  gen: string;
  searchFor: (term: string) => void;
  searchTerm: string;
}

export default function NavBar({ changeGen, gen, searchFor, searchTerm }: NavBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { scrollY } = useScroll();
  const lastScrollY = useRef(0);

  // Track scroll direction and toggle navbar visibility
  useMotionValueEvent(scrollY, "change", (latest: number) => {
    if (latest < 100) {
      setIsVisible(true);
      lastScrollY.current = latest;
      return;
    }

    // Only trigger if scroll amount is significant (> 5px)
    if (latest > lastScrollY.current) {
      setIsVisible(false);
    } else if (latest < lastScrollY.current - 10) {
      setIsVisible(true);
    }

    lastScrollY.current = latest;
  });

  return (
    <>
      <motion.div
        className="flex flex-col items-center w-full fixed top-0 left-0 right-0 z-50"
        // className="fixed top-0 left-0 right-0 z-40 backdrop-blur-md px-5 sm:px-10"
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -300 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="flex flex-col pt-3 w-full items-center bg-nav">
          <div className="flex mb-3 justify-between items-center w-[60%] border-b-2 p-1">
            <Link href="/">
              <Image
                src="/PELogo.png"
                alt="logo"
                height={150}
                width={150}
                className="hover:cursor-pointer"
              />
            </Link>
            <button
              onClick={() => changeGen("list")}
              className={`${gen === "list" ? "bg-circle2" : "bg-circle"} ${gen !== "list" && "hover:bg-circle1"} transition-colors duration-200 rounded-md w-24 text-background py-3 font-bold `}
            >
              My list
            </button>
          </div>
          <GenerationChoices changeGen={changeGen} gen={gen} />
          <SearchBar searchFor={searchFor} searchTerm={searchTerm} />
        </div>
        <div className="w-full h-4 bg-gradient-to-b from-background"></div>
      </motion.div>
    </>
  );
}
