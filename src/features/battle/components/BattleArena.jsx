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
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-b from-sky-300 to-green-200">
        <h1 className="text-4xl font-bold">
          Loading Battle...
        </h1>
      </main>
    );
  }

return (
  <main className="min-h-screen bg-gradient-to-b from-sky-300 via-sky-100 to-green-200 py-10">

    <div className="mx-auto max-w-7xl px-6">

      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          Pokémon Battle
        </h1>
      </header>

      {/* Winner */}
      {winner && (
        <div className="mb-6 rounded-2xl bg-green-500 py-5 text-center text-3xl font-bold text-white shadow-xl">
          🏆 {winner} Wins!
        </div>
      )}

      {/* Battle Card */}
      <section className="overflow-hidden rounded-[2rem] border-4 border-white bg-gradient-to-b from-sky-200 via-green-100 to-green-300 shadow-2xl">

        {/* Battlefield */}
        <div className="relative min-h-[540px] px-10 py-5">

          {/* Clouds */}
          <div className="absolute left-10 top-8 h-8 w-28 rounded-full bg-white/30 blur-xl" />
          <div className="absolute right-20 top-16 h-10 w-40 rounded-full bg-white/20 blur-xl" />

          {/* Enemy */}
<div className="absolute top-8 right-12">
  <div className="relative">
    <div className="absolute bottom-24 right-8 h-10 w-52 rounded-full bg-black/20 blur-md" />
    <BattlePokemon pokemon={enemy} />
  </div>
</div>

{/* Player */}
<div className="absolute bottom-8 left-12">
  <div className="relative">
    <div className="absolute bottom-24 left-8 h-12 w-60 rounded-full bg-black/20 blur-md" />
    <BattlePokemon pokemon={player} />
  </div>
</div>

        </div>

        {/* Divider */}
        <div className="border-t-4 border-white/70" />

        {/* Battle Log */}
        <div className="bg-white/80 backdrop-blur-md">
          <BattleLog />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300" />

        {/* Controls */}
        <div className="bg-white px-8 py-6">
          <BattleControls />
        </div>

      </section>

    </div>

  </main>
);
}