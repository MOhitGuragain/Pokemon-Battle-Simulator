const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon.");
  }

  return response.json();
}

export async function getPokemonDetails(id) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details.");
  }

  return response.json();
}