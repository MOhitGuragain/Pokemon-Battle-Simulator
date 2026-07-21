import typeChart from "./typeChart";

export function getTypeMultiplier(attackType, defenderTypes) {
  let multiplier = 1;

  defenderTypes.forEach((type) => {
    const value = typeChart[attackType]?.[type];

    if (value !== undefined) {
      multiplier *= value;
    }
  });

  return multiplier;
}