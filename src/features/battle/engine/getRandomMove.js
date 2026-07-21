import { getCachedMove } from "./moveCache";

export async function getRandomMove(pokemon) {
  if (!pokemon.moves.length) {
    return {
      name: "tackle",
      power: 40,
      accuracy: 100,
      type: "normal",
    };
  }

  const random =
    pokemon.moves[
      Math.floor(Math.random() * pokemon.moves.length)
    ];

  const move = await getCachedMove(random.url);

  return {
    name: move.name,
    power: move.power ?? 40,
    accuracy: move.accuracy ?? 100,
    type: move.type.name,
    damageClass: move.damage_class.name,
  };
}