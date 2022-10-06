import { pokemonMock } from "@test/pokemon/mocks/pokemon.mock";
import { pokemonGateway } from "./pokemonGateway";

const POKEMON_ID = pokemonMock.id;
const POKEMON_NAME = pokemonMock.name;

describe("when using the pokemon gateway", () => {
  it("should return a pokemon by id from the poke api", async () => {
    const res = await pokemonGateway.getPokemonById(POKEMON_ID);

    expect(res.name).toBe(POKEMON_NAME);
  });

  it("should return a pokemon by name from the poke api", async () => {
    const res = await pokemonGateway.getPokemonByName(POKEMON_NAME);

    expect(res.id).toBe(POKEMON_ID);
  });

  it("should thrown a not found exception when pokemon not exists", async () => {
    expect.assertions(1);

    try {
      await pokemonGateway.getPokemonByName("this_pokemon_does_not_exists");
    } catch (e) {
      expect(e).toEqual(new Error("pokemon not found"));
    }
  });
});
