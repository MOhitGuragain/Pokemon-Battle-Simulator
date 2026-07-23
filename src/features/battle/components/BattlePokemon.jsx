import HPBar from "./HPBar";
import TypeBadge from "../../../components/pokemon/TypeBadge";
import useBattleStore from "../store/battleStore";

export default function BattlePokemon({ pokemon }) {
  const player = useBattleStore((state) => state.player);

  const playerHP = useBattleStore((state) => state.playerHP);
  const enemyHP = useBattleStore((state) => state.enemyHP);

  // Attack Animation
  const playerAttacking = useBattleStore(
    (state) => state.playerAttacking
  );

  const enemyAttacking = useBattleStore(
    (state) => state.enemyAttacking
  );

  // Damage Flash
  const playerDamaged = useBattleStore(
    (state) => state.playerDamaged
  );

  const enemyDamaged = useBattleStore(
    (state) => state.enemyDamaged
  );

  const isPlayer = pokemon.id === player?.id;

  const currentHP = isPlayer ? playerHP : enemyHP;

  // Attack movement
  const attackAnimation = isPlayer
    ? playerAttacking
      ? "translate-x-8"
      : "translate-x-0"
    : enemyAttacking
    ? "-translate-x-8"
    : "translate-x-0";

  // Flash when damaged
  const damageFlash = isPlayer
    ? playerDamaged
      ? "brightness-50"
      : ""
    : enemyDamaged
    ? "brightness-50"
    : "";

  return (
    <div className="rounded-3xl bg-white p-6 shadow-xl">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className={`
          mx-auto
          h-56
          w-56
          transform
          transition-all
          duration-200
          ease-out
          ${attackAnimation}
          ${damageFlash}
        `}
      />

      <h2 className="mt-4 text-center text-3xl font-bold capitalize">
        {pokemon.name}
      </h2>

      <p className="mb-4 text-center text-gray-500">
        #{String(pokemon.id).padStart(3, "0")}
      </p>

      <div className="mb-6 flex justify-center gap-2">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

      <HPBar
        hp={currentHP}
        maxHp={pokemon.stats.hp}
      />
    </div>
  );
}