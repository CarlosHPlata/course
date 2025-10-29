import { Airport } from "../model/Airport";

export interface RoutesProvider {
  getAirportById(id: string): Airport | null
}