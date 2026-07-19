import TypeBadge from "./TypeBadge";
import { typeHeaderGradients } from "../../utils/pokemonTypes";

export default function PokemonHeader({ pokemon }) {
  const primaryType = pokemon.types[0].type.name;

  const gradient =
    typeHeaderGradients[primaryType] ||
    "from-gray-300 to-gray-500";

  return (
    <section
      className={`rounded-3xl bg-gradient-to-br ${gradient} p-8 shadow-2xl`}
    >
      <div className="flex flex-col items-center gap-8 md:flex-row">
        <div className="flex justify-center md:w-1/3">
          <img
            src={pokemon.sprites.other["official-artwork"].front_default}
            alt={pokemon.name}
            className="h-64 w-64 drop-shadow-2xl transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex-1 text-center text-white md:text-left">
          <p className="text-lg font-semibold text-white/70">
            #{String(pokemon.id).padStart(3, "0")}
          </p>

          <h1 className="mt-2 text-5xl font-extrabold capitalize">
            {pokemon.name}
          </h1>

          <div className="mt-6 flex flex-wrap justify-center gap-3 md:justify-start">
            {pokemon.types.map((type) => (
              <TypeBadge
                key={type.slot}
                type={type.type.name}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}