import { getTypeMultiplier } from "./getTypeMultiplier";

export function calculateDamage(attacker, defender, move) {
  const attack = attacker.stats.attack;
  const defense = defender.stats.defense;

  const attackType = move.type;

  const multiplier = getTypeMultiplier(
    attackType,
    defender.types
  );

  const critical = Math.random() < 0.0625;

  const random = Math.random() * 0.15 + 0.85;

  // Immunity
  if (multiplier === 0) {
    return {
      damage: 0,
      multiplier,
      critical: false,
    };
  }

  // Use the move's power
  const power = move.power ?? 40;

  let damage =
    (((attack * power) / defense) * random) * multiplier;

  if (critical) {
    damage *= 1.5;
  }

  damage = Math.max(1, Math.floor(damage));

  return {
    damage,
    multiplier,
    critical,
  };
}