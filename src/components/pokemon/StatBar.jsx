export default function StatBar({ name, value }) {
  return (
    <div className="space-y-1">
      <div className="flex justify-between">
        <span className="capitalize">
          {name.replace("-", " ")}
        </span>

        <span className="font-semibold">
          {value}
        </span>
      </div>

      <div className="h-3 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-green-500 transition-all duration-700"
          style={{
            width: `${Math.min((value / 255) * 100, 100)}%`,
          }}
        />
      </div>
    </div>
  );
}