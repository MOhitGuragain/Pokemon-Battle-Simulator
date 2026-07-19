export default function PokemonInfo({ pokemon }) {
  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-4 text-2xl font-bold">
        Basic Information
      </h2>

      <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-3">
        <div>
          <p className="text-sm text-gray-500">Height</p>
          <p className="text-xl font-semibold">
            {pokemon.height}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Weight</p>
          <p className="text-xl font-semibold">
            {pokemon.weight}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">
            Base Experience
          </p>
          <p className="text-xl font-semibold">
            {pokemon.base_experience}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="mb-3 text-lg font-semibold">
          Abilities
        </h3>

        <div className="flex flex-wrap gap-3">
          {pokemon.abilities.map((ability) => (
            <span
              key={ability.ability.name}
              className="rounded-full bg-gray-200 px-4 py-2 capitalize"
            >
              {ability.ability.name.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}