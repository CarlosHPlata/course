import { Injectable } from "@nestjs/common";
import { Flight } from "src/domain/entities/Flight";
import IFlightRepository from "src/domain/interfaces/IFlightRepository";
import { FlightAggregate } from "../dbentities/FlightAggregate";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { FlightMapper } from "../mappers/FlightMapper";

@Injectable()
export class FlightRepository implements IFlightRepository {
  constructor(
    @InjectRepository(FlightAggregate)
    private readonly flightRepository: Repository<FlightAggregate>,
  ) { }

  async getFlightById(flightId: string): Promise<Flight> {
    const flightAggregate = await this.flightRepository.findOne({
      where: { flightNumber: flightId },
    });

    if (!flightAggregate) {
      throw new Error(`Flight with id ${flightId} not found`);
    }

    return FlightMapper.toDomain(flightAggregate);
  }
}