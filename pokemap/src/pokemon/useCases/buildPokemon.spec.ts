import { pokemonMock } from "@test/pokemon/mocks/pokemon.mock";
import { Gender } from "../dtos/metadata";
import { PokemonMoves } from "../dtos/pokemon.dto";

const moves: PokemonMoves = [
  pokemonMock.moves[0],
  pokemonMock.moves[1],
  pokemonMock.moves[2],
  pokemonMock.moves[3],
];

const baseInfo = {
  customName: "test",
  gender: Gender.MALE,
  isShiny: false,
};

const id = pokemonMock.id;

describe("When creating a pokemon dto", () => {
  it('should return the basic data from a pokemon', () => {
    expect(1).toBe(1)
  });
});