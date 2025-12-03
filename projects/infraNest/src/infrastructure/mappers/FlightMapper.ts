import { Flight } from "src/domain/entities/Flight";
import { FlightAggregate } from "../dbentities/FlightAggregate";

export class FlightMapper {
  static toDomain(aggregate: FlightAggregate) {
    return new Flight(aggregate.flightNumber, aggregate.baseprice)
  }
}