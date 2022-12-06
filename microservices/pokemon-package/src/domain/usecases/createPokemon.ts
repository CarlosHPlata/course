import { Gender, Pokemon, PokemonData, Sprites } from "../dtos";
import { IPokemonGateway } from "../interfaces/ipokemon.gateway";
import { IPokemonBaseData, IPokemonMovesGen, IPokemonStatsGen } from "../interfaces/ipokemonbase.gateway";
import makeGetPokemon from "./getPokemon.usecase";
import { FindOptions, PokemonBaseData } from "./input.dtos";

export type CreatePokemon = () => PokemonData;
export type CreatePokemonInjections = {
  pokemonGateway: IPokemonGateway
  getBaseData: IPokemonBaseData
  getPokemonMoves: IPokemonMovesGen 
  getPokemonStats: IPokemonStatsGen
};

const makeCreatePokemon =
  (injections: CreatePokemonInjections) =>
  async (opts: FindOptions) => {
    const getPokemonDataFn = makeGetPokemon(injections.pokemonGateway);
    const data: PokemonData = await getPokemonDataFn(opts);
    return await mapPokemonFromData(data, injections);
  };

const mapPokemonFromData = async (data:PokemonData, injections: CreatePokemonInjections): Promise<Pokemon> => {
  const baseData:PokemonBaseData = await injections.getBaseData({ id: data.id, name: data.name });
  return {
    id: data.id,
    pokedexNumber: data.pokedexNumber,
    name: data.name,
    weight: data.weight,
    height: data.height,
    types: data.types,
    customName: baseData.customName,
    gender: baseData.gender,
    isShiny: baseData.isShiny,
    moves: await injections.getPokemonMoves(data.moves),
    sprite: getSprite(data.sprites, baseData),
    stats: await injections.getPokemonStats(data.stats),
  }
};

const getSprite = (sprites: Sprites, base: PokemonBaseData): string => {
  if (base.gender === Gender.FEMALE && sprites.female != null && sprites.femaleShiny != null) {
    return base.isShiny? sprites.femaleShiny : sprites.female
  }

  return base.isShiny? sprites.shiny : sprites.normal
}

export default makeCreatePokemon;
