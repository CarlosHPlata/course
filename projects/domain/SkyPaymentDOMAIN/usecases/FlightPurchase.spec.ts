import { flightPurchaseAggregate } from "../aggregates/flightPurchaseAggregate"
import { Flight } from "../entities/Flight"
import { SeatClass } from "../entities/SeatClass"
import IFlightRepository from "../interfaces/IFlightRepository"
import { ITariffGateway } from "../interfaces/ITariffGateway"
import IUserRepository from "../interfaces/IUserRepository"
import { FlightPurchase } from "./FlightPurchase"

describe('flight purchase use case', () => {
  let mockUserRepository: jest.Mocked<IUserRepository>
  let mockFlightRepository: jest.Mocked<IFlightRepository>
  let mockTariffGateway: jest.Mocked<ITariffGateway>
  let useCase: FlightPurchase

  beforeEach(() => {
    mockUserRepository = {
      getUserById: jest.fn((userId: string) => Promise.resolve({
        userId,
        name: 'charly ruzz',
        email: 'carly.xcx.ruzz@gmail.com'
      }))
    }
    mockFlightRepository = {
      getFlightById: jest.fn((flightNumber: string) => {
        return Promise.resolve(new Flight(flightNumber, 100))
      })
    }
    mockTariffGateway = {
      getTariff: jest.fn(() => Promise.resolve({
        basic: 1,
        business: 1,
        first: 1
      }))
    }
    useCase = new FlightPurchase(
      mockUserRepository,
      mockFlightRepository,
      mockTariffGateway
    )
  })

  it('can invoke method', () => {
    const spy = jest.spyOn(useCase, 'purchase')
    const info: flightPurchaseAggregate = mockFlightPurchase()
    useCase.purchase(info);

    expect(spy).toHaveBeenCalled()
  })

  it('ask for user infomation', async () => {
    const info = mockFlightPurchase()
    await useCase.purchase(info)

    expect(mockUserRepository.getUserById).toHaveBeenCalledWith(info.userId);
  })

  it('ask for flight information', async () => {
    const info = mockFlightPurchase([SeatClass.BASIC, SeatClass.BASIC])

    await useCase.purchase(info)
    expect(mockFlightRepository.getFlightById).toHaveBeenCalledTimes(2)
  })

  it('ask for seat tariffs', async () => {
    const info = mockFlightPurchase()

    await useCase.purchase(info)
    expect(mockTariffGateway.getTariff).toHaveBeenCalled()
  })

  it('sums all prices', async () => {
    const info = mockFlightPurchase()

    const result = await useCase.purchase(info)
    expect(result.finalPrice).toBe(91)
  })
})

function mockFlightPurchase(seatClasses: SeatClass[] = [SeatClass.BASIC]): flightPurchaseAggregate {
  const flights = seatClasses.map((seatClass, index) => ({
    orderOfFlight: index + 1,
    flightNumber: `FL${100 + index}`,
    seatClass: seatClass
  }))

  return {
    flights: flights,
    userId: "12345",
    paymentToken: "BANK_12345abcde"
  }
} 