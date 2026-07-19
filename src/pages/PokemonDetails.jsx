import { useParams } from "react-router-dom";
import { usePokemon } from "../hooks/usePokemon";

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
    <main className="mx-auto max-w-5xl p-8">
      <div className="rounded-xl border bg-white p-8 shadow-md">
        <img
          src={data.sprites.other["official-artwork"].front_default}
          alt={data.name}
          className="mx-auto h-64 w-64"
        />

        <h1 className="mt-6 text-center text-4xl font-bold capitalize">
          {data.name}
        </h1>

        <p className="mt-2 text-center text-gray-500">
          #{String(data.id).padStart(3, "0")}
        </p>

        <div className="mt-6 flex justify-center gap-3">
          {data.types.map((type) => (
            <span
              key={type.slot}
              className="rounded-full bg-gray-200 px-4 py-1 capitalize"
            >
              {type.type.name}
            </span>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-2 gap-6 text-center">
          <div>
            <p className="text-gray-500">Height</p>
            <p className="text-xl font-semibold">{data.height}</p>
          </div>

          <div>
            <p className="text-gray-500">Weight</p>
            <p className="text-xl font-semibold">{data.weight}</p>
          </div>
        </div>
      </div>
    </main>
  );
}