import { useState } from "react";

import useBattleStore from "../store/battleStore";
import { playerAttack } from "../engine/battleEngine";

import SwitchPokemon from "./SwitchPokemon";

export default function BattleControls() {
  const [showSwitch, setShowSwitch] = useState(false);

  const turn = useBattleStore(
    (state) => state.turn
  );

  const winner = useBattleStore(
    (state) => state.winner
  );

  const mustSwitchPlayer = useBattleStore(
    (state) => state.mustSwitchPlayer
  );

  const player = useBattleStore(
    (state) => state.player
  );

  const enemy = useBattleStore(
    (state) => state.enemy
  );

  const playerTurn =
    turn === "player" &&
    !winner &&
    !mustSwitchPlayer;

  return (
    <>
      <div className="px-8 py-6">

        {/* Turn Indicator */}
        <div className="mb-8 text-center">

          <div className="mb-3 flex items-center justify-center gap-3">

            <div
              className={`h-3 w-3 rounded-full ${
                winner
                  ? "bg-blue-500"
                  : mustSwitchPlayer
                  ? "bg-yellow-500"
                  : playerTurn
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            />

            <h2 className="text-2xl font-bold">
              {winner
                ? "Battle Finished"
                : mustSwitchPlayer
                ? "Choose a Pokémon"
                : playerTurn
                ? `⚡ ${player?.name}'s Turn`
                : `⚡ ${enemy?.name}'s Turn`}
            </h2>

          </div>

          {!winner && (
            <p className="text-sm text-gray-500">
              {mustSwitchPlayer
                ? "Select another Pokémon to continue the battle."
                : playerTurn
                ? "Choose your next action."
                : "Waiting for your opponent's move..."}
            </p>
          )}

        </div>

        {/* Action Buttons */}
        <div className="mx-auto grid max-w-xl grid-cols-2 gap-6">

          <button
            onClick={playerAttack}
            disabled={!playerTurn}
            className="
              rounded-2xl
              bg-orange-500
              py-4
              text-lg
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-2
              hover:scale-105
              hover:bg-orange-600
              hover:shadow-xl
              active:scale-95
              disabled:cursor-not-allowed
              disabled:bg-gray-400
              disabled:shadow-none
            "
          >
            ⚔️ Attack
          </button>

          <button
            onClick={() => setShowSwitch(true)}
            disabled={
              winner ||
              (!mustSwitchPlayer &&
                turn !== "player")
            }
            className="
              rounded-2xl
              bg-indigo-500
              py-4
              text-lg
              font-bold
              text-white
              shadow-lg
              transition-all
              duration-200
              hover:-translate-y-2
              hover:scale-105
              hover:bg-indigo-600
              hover:shadow-xl
              active:scale-95
              disabled:cursor-not-allowed
              disabled:bg-gray-400
              disabled:shadow-none
            "
          >
            🎒 Switch
          </button>

        </div>

      </div>

      <SwitchPokemon
        isOpen={showSwitch}
        onClose={() => setShowSwitch(false)}
      />
    </>
  );
}