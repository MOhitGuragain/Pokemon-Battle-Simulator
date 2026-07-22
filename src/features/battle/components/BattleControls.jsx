import { useState } from "react";

import useBattleStore from "../store/battleStore";
import { playerAttack } from "../engine/battleEngine";

import SwitchPokemon from "./SwitchPokemon";

export default function BattleControls() {
  const [showSwitch, setShowSwitch] = useState(false);

  const turn = useBattleStore((state) => state.turn);
  const winner = useBattleStore((state) => state.winner);

  const mustSwitchPlayer = useBattleStore(
    (state) => state.mustSwitchPlayer
  );

  return (
    <>
      <div className="mt-10 flex justify-center gap-6">
        {/* Attack Button */}
        <button
          onClick={playerAttack}
          disabled={
            turn !== "player" ||
            winner ||
            mustSwitchPlayer
          }
          className="rounded-xl bg-red-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {mustSwitchPlayer
            ? "Choose Pokémon"
            : turn === "player"
            ? "⚔ Attack"
            : "Enemy Turn..."}
        </button>

        {/* Switch Button */}
        <button
          onClick={() => setShowSwitch(true)}
          disabled={
            (!mustSwitchPlayer && turn !== "player") ||
            winner
          }
          className="rounded-xl bg-blue-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          🔄 Switch
        </button>
      </div>

      <SwitchPokemon
        isOpen={showSwitch}
        onClose={() => setShowSwitch(false)}
      />
    </>
  );
}