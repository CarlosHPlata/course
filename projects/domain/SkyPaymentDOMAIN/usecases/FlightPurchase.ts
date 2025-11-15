import { flightPurchaseAggregate } from "../aggregates/flightPurchaseAggregate";
import { Flight } from "../entities/Flight";
import { Tariff } from "../entities/Tariff";
import { User } from "../entities/User";
import IFlightRepository from "../interfaces/IFlightRepository";
import { ITariffGateway } from "../interfaces/ITariffGateway";
import IUserRepository from "../interfaces/IUserRepository";

export class FlightPurchase {
  private userRepository: IUserRepository
  private flightRepository: IFlightRepository
  private tariffGateway: ITariffGateway

  private static FLIGHT_MULTIPLIER: number = 0.1;

  constructor(userRepository: IUserRepository, flightRepository: IFlightRepository, tariffGateway: ITariffGateway) {
    this.userRepository = userRepository
    this.flightRepository = flightRepository
    this.tariffGateway = tariffGateway
  }

  async purchase(flightPurchase: flightPurchaseAggregate) {
    const user: User = await this.userRepository.getUserById(flightPurchase.userId)
    const tariff: Tariff = await this.tariffGateway.getTariff();
    let finalPrice: number = 0;

    for (let flightInfo of flightPurchase.flights) {
      let flight: Flight = await this.flightRepository.getFlightById(flightInfo.flightNumber)
      let tariffPrice = tariff[flightInfo.seatClass]
      finalPrice += flight.getPrice(tariffPrice, flightInfo.orderOfFlight, FlightPurchase.FLIGHT_MULTIPLIER)
    }

    return { finalPrice };
  }

}