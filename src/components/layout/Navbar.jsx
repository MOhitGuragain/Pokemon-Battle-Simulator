
import { NavLink } from "react-router-dom";
import useTeamStore from "../../store/teamStore";
const links = [
  { to: "/", label: "Home" },
  { to: "/pokedex", label: "Pokédex" },
  { to: "/battle", label: "Battle" },
  { to: "/team-builder", label: "Team Builder" },
];

export default function Navbar() {
  const team = useTeamStore((state) => state.team);
  return (
   <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
  <div className="flex items-center gap-6">
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

  <div className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white">
    Team: {team.length}/6
  </div>
</div>
  );
}