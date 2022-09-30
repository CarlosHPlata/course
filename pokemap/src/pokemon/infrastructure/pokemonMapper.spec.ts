import { pokemonMock } from "@test/pokemon/mocks/pokemon.mock";
import { pokemonGateway } from "./pokemonGateway";

const POKEMON_ID = pokemonMock.id;

describe("At mapping a pokemon from the poke api", () => {
  it("should map the base data from the pokemon", async () => {
    const res = await pokemonGateway.getPokemonById(POKEMON_ID);

    expect(res.name).toBe(pokemonMock.name);
    expect(res.id).toBe(pokemonMock.id);
    expect(res.weight).toBe(pokemonMock.weight);
    expect(res.height).toBe(pokemonMock.height);
    expect(res.pokedexNumber).toBe(pokemonMock.pokedexNumber);
  });

  it("should map the stats from the pokemon", async () => {
    const { stats } = await pokemonGateway.getPokemonById(POKEMON_ID);
    const { stats: expectedStats } = pokemonMock;

    expect(stats.hp).toEqual(expectedStats.hp);
    expect(stats.attack).toEqual(expectedStats.attack);
    expect(stats.defense).toEqual(expectedStats.defense);
    expect(stats.speed).toEqual(expectedStats.speed);
    expect(stats.specialAttack).toEqual(expectedStats.specialAttack);
    expect(stats.specialDefense).toEqual(expectedStats.specialDefense);
  });

  it("should map the sprites from the pokemon", async () => {
    const { sprites } = await pokemonGateway.getPokemonById(POKEMON_ID);
    const { sprites: expectedSprites } = pokemonMock;

    expect(sprites).toEqual(expectedSprites);
  });

  it("shold map the types of the pokemon", async () => {
    const { types } = await pokemonGateway.getPokemonById(POKEMON_ID);

    expect(types).toEqual(pokemonMock.types);
  });

  it("should map the moves from the pokemon", async () => {
    const { moves } = await pokemonGateway.getPokemonById(POKEMON_ID);

    expect(moves.length).toEqual(pokemonMock.moves.length);
    expect(moves[0]).toEqual(pokemonMock.moves[0]);
    expect(moves[Math.floor(moves.length / 2)]).toEqual(
      pokemonMock.moves[Math.floor(moves.length / 2)]
    );
    expect(moves[moves.length - 1]).toEqual(
      pokemonMock.moves[moves.length - 1]
    );
  });
});
