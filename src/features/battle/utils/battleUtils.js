export function generateEnemyTeam(allPokemon, playerTeam) {
  // Remove player's Pokémon
  const availablePokemon = allPokemon.filter(
    (pokemon) =>
      !playerTeam.some(
        (member) => member.id === pokemon.id
      )
  );

  // Shuffle
  const shuffled = [...availablePokemon].sort(
    () => Math.random() - 0.5
  );

  // Return 6 random Pokémon
  return shuffled.slice(0, 6);
}