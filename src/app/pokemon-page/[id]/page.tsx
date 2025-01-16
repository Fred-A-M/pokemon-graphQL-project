'use client';
import React from 'react';

interface PokemonPageProps {
  params: Promise<{id: number}>;
}

export default function PokemonPage ({params}: PokemonPageProps) {
  const resolvedParams = React.use(params); // Unwrap the `params` Promise

  return (
    <>
    Name: {resolvedParams.id}
    </>
  )
}