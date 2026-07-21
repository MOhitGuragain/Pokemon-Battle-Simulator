import { create } from "zustand";

const useBattleStore = create((set) => ({
  player: null,
  enemy: null,

  playerHP: 0,
  enemyHP: 0,

  turn: null,

  winner: null,

  battleLog: [],

  initializeBattle(player, enemy) {
    const firstTurn =
      player.stats.speed >= enemy.stats.speed
        ? "player"
        : "enemy";

    set({
      player,
      enemy,

      playerHP: player.stats.hp,
      enemyHP: enemy.stats.hp,

      turn: firstTurn,

      winner: null,

      battleLog: [
        `${player.name} entered the battle!`,
        `${enemy.name} appeared!`,
        `${
          firstTurn === "player"
            ? player.name
            : enemy.name
        } moves first!`,
      ],
    });
  },

  damagePlayer(amount) {
    set((state) => ({
      playerHP: Math.max(0, state.playerHP - amount),
    }));
  },

  damageEnemy(amount) {
    set((state) => ({
      enemyHP: Math.max(0, state.enemyHP - amount),
    }));
  },

  setTurn(turn) {
    set({ turn });
  },

  setWinner(name) {
    set({ winner: name });
  },

  addLog(message) {
    set((state) => ({
      battleLog: [...state.battleLog, message],
    }));
  },
}));

export default useBattleStore;