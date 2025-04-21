"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
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
        <div className="flex justify-center items-center bg-nav animate-spin w-40 h-40 border-l-8 border-r-8 border-circle rounded-full" />
      ) : (
        // Main content
        <div className="flex flex-col justify-center items-center h-lvh gap-9 bg-nav">
          <div style={{ perspective: "1000px" }}>
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: 360 }}
              transition={{
                duration: 2,
                delay: 1,
                ease: "circIn",
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Image
                className="drop-bounce"
                src="/PELogo.png"
                alt="logo"
                height={400}
                width={400}
                priority
              />
            </motion.div>
          </div>
          <div className="flex items-center gap-9 transition duration-300">
            <Link href="/explorer">
              <Image
                src="/Start.png"
                alt="start"
                height={125}
                width={125}
                className="hover:bg-circle rounded-full transition duration-700"
              />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
