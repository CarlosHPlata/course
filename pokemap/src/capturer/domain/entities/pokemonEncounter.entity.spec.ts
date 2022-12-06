import { GarchompMock } from "@test/pokemon/mocks/pokemon.mock";
import PokemonEncounter from "./pokemonEncounter.entity";

describe("When trying to capture a pokemon", () => {
  it("should be possible to capture it when probability hits", () => {
    const pokemon = new PokemonEncounter(GarchompMock);

    expect(pokemon.canCaptureIt(PokemonEncounter.CAPTURE_PROBABILITY - 1)).toBeTruthy()
  });
});
