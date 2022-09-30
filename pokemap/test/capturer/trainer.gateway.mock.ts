import { GarchompMock } from "@test/pokemon/mocks/pokemon.mock";

export const trainerGatewayMock = {
  sendPokemonToTrainerPc: jest.fn(() => Promise.resolve(GarchompMock)),
};
