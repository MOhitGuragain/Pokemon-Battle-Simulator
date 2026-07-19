import { useNavigate, useParams } from "react-router-dom";

import { usePokemon } from "../hooks/usePokemon";

import PokemonHeader from "../components/pokemon/PokemonHeader";
import PokemonInfo from "../components/pokemon/PokemonInfo";
import PokemonStats from "../components/pokemon/PokemonStats";

export default function PokemonDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = usePokemon(id);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
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
    <main className="mx-auto max-w-6xl p-6 md:p-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 rounded-xl bg-gray-800 px-5 py-2 font-medium text-white shadow transition hover:bg-gray-700"
      >
        ← Back to Pokédex
      </button>

      {/* Pokémon Header */}
      <PokemonHeader pokemon={data} />

      {/* Information */}
      <div className="mt-8">
        <PokemonInfo pokemon={data} />
      </div>

      {/* Stats */}
      <div className="mt-8">
        <PokemonStats pokemon={data} />
      </div>
    </main>
  );
}