export default function HPBar({ hp, maxHp }) {
  const percentage = (hp / maxHp) * 100;

  return (
    <div>
      <div className="mb-1 flex justify-between text-sm font-medium">
        <span>HP</span>
        <span>
          {hp} / {maxHp}
        </span>
      </div>

      <div className="h-4 overflow-hidden rounded-full bg-gray-300">
        <div
          className={`h-full transition-all duration-500 ${
            percentage > 50
              ? "bg-green-500"
              : percentage > 20
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}