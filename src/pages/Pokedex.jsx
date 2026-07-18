
import { useMemo, useState } from "react";

import SearchBar from "../components/pokemon/SearchBar";
import PokemonGrid from "../components/pokemon/PokemonGrid";
import { usePokemonList } from "../hooks/usePokemonList";

export default function Pokedex() {
  const [search, setSearch] = useState("");

  const { data, isLoading, isError, error } = usePokemonList();

  const filteredPokemon = useMemo(() => {
    if (!data) return [];

    return data.results.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl">
        Loading Pokémon...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-screen items-center justify-center text-red-500">
        {error.message}
      </div>
    );
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <h1 className="mb-6 text-center text-4xl font-bold">
        Pokédex
      </h1>

      <SearchBar value={search} onChange={setSearch} />

      <div className="mt-8">
        <PokemonGrid pokemon={filteredPokemon} />
      </div>
    </main>
  );
}