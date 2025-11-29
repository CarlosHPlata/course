export class Flight {
  private flightNumber: string;
  private basePrice: number;

  constructor(flightNumber: string, basePrice: number) {
    this.basePrice = basePrice;
    this.flightNumber = flightNumber;
  }

  getPrice(seatTarif: number, order: number, multiplier: number) {
    return this.basePrice + seatTarif - (this.basePrice * multiplier * order)
  }
}