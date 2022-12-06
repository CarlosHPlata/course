import { zoneGatewayMock } from "@test/traveler/mocks/zone.gateway.mock";
import TravelerUsecase from "./traveler.usecase";
import * as Utils from '../utils/math.utils'
import { pokemonGatewayMock, pokemonMock } from "@test/traveler/mocks/pokemon.gateway.mock";


describe("When using the traveler use case", () => {

  let usecase: TravelerUsecase
  beforeEach(() => {
    usecase = new TravelerUsecase(zoneGatewayMock, pokemonGatewayMock);
  });

  describe("when traveling to a new position", () => {

    let randomHit = 1
    beforeEach(() => {
      jest.spyOn(Utils, 'getRandomInt').mockImplementation(() => randomHit)
    });

    it("should get a Zone based in the point", async () => {
      const { zone } = await usecase.travelTo({ long: 1, lat: 1 });

      expect(zone.name).toBe("test");
    });

    it('should get an encounter when is possible', async () => {
      const pikachu = pokemonMock

      const { encounterOcurred, encounter } = await usecase.travelTo({ long: 1, lat: 1 });

      expect(encounterOcurred).toBeTruthy()
      expect(encounter).toBe(pikachu)
    });

    it('should not get an encounter when is not possible', async () => {
      randomHit = 80
      
      const { encounterOcurred, encounter } = await usecase.travelTo({ long: 1, lat: 1 });

      expect(encounterOcurred).toBeFalsy()
      expect(encounter).toBeUndefined()
    });
  });
});
