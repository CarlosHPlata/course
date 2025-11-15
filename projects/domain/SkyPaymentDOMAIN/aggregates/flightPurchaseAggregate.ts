import { SeatClass } from "../entities/SeatClass"

export type flightPurchaseAggregate = {
  flights: {
    orderOfFlight: number,
    flightNumber: string,
    seatClass: SeatClass
  }[],
  userId: string,
  paymentToken: string,
}