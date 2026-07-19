import StatBar from "./StatBar";

export default function PokemonStats({ pokemon }) {
  return (
    <div className="mt-6 rounded-xl border bg-white p-6 shadow-md">
      <h2 className="mb-6 text-2xl font-bold">
        Base Stats
      </h2>

      <div className="space-y-5">
        {pokemon.stats.map((stat) => (
          <StatBar
            key={stat.stat.name}
            name={stat.stat.name}
            value={stat.base_stat}
          />
        ))}
      </div>
    </div>
  );
}