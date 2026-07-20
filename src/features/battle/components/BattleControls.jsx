import { playerAttack } from "../engine/battleEngine";
import useBattleStore from "../store/battleStore";

export default function BattleControls() {
  const winner = useBattleStore(
    (state) => state.winner
  );

  return (
    <div className="mt-8 flex justify-center gap-4">
      <button
        disabled={winner}
        onClick={playerAttack}
        className="rounded-xl bg-red-500 px-8 py-3 font-semibold text-white hover:bg-red-600 disabled:bg-gray-400"
      >
        Attack
      </button>

      <button
        disabled
        className="rounded-xl bg-gray-300 px-8 py-3"
      >
        Switch (Soon)
      </button>
    </div>
  );
}