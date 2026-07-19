import { useQuery } from "@tanstack/react-query";
import { getPokemonDetails } from "../services/pokemonApi";

export function usePokemon(id) {
  return useQuery({
    queryKey: ["pokemon", id],
    queryFn: () => getPokemonDetails(id),
    enabled: !!id,
  });
}