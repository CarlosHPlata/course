
export class Flight {
    constructor(
        private flightNumber: number,
        private basePrice: number
    ) { }

    public calculateFinalPrice(classTarif: number, flightOrder: number) {
        return this.basePrice + classTarif - (this.basePrice * 0.1 * flightOrder)
    }
}