import useBattleStore from "../store/battleStore";

export default function BattleLog() {
  const battleLog = useBattleStore(
    (state) => state.battleLog
  );

  return (
    <div className="mt-8 rounded-2xl bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-xl font-bold">
        Battle Log
      </h2>

      <div className="space-y-2">
        {battleLog.map((entry, index) => (
          <p
            key={index}
            className="text-gray-700"
          >
            • {entry}
          </p>
        ))}
      </div>
    </div>
  );
}