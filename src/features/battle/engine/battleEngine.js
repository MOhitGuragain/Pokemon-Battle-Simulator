import useBattleStore from "../store/battleStore";
import { calculateDamage } from "./damageCalculator";

export function playerAttack() {
  const state = useBattleStore.getState();

  if (state.winner) return;

  const damage = calculateDamage(
    state.player,
    state.enemy
  );

  const newEnemyHP = Math.max(
    0,
    state.enemyHP - damage
  );

  state.setEnemyHP(newEnemyHP);

  state.addLog(
    `${state.player.name} dealt ${damage} damage!`
  );

  if (newEnemyHP <= 0) {
    state.setWinner(state.player.name);

    state.addLog(
      `${state.enemy.name} fainted!`
    );
  }
}