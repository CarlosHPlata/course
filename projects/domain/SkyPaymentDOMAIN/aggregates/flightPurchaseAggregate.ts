import { SeatClass } from "../entities/SeatClass"

export type FLightPurchase = {
  flights: [{
    orderOfFlight: number,
    flightNumber: string,
    seatClass: SeatClass
  }],
  userId: string,
  paymentToken: string,
}