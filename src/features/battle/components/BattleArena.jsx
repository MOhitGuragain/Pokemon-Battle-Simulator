import { useEffect } from "react";

import useBattleStore from "../store/battleStore";

import BattlePokemon from "./BattlePokemon";
import BattleControls from "./BattleControls";
import BattleLog from "./BattleLog";

export default function BattleArena({ player, enemy }) {
  const initializeBattle = useBattleStore(
    (state) => state.initializeBattle
  );

  useEffect(() => {
    initializeBattle(player, enemy);
  }, [player, enemy, initializeBattle]);

  return (
    <main className="min-h-screen bg-linear-to-b from-sky-100 to-green-100 p-8">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-10 text-center text-5xl font-bold">
          Pokémon Battle
        </h1>

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