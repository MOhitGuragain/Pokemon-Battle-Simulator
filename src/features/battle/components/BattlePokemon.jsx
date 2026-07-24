import HPBar from "./HPBar";
import TypeBadge from "../../../components/pokemon/TypeBadge";
import useBattleStore from "../store/battleStore";

export default function BattlePokemon({ pokemon }) {
  // Active Pokémon
  const player = useBattleStore((state) => state.player);
  const isPlayer = pokemon.id === player?.id;

  // HP
  const currentHP = useBattleStore((state) =>
    isPlayer ? state.playerHP : state.enemyHP
  );

  // Animation States
  const attacking = useBattleStore((state) =>
    isPlayer ? state.playerAttacking : state.enemyAttacking
  );

  const damaged = useBattleStore((state) =>
    isPlayer ? state.playerDamaged : state.enemyDamaged
  );

  const fainted = useBattleStore((state) =>
    isPlayer ? state.playerFainted : state.enemyFainted
  );

  const entering = useBattleStore((state) =>
    isPlayer ? state.playerEntering : state.enemyEntering
  );

  // Animation Classes
  const animationClasses = `
    ${attacking ? (isPlayer ? "translate-x-8" : "-translate-x-8") : ""}
    ${damaged ? "brightness-50" : ""}
    ${
      fainted
        ? isPlayer
          ? "translate-y-20 rotate-12 opacity-0 scale-90"
          : "-translate-y-20 -rotate-12 opacity-0 scale-90"
        : ""
    }
    ${
      entering
        ? isPlayer
          ? "-translate-x-20 opacity-0"
          : "translate-x-20 opacity-0"
        : ""
    }
  `;

  return (
    <div
      className={`flex flex-col ${
        isPlayer ? "items-start" : "items-end"
      }`}
    >
      {/* Pokémon Sprite */}
      <div className="flex h-52 w-80 items-end justify-center">

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className={`
            h-60
            w-60
            object-contain
            drop-shadow-[0_25px_20px_rgba(0,0,0,0.45)]
            transition-all
            duration-500
            ease-in-out
            ${animationClasses}
          `}
        />

      </div>

      {/* Status Card */}
      <div className="w-80 rounded-3xl border border-white/60 bg-white/90 p-5 shadow-2xl backdrop-blur-md">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">

          <div className="flex-1">

            <h2 className="text-2xl font-extrabold capitalize leading-none">
              {pokemon.name}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Pokémon #{String(pokemon.id).padStart(3, "0")}
            </p>

          </div>

          <div className="flex flex-wrap justify-end gap-1.5">

            {pokemon.types.map((type) => (
              <TypeBadge
                key={type}
                type={type}
              />
            ))}

          </div>

        </div>

        <div className="my-4 border-t border-gray-200" />

        <HPBar
          hp={currentHP}
          maxHp={pokemon.stats.hp}
        />

      </div>
    </div>
  );
}