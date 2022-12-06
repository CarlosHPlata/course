import { Move, PokemonMoves, PokemonStats } from "../dtos";
import { PokemonBaseData } from "../usecases/input.dtos";

export type IPokemonBaseData = (data:{id: number, name: string}) => Promise<PokemonBaseData>;
export type IPokemonMovesGen = (allMoves: Move[]) =>  Promise<PokemonMoves>;
export type IPokemonStatsGen = (statsData: PokemonStats) => Promise<PokemonStats>;