export default function HPBar({ hp, maxHp }) {
  const percentage = Math.max(
    0,
    (hp / maxHp) * 100
  );

  const color =
    percentage > 50
      ? "bg-green-500"
      : percentage > 20
      ? "bg-yellow-400"
      : "bg-red-500";

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm font-semibold">
        <span>HP</span>

        <span>
          {hp} / {maxHp}
        </span>
      </div>

      <div className="h-5 overflow-hidden rounded-full border border-gray-400 bg-gray-200 shadow-inner">
        <div
          className={`${color} h-full transition-all duration-700 ease-out`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <div className="mt-1 text-right text-xs text-gray-500">
        {Math.round(percentage)}%
      </div>
    </div>
  );
}