export default function HPBar({ hp, maxHp }) {
  const percentage = (hp / maxHp) * 100;

  const color =
    percentage > 50
      ? "bg-green-500"
      : percentage > 20
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="mt-4">
      <div className="mb-2 flex justify-between text-sm font-medium">
        <span>HP</span>
        <span>
          {hp} / {maxHp}
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-gray-200">
        <div
          className={`${color} h-full transition-all duration-700`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}