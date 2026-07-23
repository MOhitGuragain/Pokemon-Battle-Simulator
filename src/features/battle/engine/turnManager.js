import useBattleStore from "../store/battleStore";
import { enemyTurn } from "./battleAI";

const TURN_DELAY = 1000;

// Only one timer can exist
let enemyTimer = null;

// ------------------------------------
// Cancel pending enemy attack
// ------------------------------------
export function cancelEnemyTurn() {
  if (enemyTimer) {
    clearTimeout(enemyTimer);
    enemyTimer = null;
  }
}

// ------------------------------------
// Schedule enemy attack
// ------------------------------------
function scheduleEnemyTurn() {
  cancelEnemyTurn();

  enemyTimer = setTimeout(() => {
    enemyTimer = null;

    const state = useBattleStore.getState();

    if (
      state.turn !== "enemy" ||
      state.winner ||
      state.mustSwitchPlayer
    ) {
      return;
    }

    enemyTurn();
  }, TURN_DELAY);
}

// ------------------------------------
// Start Battle
// ------------------------------------
export function startBattle() {
  const state = useBattleStore.getState();

  if (
    state.turn === "enemy" &&
    !state.winner &&
    !state.mustSwitchPlayer
  ) {
    scheduleEnemyTurn();
  }
}

// ------------------------------------
// Next Turn
// ------------------------------------
export function nextTurn() {
  const state = useBattleStore.getState();

  if (state.winner) return;
  if (state.mustSwitchPlayer) return;

  const next =
    state.turn === "player"
      ? "enemy"
      : "player";

  state.setTurn(next);

  if (next === "enemy") {
    scheduleEnemyTurn();
  } else {
    cancelEnemyTurn();
  }
}

// ------------------------------------
// Continue after switch
// ------------------------------------
export function continueBattleAfterSwitch() {
  const state = useBattleStore.getState();

  if (state.winner) return;

  state.setMustSwitchPlayer(false);
  state.setTurn("enemy");

  scheduleEnemyTurn();
}