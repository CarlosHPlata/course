import { makePokemonDto } from "./pokemon.mock";

export const isEncounterPossibleMock = jest.fn(() => true);
export const generateEncounterMock = jest.fn(() => makePokemonDto("pikachu"));

export const zoneMock = jest.fn().mockImplementation(() => ({
  isEncounterPossible: isEncounterPossibleMock,
  generateEncounter: generateEncounterMock,
  name: "test",
}));
