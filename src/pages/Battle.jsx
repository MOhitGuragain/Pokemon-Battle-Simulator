import { useEffect } from "react";

import BattleArena from "../features/battle/components/BattleArena";

import useTeamStore from "../store/teamStore";
import useBattleStore from "../features/battle/store/battleStore";
import { generateEnemyTeam } from "../features/battle/utils/battleUtils";
import { usePokemonList } from "../hooks/usePokemonList";

export default function Battle() {
  const playerTeam = useTeamStore((state) => state.team);

  const initializeBattle = useBattleStore(
    (state) => state.initializeBattle
  );

  const { data: pokemonList, isLoading } = usePokemonList();

  useEffect(() => {
    if (
      playerTeam.length > 0 &&
      pokemonList &&
      pokemonList.length > 0
    ) {
      // Generate a random enemy team
      const enemyTeam = generateEnemyTeam(
        pokemonList,
        playerTeam
      );

      initializeBattle(playerTeam, enemyTeam);
    }
    
  }, [playerTeam, pokemonList, initializeBattle]);

  if (playerTeam.length === 0) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center p-8">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold">
            Battle Arena
          </h1>

          <p className="mt-4 text-gray-500">
            Add at least one Pokémon to your team before battling.
          </p>
        </div>
      </main>
    );
  }

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading Battle...
      </main>
    );
  }

  return <BattleArena />;
}