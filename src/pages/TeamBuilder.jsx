import useTeamStore from "../store/teamStore";

import TeamGrid from "../features/team/components/TeamGrid";

export default function TeamBuilder() {
  const team = useTeamStore((state) => state.team);

  const clearTeam = useTeamStore((state) => state.clearTeam);

  return (
    <main className="mx-auto max-w-7xl p-8">
      <div className="mb-10 text-center">
        <h1 className="text-5xl font-bold">
          Team Builder
        </h1>

        <p className="mt-3 text-lg text-gray-500">
          {team.length} / 6 Pokémon Selected
        </p>
      </div>

      <TeamGrid team={team} />

      {team.length > 0 && (
        <div className="mt-10 flex justify-center">
          <button
            onClick={clearTeam}
            className="rounded-xl bg-red-500 px-8 py-3 text-lg font-semibold text-white transition hover:bg-red-600"
          >
            Clear Team
          </button>
        </div>
      )}
    </main>
  );
}