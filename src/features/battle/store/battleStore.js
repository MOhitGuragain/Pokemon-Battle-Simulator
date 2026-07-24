import { create } from "zustand";

const useBattleStore = create((set) => ({
  // Active Pokémon
  player: null,
  enemy: null,

  // Full Teams
  playerTeam: [],
  enemyTeam: [],

  // Active Pokémon Index
  activePlayerIndex: 0,
  activeEnemyIndex: 0,

  // Current HP
  playerHP: 0,
  enemyHP: 0,

  // Turn
  turn: null,

  // Winner
  winner: null,

  // Force player to switch after fainting
mustSwitchPlayer: false,

  // Battle Log
  battleLog: [],

  // Attack Animation
playerAttacking: false,
enemyAttacking: false,

playerDamaged: false,
enemyDamaged: false,

playerFainted: false,
enemyFainted: false,

playerEntering: false,
enemyEntering: false,

  initializeBattle(playerTeam, enemyTeam) {
    const initializedPlayerTeam = playerTeam.map((pokemon) => ({
  ...pokemon,
  currentHP: pokemon.stats.hp,
}));

const initializedEnemyTeam = enemyTeam.map((pokemon) => ({
  ...pokemon,
  currentHP: pokemon.stats.hp,
}));

const player = initializedPlayerTeam[0];
const enemy = initializedEnemyTeam[0];

    const firstTurn =
      player.stats.speed >= enemy.stats.speed
        ? "player"
        : "enemy";

    set({
      // Active Pokémon
      player,
      enemy,

      // Teams
      playerTeam: initializedPlayerTeam,
enemyTeam: initializedEnemyTeam,

      // Active Pokémon Index
      activePlayerIndex: 0,
      activeEnemyIndex: 0,

      // HP
      playerHP: player.currentHP,
enemyHP: enemy.currentHP,
      

      // Battle State
      turn: firstTurn,
      winner: null,
      mustSwitchPlayer: false,

      
playerAttacking: false,
enemyAttacking: false,

playerDamaged: false,
enemyDamaged: false,

playerFainted: false,
enemyFainted: false,

playerEntering: false,
enemyEntering: false,


      // Battle Log
      battleLog: [
        `⚔️ ${player.name} entered the battle!`,
        `👾 ${enemy.name} appeared!`,
        `${
          firstTurn === "player"
            ? `⚡ ${player.name}`
            : `⚡ ${enemy.name}`
        } moves first!`,
      ],
    });
  },

  damagePlayer(amount) {
  set((state) => {
    const newHP = Math.max(0, state.playerHP - amount);

    const updatedPlayerTeam = [...state.playerTeam];

    updatedPlayerTeam[state.activePlayerIndex] = {
      ...updatedPlayerTeam[state.activePlayerIndex],
      currentHP: newHP,
    };

    return {
      playerHP: newHP,
      player: updatedPlayerTeam[state.activePlayerIndex],
      playerTeam: updatedPlayerTeam,
    };
  });
},

damageEnemy(amount) {
  set((state) => {
    const newHP = Math.max(0, state.enemyHP - amount);

    const updatedEnemyTeam = [...state.enemyTeam];

    updatedEnemyTeam[state.activeEnemyIndex] = {
      ...updatedEnemyTeam[state.activeEnemyIndex],
      currentHP: newHP,
    };

    return {
      enemyHP: newHP,
      enemy: updatedEnemyTeam[state.activeEnemyIndex],
      enemyTeam: updatedEnemyTeam,
    };
  });
},

  setTurn(turn) {
    set({ turn });
  },

  setWinner(name) {
    set({ winner: name });
  },

  setMustSwitchPlayer(value) {
  set({ mustSwitchPlayer: value });
},

  setPlayerAttacking(value) {
  set({ playerAttacking: value });
},

setEnemyAttacking(value) {
  set({ enemyAttacking: value });
},

setPlayerDamaged(value) {
  set({ playerDamaged: value });
},

setEnemyDamaged(value) {
  set({ enemyDamaged: value });
},
setPlayerFainted(value) {
  set({ playerFainted: value });
},

setEnemyFainted(value) {
  set({ enemyFainted: value });
},

setPlayerEntering(value) {
  set({ playerEntering: value });
},

setEnemyEntering(value) {
  set({ enemyEntering: value });
},
  addLog(message) {
    set((state) => ({
      battleLog: [...state.battleLog, message],
    }));
  },

  // ---------- NEW FUNCTIONS ----------

 switchPlayer(index) {
  set((state) => {
    const pokemon = state.playerTeam[index];

    return {
      player: pokemon,
      activePlayerIndex: index,

      // For now, restore full HP when switched in.
      // Later we'll preserve HP for each Pokémon.
      playerHP: pokemon.currentHP,

      battleLog: [
        ...state.battleLog,
        `🔄 Go! ${pokemon.name}!`,
      ],
    };
  });
},

  switchEnemy(index) {
    set((state) => {
      const pokemon = state.enemyTeam[index];

      return {
        enemy: pokemon,
        activeEnemyIndex: index,
        enemyHP: pokemon.currentHP,
      };
    });
  },

  resetBattle() {
    set({
      player: null,
      enemy: null,

      playerTeam: [],
      enemyTeam: [],

      activePlayerIndex: 0,
      activeEnemyIndex: 0,

      playerHP: 0,
      enemyHP: 0,

      turn: null,

      winner: null,

      mustSwitchPlayer: false,

      playerAttacking: false,
enemyAttacking: false,
    
     playerDamaged: false,
enemyDamaged: false,

playerFainted: false,
enemyFainted: false,

playerEntering: false,
enemyEntering: false,

      battleLog: [],
    });
  },
}));

export default useBattleStore;