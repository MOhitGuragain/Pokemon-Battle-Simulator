import StatBar from "./StatBar";

export default function PokemonStats({ pokemon }) {
  return (
    <section className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="mb-8 text-3xl font-bold text-gray-800">
        Base Stats
      </h2>

      <div className="space-y-6">
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
          />
        ))}
      </div>
    </section>
  );
}