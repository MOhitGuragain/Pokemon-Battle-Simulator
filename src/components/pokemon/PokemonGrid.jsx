// src/components/pokemon/PokemonGrid.jsx

import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemon }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {pokemon.map((poke) => (
        <PokemonCard
          key={poke.id}
          pokemon={poke}
        />
      ))}
    </div>
  );
}