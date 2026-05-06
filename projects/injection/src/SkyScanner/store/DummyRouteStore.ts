import { IAirportsClient } from "../interfaces/IAirportsClient";
import { Airport } from "../model/Airport";

export class DummyRoutesStore implements IAirportsClient {
    getAirportById(id: string): Airport | null {
        // cualquir cosa hace, se conecta a excel y trael el aeropuerto
        return null // <esto esta por que si
    }

}