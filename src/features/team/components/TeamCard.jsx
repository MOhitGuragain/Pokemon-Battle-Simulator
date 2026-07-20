import TypeBadge from "../../../components/pokemon/TypeBadge";
import { typeGradients } from "../../../utils/pokemonTypes";

import useTeamStore from "../../../store/teamStore";

export default function TeamCard({ pokemon }) {
  const removePokemon = useTeamStore((state) => state.removePokemon);

  const gradient =
    typeGradients[pokemon.types[0]] ||
    "from-gray-300 to-gray-500";

  return (
    <div
      className={`overflow-hidden rounded-3xl bg-linear-to-br ${gradient}
      shadow-xl transition duration-300 hover:-translate-y-2`}
    >
      <div className="relative p-6">
        <p className="absolute right-5 top-5 text-4xl font-black text-white/20">
          #{String(pokemon.id).padStart(3, "0")}
        </p>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="mx-auto h-36 w-36 drop-shadow-xl"
        />

        <h2 className="mt-4 text-center text-2xl font-bold text-white capitalize">
          {pokemon.name}
        </h2>

        <div className="mt-4 flex justify-center gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge
              key={type}
              type={type}
            />
          ))}
        </div>

        <button
          onClick={() => removePokemon(pokemon.id)}
          className="mt-6 w-full rounded-xl bg-white py-2 font-semibold text-red-500 transition hover:bg-gray-100"
        >
          Remove
        </button>
      </div>
    </div>
  );
}