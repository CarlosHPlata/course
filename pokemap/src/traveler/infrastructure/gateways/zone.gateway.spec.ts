import { Point } from "../../domain/useCases/portsResponses/input.dtos";
import { zoneGateway } from "./zone.gateway";

describe('When using the gateway', () => {

  const country: Point = {
    lat: 40.714224,
    long: -73.961452
  }
  
  it('should bring a country from', async () => {
    const res = await zoneGateway.getZoneByPosition(country);
    expect(res).toBeDefined()
  });
});