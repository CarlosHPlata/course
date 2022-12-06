import { trainerGatewayMock } from "@test/capturer/trainer.gateway.mock";
import { GarchompMock } from "@test/pokemon/mocks/pokemon.mock";
import PokemonEncounter from "../entities/pokemonEncounter.entity";
import * as UseCase from "./capturer.usecase";

describe("When a capturer tries to capture a pokemon", () => {
  it("should capture a pokemon", async () => {
    const capturedRes = await capture(trainer, GarchompMock);

    expect(capturedRes.captured).toBeTruthy();
  });

  it("if captured it should to save the pokemon into trainer pc", async () => {
    await capture(trainer, GarchompMock);

    expect(trainerGatewayMock.sendPokemonToTrainerPc).toHaveBeenCalledWith(trainer, GarchompMock);
  });

  it('should not save pokemon if pokemon is not captured', async () => {
    hitGen.mockImplementationOnce(() => 0);
    const captured = await capture(trainer, GarchompMock);

    expect(captured.captured).toBeFalsy();
    expect(trainerGatewayMock.sendPokemonToTrainerPc).not.toHaveBeenCalled();
  });

  const trainer = 1;
  let capture = UseCase.makeCapture(trainerGatewayMock);
  const hitGen = jest.spyOn(UseCase, "getHit");
  beforeEach(() => {
    hitGen.mockImplementation(() => PokemonEncounter.CAPTURE_PROBABILITY - 1);
    trainerGatewayMock.sendPokemonToTrainerPc.mockClear();
  });
});
