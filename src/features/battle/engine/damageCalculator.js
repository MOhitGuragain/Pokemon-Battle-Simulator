export function calculateDamage(attacker, defender) {
  const attack = attacker.stats.attack;
  const defense = defender.stats.defense;

  const random = Math.floor(Math.random() * 8);

  const damage = Math.max(
    5,
    Math.floor((attack * 1.5 - defense) / 2) + random
  );

  return damage;
}