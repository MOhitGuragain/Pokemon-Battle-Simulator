import useBattleStore from "../store/battleStore";

import { calculateDamage } from "./damageCalculator";
import { nextTurn, cancelEnemyTurn } from "./turnManager";
import { getRandomMove } from "./getRandomMove";

export async function enemyTurn() {
  let state = useBattleStore.getState();

  // -------------------------------
  // Safety Checks
  // -------------------------------
  if (state.winner) return;
  if (state.turn !== "enemy") return;

  // -------------------------------
  // Attack Animation
  // -------------------------------
  state.setEnemyAttacking(true);

  await new Promise((resolve) =>
    setTimeout(resolve, 300)
  );

  state = useBattleStore.getState();

  if (
    state.turn !== "enemy" ||
    state.winner ||
    state.mustSwitchPlayer
  ) {
    state.setEnemyAttacking(false);
    return;
  }

  state.setEnemyAttacking(false);

  // -------------------------------
  // Choose Move
  // -------------------------------
  const move = await getRandomMove(state.enemy);

  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  state.addLog(
    `⚡ ${state.enemy.name} used ${moveName}!`
  );

  // -------------------------------
  // Accuracy Check
  // -------------------------------
  const hit =
    Math.random() * 100 <= move.accuracy;

  if (!hit) {
    state.addLog("❌ But it missed!");
    nextTurn();
    return;
  }

  // -------------------------------
  // Damage Calculation
  // -------------------------------
  const result = calculateDamage(
    state.enemy,
    state.player,
    move
  );

  if (result.stab) {
    state.addLog(
      "✨ Same Type Attack Bonus!"
    );
  }

  if (result.critical) {
    state.addLog("💥 Critical Hit!");
  }

  if (result.multiplier > 1) {
    state.addLog(
      "🔥 It's super effective!"
    );
  } else if (
    result.multiplier > 0 &&
    result.multiplier < 1
  ) {
    state.addLog(
      "😐 It's not very effective..."
    );
  } else if (
    result.multiplier === 0
  ) {
    state.addLog(
      "❌ It doesn't affect the opponent..."
    );
  }

  // -------------------------------
  // Apply Damage
  // -------------------------------
  state.damagePlayer(result.damage);

  state.setPlayerDamaged(true);

  setTimeout(() => {
    useBattleStore
      .getState()
      .setPlayerDamaged(false);
  }, 200);

  // Always fetch latest state
  state = useBattleStore.getState();

  const remainingHP = state.playerHP;

  state.addLog(
    `💢 ${state.player.name} lost ${result.damage} HP!`
  );

  state.addLog(
    `❤️ ${state.player.name} has ${remainingHP} HP remaining.`
  );

  // -------------------------------
  // Player Fainted
  // -------------------------------
  if (remainingHP <= 0) {
    state.addLog(
      `💀 ${state.player.name} fainted!`
    );

    const hasRemainingPokemon =
      state.playerTeam.some(
        (pokemon, index) =>
          index !==
            state.activePlayerIndex &&
          pokemon.currentHP > 0
      );

    // Enemy wins
    // Enemy wins
if (!hasRemainingPokemon) {
  cancelEnemyTurn();

  state.addLog(
    `🏆 ${state.enemy.name} wins the battle!`
  );

  state.setWinner(state.enemy.name);

  return;
}

   state.addLog(
  "🔄 Choose another Pokémon!"
);

state.setMustSwitchPlayer(true);

// Pause the battle until the player switches
state.setTurn(null);

// Cancel any pending enemy attack
cancelEnemyTurn();

return;
  }

  // -------------------------------
  // Continue Battle
  // -------------------------------
  nextTurn();
}