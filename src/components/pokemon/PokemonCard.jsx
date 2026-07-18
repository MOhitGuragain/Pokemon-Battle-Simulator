// src/components/pokemon/PokemonCard.jsx

export default function PokemonCard({ pokemon }) {
  const id = pokemon.url.split("/").filter(Boolean).pop();

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-lg">
      <img
        src={image}
        alt={pokemon.name}
        className="mx-auto h-24 w-24"
      />

      <h2 className="mt-4 text-center text-lg font-semibold capitalize">
        {pokemon.name}
      </h2>

      <p className="text-center text-sm text-gray-500">
        #{id.padStart(3, "0")}
      </p>
    </div>
  );
}