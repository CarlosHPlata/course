import { IPokemonGateway } from "../../../src/pokemon/interfaces/pokemonGateway";
import { pokemonMock } from "./pokemon.mock";

export const pokemonGatewayMock: IPokemonGateway = {
  getPokemonById: jest.fn(() => Promise.resolve(pokemonMock)),
  getPokemonByName: jest.fn(() => Promise.resolve(pokemonMock)),
};
