import { getTypeMultiplier } from "./getTypeMultiplier";

export function calculateDamage(attacker, defender, move) {
  const attack = attacker.stats.attack;
  const defense = defender.stats.defense;

  // Move type
  const attackType = move.type;

  // Type effectiveness
  const multiplier = getTypeMultiplier(
    attackType,
    defender.types
  );

  // Critical hit (6.25% chance)
  const critical = Math.random() < 0.0625;

  // Random damage factor (85% - 100%)
  const random = Math.random() * 0.15 + 0.85;

  // Same Type Attack Bonus (STAB)
  const stab = attacker.types.includes(attackType);

  // No damage if immune
  if (multiplier === 0) {
    return {
      damage: 0,
      multiplier,
      critical: false,
      stab,
    };
  }

  // Move power
  const power = move.power ?? 40;

  let damage =
    (((attack * power) / defense) * random);

  // Apply STAB
  if (stab) {
    damage *= 1.5;
  }

  // Apply type effectiveness
  damage *= multiplier;

  // Apply critical hit
  if (critical) {
    damage *= 1.5;
  }

  // Minimum damage
  damage = Math.max(1, Math.floor(damage));

  return {
    damage,
    multiplier,
    critical,
    stab,
  };
}