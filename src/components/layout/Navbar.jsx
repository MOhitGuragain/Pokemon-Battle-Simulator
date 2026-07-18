
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Home" },
  { to: "/pokedex", label: "Pokédex" },
  { to: "/battle", label: "Battle" },
  { to: "/team-builder", label: "Team Builder" },
];

export default function Navbar() {
  return (
    <nav className="border-b bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-6 p-4">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `font-medium transition ${
                isActive
                  ? "text-red-500"
                  : "text-gray-700 hover:text-red-500"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}