import { IPokemonBaseData, IPokemonMovesGen, IPokemonStatsGen } from "./domain/interfaces/ipokemonbase.gateway";
import makeCreatePokemon, { CreatePokemonInjections } from "./domain/usecases/createPokemon";
import makeGetPokemon from "./domain/usecases/getPokemon.usecase";
import { FindOptions } from "./domain/usecases/input.dtos";
import { pokemonGateway } from "./infrastructure/pokemon.gateway";

export type Injections = {
  getBaseData: IPokemonBaseData
  getPokemonMoves: IPokemonMovesGen
  getPokemonStats: IPokemonStatsGen
};

export const getPokemonData = (findOptions: FindOptions) => {
  const gateway = pokemonGateway;
  const getPokemonDataFn = makeGetPokemon(gateway);

  return getPokemonDataFn(findOptions);
};

export const createPokemon = (findOptions: FindOptions, injections: Injections) => {
  const gateway = pokemonGateway;

  const inj: CreatePokemonInjections = {
    pokemonGateway: gateway,
    ... injections
  };
  
  const createPokemonFn = makeCreatePokemon(inj);

  return createPokemonFn(findOptions);
}

export * from "./domain/usecases/input.dtos";
export * from "./domain/dtos";
export * from "./domain/interfaces"; 
export * from "./test/mocks"