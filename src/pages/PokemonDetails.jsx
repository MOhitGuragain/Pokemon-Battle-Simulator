import { useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";

import PokemonHeader from "../components/pokemon/PokemonHeader";
import PokemonInfo from "../components/pokemon/PokemonInfo";
import PokemonStats from "../components/pokemon/PokemonStats";

export default function PokemonDetails() {
  const { id } = useParams();

  const { data, isLoading, isError, error } = usePokemon(id);

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
    <main className="mx-auto max-w-5xl p-8 space-y-6">
      <PokemonHeader pokemon={data} />
      <PokemonInfo pokemon={data} />
      <PokemonStats pokemon={data} />
    </main>
  );
}