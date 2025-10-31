import { RoutesProvider } from "./interfaces/routesProvider";
import { Wired } from "./library/Wired";
import { Airport } from "./model/Airport";

// @Wired('RoutesProvider')
export class RoutesMock implements RoutesProvider {
  getAirportById(id: string): Airport | null {
    throw new Error("Method not implemented.");
  }

}