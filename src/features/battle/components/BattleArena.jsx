import { useEffect } from "react";

import useBattleStore from "../store/battleStore";
import { startBattle } from "../engine/turnManager";

import BattlePokemon from "./BattlePokemon";
import BattleControls from "./BattleControls";
import BattleLog from "./BattleLog";

export default function BattleArena() {
  const player = useBattleStore((state) => state.player);
  const enemy = useBattleStore((state) => state.enemy);

  const winner = useBattleStore((state) => state.winner);

  useEffect(() => {
    if (player && enemy) {
      startBattle();
    }
  }, [player, enemy]);

  if (!player || !enemy) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading Battle...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-100 to-green-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-5xl font-bold">
          Pokémon Battle
        </h1>

        {winner && (
          <div className="mb-8 rounded-xl bg-green-500 p-4 text-center text-2xl font-bold text-white">
            🎉 {winner} Wins!
          </div>
        )}

        <div className="grid gap-10 md:grid-cols-2">
          <BattlePokemon pokemon={player} />
          <BattlePokemon pokemon={enemy} />
        </div>

        <BattleControls />

        <BattleLog />
      </div>
    </main>
  );
}