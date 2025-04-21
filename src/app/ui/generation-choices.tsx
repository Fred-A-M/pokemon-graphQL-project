"use client";
import Image from "next/image";

interface GenerationChoicesProps {
  changeGen: (generation: string) => void;
  gen: string;
}

export default function GenerationChoices({ changeGen, gen }: GenerationChoicesProps) {
  // Create a handler function that both changes generation and scrolls to top
  const handleGenChange = (generation: string) => {
    changeGen(generation);
    // Scroll to the top of the page smoothly
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="flex justify-center gap-7 text-2xl mb-3">
        <div
          className={`${gen === "first" ? "bg-circle2" : "bg-circle"} ${gen !== "first" && "hover:bg-circle1"} transition-colors duration-200 rounded-full hover:cursor-pointer`}
        >
          <Image
            src="/1g.png"
            alt="First Gen"
            height={100}
            width={100}
            onClick={() => handleGenChange("first")}
          />
        </div>
        <div
          className={`${gen === "second" ? "bg-circle2" : "bg-circle"} ${gen !== "second" && "hover:bg-circle1"} transition-colors duration-200 rounded-full hover:cursor-pointer`}
        >
          <Image
            src="/2g.png"
            alt="Second Gen"
            height={100}
            width={100}
            onClick={() => handleGenChange("second")}
          />
        </div>
        <div
          className={`${gen === "third" ? "bg-circle2" : "bg-circle"} ${gen !== "third" && "hover:bg-circle1"} transition-colors duration-200 rounded-full hover:cursor-pointer`}
        >
          <Image
            src="/3g.png"
            alt="Third Gen"
            height={100}
            width={100}
            onClick={() => handleGenChange("third")}
          />
        </div>
      </div>
    </>
  );
}
