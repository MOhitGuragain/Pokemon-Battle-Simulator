import useBattleStore from "../store/battleStore";

import { calculateDamage } from "./damageCalculator";
import { nextTurn, cancelEnemyTurn } from "./turnManager";
import { getRandomMove } from "./getRandomMove";
import { enemyTurn } from "./battleAI";

export async function playerAttack() {
  let state = useBattleStore.getState();

  // Safety checks
  if (state.winner) return;
  if (state.turn !== "player") return;

  // -------------------------------
  // Attack Animation
  // -------------------------------
  state.setPlayerAttacking(true);

  await new Promise((resolve) =>
    setTimeout(resolve, 300)
  );

  state = useBattleStore.getState();

  if (
    state.turn !== "player" ||
    state.winner
  ) {
    state.setPlayerAttacking(false);
    return;
  }

  state.setPlayerAttacking(false);

  // -------------------------------
  // Choose Move
  // -------------------------------
  const move = await getRandomMove(state.player);

  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) =>
      c.toUpperCase()
    );

  state.addLog(
    `⚡ ${state.player.name} used ${moveName}!`
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
    state.player,
    state.enemy,
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
  state.damageEnemy(result.damage);

  state.setEnemyDamaged(true);

  setTimeout(() => {
    useBattleStore
      .getState()
      .setEnemyDamaged(false);
  }, 200);

  // Always fetch latest state
  state = useBattleStore.getState();

  const remainingHP = state.enemyHP;

  state.addLog(
    `💢 ${state.enemy.name} lost ${result.damage} HP!`
  );

  state.addLog(
    `❤️ ${state.enemy.name} has ${remainingHP} HP remaining.`
  );

  // -------------------------------
  // Enemy Fainted
  // -------------------------------
  if (remainingHP <= 0) {
    state.addLog(
      `💀 ${state.enemy.name} fainted!`
    );

    const nextEnemyIndex =
      state.enemyTeam.findIndex(
        (pokemon, index) =>
          index !==
            state.activeEnemyIndex &&
          pokemon.currentHP > 0
      );

    // Player wins
if (nextEnemyIndex === -1) {
  cancelEnemyTurn();

  state.addLog(
    `🏆 ${state.player.name} wins the battle!`
  );

  state.setWinner(state.player.name);

  return;
}

    state.addLog(
  "🎒 Enemy is choosing another Pokémon..."
);

// Cancel any old enemy attack timer
cancelEnemyTurn();

setTimeout(() => {
      const latest =
        useBattleStore.getState();

      latest.switchEnemy(nextEnemyIndex);

      const updated =
        useBattleStore.getState();

      updated.addLog(
        `👾 Enemy sent out ${updated.enemy.name}!`
      );

      // Temporary until Step 4
      updated.setTurn("enemy");

      setTimeout(() => {
        const current =
          useBattleStore.getState();

        if (
          current.turn === "enemy" &&
          !current.winner &&
          !current.mustSwitchPlayer
        ) {
          enemyTurn();
        }
      }, 700);
    }, 1200);

    return;
  }

  // -------------------------------
  // Continue Battle
  // -------------------------------
  nextTurn();
}