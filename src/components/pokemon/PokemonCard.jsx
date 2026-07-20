import { Link } from "react-router-dom";

import TypeBadge from "./TypeBadge";
import { typeGradients } from "../../utils/pokemonTypes";
import useTeamStore from "../../store/teamStore";

export default function PokemonCard({ pokemon }) {
  const gradient =
    typeGradients[pokemon.types[0]] || "from-gray-300 to-gray-500";
    const addPokemon = useTeamStore((state) => state.addPokemon);

  return (
    <Link to={`/pokemon/${pokemon.id}`}>
      <div
        className={`group relative overflow-hidden rounded-3xl bg-linear-to-br ${gradient}
        p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl`}
      >
        <p className="absolute right-5 top-5 text-4xl font-black text-white/20">
          #{String(pokemon.id).padStart(3, "0")}
        </p>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="mx-auto h-40 w-40 transition-transform duration-300 group-hover:scale-110"
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
  onClick={(e) => {
    e.preventDefault();
    addPokemon(pokemon);
  }}
  className="mt-4 w-full rounded-xl bg-white py-2 font-semibold text-gray-800 transition hover:bg-gray-100"
>
  Add to Team
</button>
      </div>
    </Link>
  );
}