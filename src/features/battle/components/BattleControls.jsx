import useBattleStore from "../store/battleStore";
import { playerAttack } from "../engine/battleEngine";

export default function BattleControls() {
  const turn = useBattleStore((state) => state.turn);
  const winner = useBattleStore((state) => state.winner);

  return (
    <div className="mt-10 flex justify-center gap-6">
      <button
        onClick={playerAttack}
        disabled={turn !== "player" || winner}
        className="rounded-xl bg-red-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
      >
        {turn === "player" ? "⚔ Attack" : "Enemy Turn..."}
      </button>

      <button
        disabled
        className="rounded-xl bg-gray-300 px-8 py-3 text-lg text-gray-600"
      >
        🔄 Switch (Soon)
      </button>
    </div>
  );
}