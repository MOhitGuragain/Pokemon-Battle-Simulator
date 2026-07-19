import TypeBadge from "./TypeBadge";

export default function PokemonHeader({ pokemon }) {
  return (
    <div className="rounded-xl border bg-white p-8 shadow-md">
      <img
        src={pokemon.sprites.other["official-artwork"].front_default}
        alt={pokemon.name}
        className="mx-auto h-64 w-64"
      />

      <h1 className="mt-6 text-center text-4xl font-bold capitalize">
        {pokemon.name}
      </h1>

      <p className="mt-2 text-center text-gray-500">
        #{String(pokemon.id).padStart(3, "0")}
      </p>

      <div className="mt-6 flex justify-center gap-3">
        {pokemon.types.map((type) => (
          <TypeBadge
            key={type.slot}
            type={type.type.name}
          />
        ))}
      </div>
    </div>
  );
}