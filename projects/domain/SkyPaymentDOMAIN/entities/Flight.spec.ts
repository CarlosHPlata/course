import { Flight } from "./Flight"

describe('flight test', () => {
  it('calculate flight', () => {
    const flight = new Flight('123', 100);

    const seatTarif = 1
    const order = 1
    const multiplier = 0
    const price = flight.getPrice(seatTarif, order, multiplier)
    expect(price).toBe(101)
  })
})