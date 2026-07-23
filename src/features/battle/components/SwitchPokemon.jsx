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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-2xl">
        <h2 className="mb-6 text-center text-3xl font-bold">
          Choose Pokémon
        </h2>

        <div className="space-y-4">
          {playerTeam.map((pokemon, index) => (
            <button
              key={pokemon.id}
              disabled={
                index === activePlayerIndex ||
                pokemon.currentHP <= 0
              }
              onClick={() => {
                switchPlayer(index);
                onClose();

                if (mustSwitchPlayer) {
                  // Replacing a fainted Pokémon
                  continueBattleAfterSwitch();
                } else {
                  // Manual switch consumes the player's turn
                  nextTurn();
                }
              }}
              className={`flex w-full items-center justify-between rounded-2xl border p-4 transition ${
                index === activePlayerIndex ||
                pokemon.currentHP <= 0
                  ? "cursor-not-allowed border-gray-300 bg-gray-200"
                  : "hover:border-blue-400 hover:bg-blue-50"
              }`}
            >
              <div className="flex items-center gap-4">
                <img
                  src={pokemon.sprite}
                  alt={pokemon.name}
                  className="h-16 w-16"
                />

                <div className="text-left">
                  <h3 className="text-xl font-bold capitalize">
                    {pokemon.name}
                  </h3>

                  <p className="text-gray-500">
                    HP: {pokemon.currentHP} / {pokemon.stats.hp}
                  </p>
                </div>
              </div>

              {index === activePlayerIndex && (
                <span className="font-bold text-green-600">
                  Active
                </span>
              )}

              {pokemon.currentHP <= 0 && (
                <span className="font-bold text-red-600">
                  Fainted
                </span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full rounded-xl bg-red-500 py-3 font-bold text-white transition hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}