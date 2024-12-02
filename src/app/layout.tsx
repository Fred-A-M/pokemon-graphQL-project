import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Pokémon Explorer",
  description: "Save your favourite Pokémon",
  icons: {
    icon: "/pokeball.png",
  },
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
      <html lang="en">
        <body className={`antialiased`}>
         {children}
        </body>
      </html>
  );
}
