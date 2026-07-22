import useBattleStore from "../store/battleStore";
import { calculateDamage } from "./damageCalculator";
import { nextTurn } from "./turnManager";
import { getRandomMove } from "./getRandomMove";

export async function enemyTurn() {
  const state = useBattleStore.getState();

  if (state.winner) return;
  if (state.turn !== "enemy") return;

  // Get a random move
  const move = await getRandomMove(state.enemy);

  const hit =
    Math.random() * 100 <= move.accuracy;

  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  state.addLog(
    `⚡ ${state.enemy.name} used ${moveName}!`
  );

  if (!hit) {
    state.addLog("❌ But it missed!");
    nextTurn();
    return;
  }

  const result = calculateDamage(
    state.enemy,
    state.player,
    move
  );

  const damage = result.damage;

  if (result.stab) {
    state.addLog("✨ Same Type Attack Bonus!");
  }

  if (result.critical) {
    state.addLog("💥 Critical Hit!");
  }

  if (result.multiplier > 1) {
    state.addLog("🔥 It's super effective!");
  } else if (
    result.multiplier < 1 &&
    result.multiplier > 0
  ) {
    state.addLog("😐 It's not very effective...");
  } else if (result.multiplier === 0) {
    state.addLog("❌ It doesn't affect the opponent...");
  }

  state.damagePlayer(damage);

  const remainingHP = Math.max(
    0,
    state.playerHP - damage
  );

  state.addLog(
    `💢 ${state.player.name} lost ${damage} HP!`
  );

  state.addLog(
    `❤️ ${state.player.name} has ${remainingHP} HP remaining.`
  );

  // ---------- Player fainted ----------
  if (remainingHP <= 0) {
    state.addLog(`💀 ${state.player.name} fainted!`);

    // Check if another Pokémon is available
    const hasRemainingPokemon = state.playerTeam.some(
      (pokemon, index) =>
        index !== state.activePlayerIndex &&
        pokemon.currentHP > 0
    );

    // No Pokémon left -> Enemy wins
    if (!hasRemainingPokemon) {
      state.addLog(
        `🏆 ${state.enemy.name} wins the battle!`
      );
      state.setWinner(state.enemy.name);
      return;
    }

    // Player must choose another Pokémon
state.addLog("🔄 Choose another Pokémon!");

state.setMustSwitchPlayer(true);
state.setTurn(null);

return;
  }

  nextTurn();
}