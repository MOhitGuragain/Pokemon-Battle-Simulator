import { useQuery } from "@tanstack/react-query";
import { getPokemonList } from "../services/pokemonApi";

export function usePokemonList() {
  return useQuery({
    queryKey: ["pokemon"],
    queryFn: () => getPokemonList(),
  });
}