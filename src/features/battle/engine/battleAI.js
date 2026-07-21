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

if (!hit) {
  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  state.addLog(
    `⚡ ${state.enemy.name} used ${moveName}!`
  );

  state.addLog("❌ But it missed!");

  nextTurn();
  return;
}

  const moveName = move.name
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

  state.addLog(
    `⚡ ${state.enemy.name} used ${moveName}!`
  );

  // Damage calculation (we'll update it to use move power/type next)
  const result = calculateDamage(
  state.enemy,
  state.player,
  move
);

  const damage = result.damage;

  if (result.critical) {
    state.addLog("💥 Critical Hit!");
  }

  if (result.multiplier > 1) {
    state.addLog("🔥 It's super effective!");
  } else if (result.multiplier < 1 && result.multiplier > 0) {
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

  if (remainingHP <= 0) {
    state.addLog(`${state.player.name} fainted!`);
    state.addLog(`🏆 ${state.enemy.name} wins!`);
    state.setWinner(state.enemy.name);
    return;
  }

  nextTurn();
}