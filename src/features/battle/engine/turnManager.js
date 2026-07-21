import useBattleStore from "../store/battleStore";
import { enemyTurn } from "./battleAI";

export function nextTurn() {
  const state = useBattleStore.getState();

  if (state.winner) return;

  const next =
    state.turn === "player"
      ? "enemy"
      : "player";

  state.setTurn(next);

  if (next === "enemy") {
    setTimeout(() => {
      enemyTurn();
    }, 1000);
  }
}

export function startBattle() {
  const state = useBattleStore.getState();

  if (state.turn === "enemy") {
    setTimeout(() => {
      enemyTurn();
    }, 1000);
  }
}