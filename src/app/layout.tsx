import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pokémon Explorer",
  description: "Save your favourite Pokémon",
  icons: {
    icon: "/pokeball.png",
  },
  openGraph: {
    title: "Pokémon Explorer", // Title for the preview
    description: "Save your favourite Pokémon", // Description for the preview
    images: [
      {
        url: "/PELogo.png", // Path to your desired preview image
        alt: "Pokémon Explorer logo", // Alt text for accessibility
      },
    ],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
