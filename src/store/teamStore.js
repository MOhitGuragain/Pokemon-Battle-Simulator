import { create } from "zustand";

const MAX_TEAM_SIZE = 6;

const useTeamStore = create((set) => ({
  team: [],

  addPokemon: (pokemon) =>
    set((state) => {
      const alreadyExists = state.team.some(
        (p) => p.id === pokemon.id
      );

      if (alreadyExists || state.team.length >= MAX_TEAM_SIZE) {
        return state;
      }

      return {
        team: [...state.team, pokemon],
      };
    }),

  removePokemon: (id) =>
    set((state) => ({
      team: state.team.filter((pokemon) => pokemon.id !== id),
    })),

  clearTeam: () =>
    set({
      team: [],
    }),
}));

export default useTeamStore;