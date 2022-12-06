import { pokemonGatewayMock } from "../../test/mocks/pokemon.gateway";
import { pokemonMock } from "../../test/mocks/pokemon.mock";
import { Gender, Pokemon, PokemonMoves } from "../dtos";
import makeCreatePokemon, { CreatePokemonInjections } from "./createPokemon";

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

const injections: CreatePokemonInjections = {
  pokemonGateway: pokemonGatewayMock,
  getBaseData: jest.fn(() => Promise.resolve(baseInfo)),
  getPokemonMoves: jest.fn(() => Promise.resolve(moves)),
  getPokemonStats: jest.fn(() => Promise.resolve(pokemonMock.stats)),
};

describe("When creating a pokemon dto", () => {
  const createPokemon = makeCreatePokemon(injections);
  const id = pokemonMock.id;

  it("should return the basic data from a pokemon", async () => {
    const pokemon: Pokemon = await createPokemon({ id });

    expect(pokemon.id).toBe(pokemonMock.id);
    expect(pokemon.name).toBe(pokemonMock.name);
    expect(pokemon.pokedexNumber).toBe(pokemonMock.pokedexNumber);
    expect(pokemon.weight).toBe(pokemonMock.weight);
    expect(pokemon.height).toBe(pokemonMock.height);
    expect(pokemon.types).toBe(pokemonMock.types);
  });

  it("should return the base information from a pokemon", async () => {
    const pokemon: Pokemon = await createPokemon({ id });

    expect(injections.getBaseData).toHaveBeenCalled()
    expect(pokemon.customName).toBe(baseInfo.customName);
    expect(pokemon.gender).toBe(baseInfo.gender);
    expect(pokemon.isShiny).toBe(baseInfo.isShiny);
  });

  describe('At obtaining the sprite', () => {
    it('should return a normal sprite when pokemon is male', async () => {
      baseInfo.gender = Gender.MALE;
      baseInfo.isShiny = false;

      const pokemon: Pokemon = await createPokemon({ id });
      expect(pokemon.sprite).toBe(pokemonMock.sprites.normal);
    });

    it('should return a female sprite when pokemon is female', async () => {
      baseInfo.gender = Gender.FEMALE;
      baseInfo.isShiny = false;
      
      const pokemon: Pokemon = await createPokemon({ id });
      expect(pokemon.sprite).toBe(pokemonMock.sprites.female);
    });

    it('should return a shiny sprite when pokemon is shiny', async () => {
      baseInfo.gender = Gender.MALE;
      baseInfo.isShiny = true;

      const pokemon: Pokemon = await createPokemon({ id });
      expect(pokemon.sprite).toBe(pokemonMock.sprites.shiny);
    });
  });

  it("should build the moves from the pokemon", async () => {
    const pokemon: Pokemon = await createPokemon({ id });

    expect(injections.getPokemonMoves).toHaveBeenCalled();
    expect(pokemon.moves).toBe(moves);
  });

  it('should build the stats from the pokemon', async () => {
    const pokemon: Pokemon = await createPokemon({ id });

    expect(injections.getPokemonStats).toHaveBeenCalled();
    expect(pokemon.stats).toBe(pokemonMock.stats);
  });
});
