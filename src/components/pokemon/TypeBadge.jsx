import { typeColors } from "../../utils/pokemonTypes";
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