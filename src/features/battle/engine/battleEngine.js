import useBattleStore from "../store/battleStore";

import { calculateDamage } from "./damageCalculator";
import { nextTurn } from "./turnManager";
import { getRandomMove } from "./getRandomMove";
import { enemyTurn } from "./battleAI";

export async function playerAttack() {
  const state = useBattleStore.getState();

  if (state.winner) return;
  if (state.turn !== "player") return;

  // Get a random move
  const move = await getRandomMove(state.player);

  const hit =
    Math.random() * 100 <= move.accuracy;

  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  state.addLog(
    `⚡ ${state.player.name} used ${moveName}!`
  );

  if (!hit) {
    state.addLog("❌ But it missed!");
    nextTurn();
    return;
  }

  const result = calculateDamage(
    state.player,
    state.enemy,
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

  state.damageEnemy(damage);

  const remainingHP = Math.max(
    0,
    state.enemyHP - damage
  );

  state.addLog(
    `💢 ${state.enemy.name} lost ${damage} HP!`
  );

  state.addLog(
    `❤️ ${state.enemy.name} has ${remainingHP} HP remaining.`
  );

  // ---------- Enemy fainted ----------
  if (remainingHP <= 0) {
    state.addLog(`💀 ${state.enemy.name} fainted!`);

    // Find the next available enemy Pokémon
    const nextEnemyIndex = state.enemyTeam.findIndex(
      (pokemon, index) =>
        index !== state.activeEnemyIndex &&
        pokemon.currentHP > 0
    );

    // No Pokémon left -> Player wins
    if (nextEnemyIndex === -1) {
      state.addLog(
        `🏆 ${state.player.name} wins the battle!`
      );
      state.setWinner(state.player.name);
      return;
    }

    // Switch to the next Pokémon
    // Enemy sends out the next Pokémon
state.addLog(
  "🎒 Enemy is choosing another Pokémon..."
);

setTimeout(() => {
  const battleState = useBattleStore.getState();

  battleState.switchEnemy(nextEnemyIndex);

  const nextPokemon =
    useBattleStore.getState().enemy;

  battleState.addLog(
    `👾 Enemy sent out ${nextPokemon.name}!`
  );

  battleState.setTurn("enemy");

  setTimeout(() => {
    enemyTurn();
  }, 800);
}, 1200);

return;
  }

  nextTurn();
}