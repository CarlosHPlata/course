import { Gender, Move, PokemonMetaData } from "./metadata";

export type Pokemon = PokemonMetaData & {
  pcId?: number;
  customName?: string;
  gender: Gender;
  isShiny: boolean;
  moves: PokemonMoves;
  sprite: string;
}

export type PokemonMoves = [ 
  PokemonMove,
  PokemonMove,
  PokemonMove,
  PokemonMove 
]
export type PokemonMove = Move | null

