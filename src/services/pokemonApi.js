const BASE_URL = "https://pokeapi.co/api/v2";

export async function getPokemonList(limit = 151) {
  const response = await fetch(`${BASE_URL}/pokemon?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon.");
  }

  const data = await response.json();

  const pokemonList = await Promise.all(
    data.results.map(async (pokemon) => {
      const detailResponse = await fetch(pokemon.url);

      if (!detailResponse.ok) {
        throw new Error(`Failed to fetch ${pokemon.name}`);
      }

      const detail = await detailResponse.json();

      return {
  id: detail.id,
  name: detail.name,

  image:
    detail.sprites.other["official-artwork"].front_default,

  sprite: detail.sprites.front_default,

  types: detail.types.map((type) => type.type.name),

  height: detail.height,
  weight: detail.weight,

  abilities: detail.abilities.map(
    (ability) => ability.ability.name
  ),

  stats: {
    hp: detail.stats[0].base_stat,
    attack: detail.stats[1].base_stat,
    defense: detail.stats[2].base_stat,
    specialAttack: detail.stats[3].base_stat,
    specialDefense: detail.stats[4].base_stat,
    speed: detail.stats[5].base_stat,
  },
};
    })
  );

  return pokemonList;
}

export async function getPokemonDetails(id) {
  const response = await fetch(`${BASE_URL}/pokemon/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Pokémon details.");
  }

  return response.json();
}