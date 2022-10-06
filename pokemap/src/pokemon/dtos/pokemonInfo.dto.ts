import { Move, PokemonMetaData } from "./metadata";

export type PokemonData = PokemonMetaData & {
  moves: Move[];
  sprites: Sprites;
};

export type Sprites = {
  normal: string;
  female: string | null;
  shiny: string;
  femaleShiny: string | null;
};
