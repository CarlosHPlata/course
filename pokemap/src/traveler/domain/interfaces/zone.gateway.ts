import { Point, ZoneDto } from "../useCases/portsResponses/input.dtos";

export default interface IZoneGateway {
  getZoneByPosition(position: Point): Promise<ZoneDto>;
}
