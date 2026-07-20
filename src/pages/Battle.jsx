import BattleArena from "../features/battle/components/BattleArena";
import useTeamStore from "../store/teamStore";

export default function Battle() {
  const team = useTeamStore((state) => state.team);

  if (team.length < 2) {
    return (
      <main className="mx-auto flex min-h-[70vh] max-w-5xl items-center justify-center p-8">
        <div className="rounded-3xl border bg-white p-10 text-center shadow-lg">
          <h1 className="text-3xl font-bold">
            Battle Arena
          </h1>

          <p className="mt-4 text-gray-500">
            You need at least <strong>2 Pokémon</strong> in your team to start
            a battle.
          </p>
        </div>
      </main>
    );
  }

  return (
    <BattleArena
      player={team[0]}
      enemy={team[1]}
    />
  );
}