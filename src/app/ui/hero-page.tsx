"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function HeroPage() {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

  useEffect(() => {
    const img = new window.Image();
    img.src = "/PELogo.png";
    img.onload = () => {
      setIsImageLoaded(true);
    };
  }, []);

  return (
    <>
      {!isImageLoaded ? (
        // Loading screen
        <div className="flex flex-col justify-center items-center h-lvh bg-nav">
          <p className="text-white text-xl">Loading...</p>
        </div>
      ) : (
        // Main content
        <div className="flex flex-col justify-center items-center h-lvh gap-9 bg-nav">
          <div>
            <Image
              className="drop-bounce"
              src="/PELogo.png"
              alt="logo"
              height={400}
              width={400}
              priority
            />
          </div>
          <div className="flex items-center gap-9 transition duration-300">
            <div>
              <Link href="/explorer">
                <button
                  className="bg-circle hover:bg-circle1 transition-colors duration-200 rounded-md w-24 text-background py-3 font-bold"
                  type="submit"
                >
                  Start
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
