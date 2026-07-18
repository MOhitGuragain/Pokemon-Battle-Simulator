// src/components/pokemon/PokemonGrid.jsx

import PokemonCard from "./PokemonCard";

export default function PokemonGrid({ pokemon }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      {pokemon.map((poke) => (
        <PokemonCard key={poke.name} pokemon={poke} />
      ))}
    </div>
  );
}