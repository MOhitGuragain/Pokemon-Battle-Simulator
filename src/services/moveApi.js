// const BASE_URL = "https://pokeapi.co/api/v2";

export async function getMove(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch move.");
  }

  const data = await response.json();

  return {
    id: data.id,
    name: data.name,
    power: data.power ?? 40,
    accuracy: data.accuracy ?? 100,
    type: data.type.name,
    damageClass: data.damage_class.name,
  };
}