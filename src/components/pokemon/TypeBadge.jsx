const typeColors = {
  normal: "bg-gray-400",
  fire: "bg-red-500",
  water: "bg-blue-500",
  electric: "bg-yellow-400",
  grass: "bg-green-500",
  ice: "bg-cyan-400",
  fighting: "bg-orange-700",
  poison: "bg-purple-500",
  ground: "bg-amber-600",
  flying: "bg-indigo-300",
  psychic: "bg-pink-500",
  bug: "bg-lime-500",
  rock: "bg-stone-500",
  ghost: "bg-violet-600",
  dragon: "bg-indigo-600",
  dark: "bg-gray-800",
  steel: "bg-slate-500",
  fairy: "bg-pink-300",
};

export default function TypeBadge({ type }) {
  return (
    <span
      className={`rounded-full px-4 py-1 text-white capitalize ${
        typeColors[type] || "bg-gray-500"
      }`}
    >
      {type}
    </span>
  );
}