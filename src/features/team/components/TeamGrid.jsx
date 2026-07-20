import TeamCard from "./TeamCard";
import TeamSlot from "./TeamSlot";

export default function TeamGrid({ team }) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <TeamSlot
          key={index}
          pokemon={team[index]}
        >
          <TeamCard pokemon={team[index]} />
        </TeamSlot>
      ))}
    </div>
  );
}