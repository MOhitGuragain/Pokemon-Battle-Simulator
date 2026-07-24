import useBattleStore from "../store/battleStore";
import {
  nextTurn,
  continueBattleAfterSwitch,
} from "../engine/turnManager";

export default function SwitchPokemon({
  isOpen,
  onClose,
}) {
  const playerTeam = useBattleStore(
    (state) => state.playerTeam
  );

  const activePlayerIndex = useBattleStore(
    (state) => state.activePlayerIndex
  );

  const switchPlayer = useBattleStore(
    (state) => state.switchPlayer
  );

  const mustSwitchPlayer = useBattleStore(
    (state) => state.mustSwitchPlayer
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">

      <div className="w-full max-w-4xl rounded-3xl bg-white p-8 shadow-2xl">

        {/* Header */}
        <div className="mb-8 text-center">

          <h2 className="text-4xl font-extrabold">
            Choose Pokémon
          </h2>

          <p className="mt-2 text-gray-500">
            Select a Pokémon to continue the battle.
          </p>

        </div>

        {/* Team Grid */}
        <div className="grid gap-5 md:grid-cols-2">

          {playerTeam.map((pokemon, index) => {
            const hpPercent =
              (pokemon.currentHP /
                pokemon.stats.hp) *
              100;

            return (
              <button
                key={pokemon.id}
                disabled={
                  index ===
                    activePlayerIndex ||
                  pokemon.currentHP <= 0
                }
                onClick={() => {
                  switchPlayer(index);

                  const battle =
                    useBattleStore.getState();

                  battle.setPlayerFainted(false);
                  battle.setPlayerEntering(true);

                  onClose();

                  setTimeout(() => {
                    const current =
                      useBattleStore.getState();

                    current.setPlayerEntering(false);

                    if (mustSwitchPlayer) {
                      continueBattleAfterSwitch();
                    } else {
                      nextTurn();
                    }
                  }, 500);
                }}
                className={`
                  rounded-3xl
                  border
                  p-5
                  transition-all
                  duration-200
                  shadow-md
                  ${
                    index ===
                      activePlayerIndex
                      ? "border-green-500 bg-green-100"
                      : pokemon.currentHP <= 0
                      ? "border-gray-300 bg-gray-200 opacity-60"
                      : "border-gray-200 bg-white hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl"
                  }
                `}
              >
                <div className="flex items-center gap-5">

                  <img
                    src={pokemon.sprite}
                    alt={pokemon.name}
                    className="h-24 w-24"
                  />

                  <div className="flex-1 text-left">

                    <div className="flex items-center justify-between">

                      <h3 className="text-2xl font-bold capitalize">
                        {pokemon.name}
                      </h3>

                      {index ===
                        activePlayerIndex && (
                        <span className="rounded-full bg-green-500 px-3 py-1 text-xs font-bold text-white">
                          ACTIVE
                        </span>
                      )}

                      {pokemon.currentHP <=
                        0 && (
                        <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-bold text-white">
                          FAINTED
                        </span>
                      )}
                    </div>

                    <p className="mt-2 text-gray-500">
                      HP {pokemon.currentHP} /{" "}
                      {pokemon.stats.hp}
                    </p>

                    {/* HP Bar */}
                    <div className="mt-3 h-3 overflow-hidden rounded-full bg-gray-200">

                      <div
                        className={`h-full transition-all duration-500 ${
                          hpPercent > 50
                            ? "bg-green-500"
                            : hpPercent > 20
                            ? "bg-yellow-400"
                            : "bg-red-500"
                        }`}
                        style={{
                          width: `${hpPercent}%`,
                        }}
                      />

                    </div>

                  </div>

                </div>
              </button>
            );
          })}

        </div>

        {/* Cancel */}
        {!mustSwitchPlayer && (
          <button
            onClick={onClose}
            className="mt-8 w-full rounded-2xl bg-red-500 py-4 text-lg font-bold text-white transition-all duration-200 hover:bg-red-600 hover:shadow-lg"
          >
            Cancel
          </button>
        )}

      </div>

    </div>
  );
}