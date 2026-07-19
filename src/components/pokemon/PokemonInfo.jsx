export default function PokemonInfo({ pokemon }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <InfoCard
          title="Height"
          value={`${pokemon.height / 10} m`}
        />

        <InfoCard
          title="Weight"
          value={`${pokemon.weight / 10} kg`}
        />

        <InfoCard
          title="Experience"
          value={pokemon.base_experience}
        />
      </div>

      <div className="mt-10">
        <h3 className="mb-4 text-xl font-semibold text-gray-700">
          Abilities
        </h3>

        <div className="flex flex-wrap gap-3">
          {pokemon.abilities.map((ability) => (
            <span
              key={ability.ability.name}
              className="rounded-full bg-gray-100 px-4 py-2 font-medium capitalize shadow"
            >
              {ability.ability.name.replace("-", " ")}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function InfoCard({ title, value }) {
  return (
    <div className="rounded-2xl bg-gray-50 p-6 text-center shadow">
      <p className="text-sm uppercase tracking-wide text-gray-500">
        {title}
      </p>

      <p className="mt-2 text-2xl font-bold text-gray-800">
        {value}
      </p>
    </div>
  );
}