import { IPokemonGateway } from '../../domain/interfaces/ipokemon.gateway';
import { pokemonMock } from "./pokemon.mock";

export const pokemonGatewayMock: IPokemonGateway = {
  getPokemonById: jest.fn(() => Promise.resolve(pokemonMock)),
  getPokemonByName: jest.fn(() => Promise.resolve(pokemonMock)),
}