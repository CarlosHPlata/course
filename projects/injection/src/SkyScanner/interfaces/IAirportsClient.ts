import { Airport } from "../model/Airport";

export interface IAirportsClient {
    getAirportById: (id: string) => Airport | null

}