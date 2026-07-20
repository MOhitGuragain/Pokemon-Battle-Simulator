import { Link } from "react-router-dom";

export default function TeamSlot({ pokemon, children }) {
  if (!pokemon) {
    return (
      <Link to="/pokedex">
        <div className="flex h-80 cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-gray-300 bg-gray-50 transition hover:border-blue-500 hover:bg-blue-50">
          <div className="text-6xl text-gray-400">+</div>

          <p className="mt-4 font-semibold text-gray-500">
            Add Pokémon
          </p>
        </div>
      </Link>
    );
  }

  return children;
}