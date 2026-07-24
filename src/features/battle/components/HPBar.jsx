export default function HPBar({ hp, maxHp }) {
  const percentage = Math.max(
    0,
    (hp / maxHp) * 100
  );

  let color = "from-green-400 to-green-600";

  if (percentage <= 50) {
    color = "from-yellow-300 to-yellow-500";
  }

  if (percentage <= 20) {
    color = "from-red-400 to-red-600";
  }

  return (
    <div className="space-y-2">
      {/* HP Header */}
      <div className="flex items-center justify-between">
        <span className="font-bold tracking-wide text-gray-700">
          HP
        </span>

        <span className="text-sm font-semibold text-gray-600">
          {hp} / {maxHp}
        </span>
      </div>

      {/* HP Bar */}
      <div className="h-6 overflow-hidden rounded-full border border-gray-300 bg-gray-200 shadow-inner">

        <div
          className={`h-full bg-gradient-to-r ${color} transition-all duration-700 ease-out`}
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

      {/* Footer */}
      <div className="flex justify-between text-xs text-gray-500">
        <span>
          {Math.round(percentage)}%
        </span>

        <span>
          {percentage > 50
            ? "Healthy"
            : percentage > 20
            ? "In Danger"
            : "Critical"}
        </span>
      </div>
    </div>
  );
}