import { create } from "zustand";

const useBattleStore = create((set) => ({
  player: null,
  enemy: null,

  playerHP: 0,
  enemyHP: 0,

  battleLog: [],

  winner: null,

  initializeBattle(player, enemy) {
    set({
      player,
      enemy,

      playerHP: player.stats.hp,
      enemyHP: enemy.stats.hp,

      winner: null,

      battleLog: [
        `${player.name} entered the battle!`,
        `${enemy.name} appeared!`,
      ],
    });
  },

  setPlayerHP: (hp) => set({ playerHP: hp }),

  setEnemyHP: (hp) => set({ enemyHP: hp }),

  addLog: (message) =>
    set((state) => ({
      battleLog: [...state.battleLog, message],
    })),

  setWinner: (winner) => set({ winner }),
}));

export default useBattleStore;