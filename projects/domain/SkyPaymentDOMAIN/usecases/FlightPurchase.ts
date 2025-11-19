import { flightPurchaseAggregate } from "../aggregates/flightPurchaseAggregate";
import { Tariff } from "../aggregates/Tariff";
import { Flight } from "../entities/Flight";
import { User } from "../entities/User";
import IFlightRepository from "../interfaces/IFlightRepository";
import { ITariffGateway } from "../interfaces/ITariffGateway";
import IUserRepository from "../interfaces/IUserRepository";
import { PaymentFactory } from "./PaymentFactory";

export class FlightPurchase {
  private userRepository: IUserRepository
  private flightRepository: IFlightRepository
  private tariffGateway: ITariffGateway
  private factoryMethod: PaymentFactory

  private static FLIGHT_MULTIPLIER: number = 0.1;

  constructor(
    userRepository: IUserRepository,
    flightRepository: IFlightRepository,
    tariffGateway: ITariffGateway,
    factoryMethod: PaymentFactory
  ) {
    this.userRepository = userRepository
    this.flightRepository = flightRepository
    this.tariffGateway = tariffGateway
    this.factoryMethod = factoryMethod
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

    const paymentInstance = this.factoryMethod.paymentBuilder(flightPurchase.paymentToken);
    if (!paymentInstance) {
      throw new Error('INVALID');

    }

    const signedToken = await paymentInstance.pay(finalPrice, user.userId, user.email, flightPurchase.paymentToken);
    const parts = signedToken.split('_');
    if (parts[parts.length - 1] !== 'TSP') {
      throw new Error('INVALID');
    }

    return { finalPrice, status: 'APPROVED' };
  }
}