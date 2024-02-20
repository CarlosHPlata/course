import { RequestData } from '@http/Request'
import { FlightData } from '../model/session/FlightData'

export type IFlightRepository = (requestData: RequestData) => Promise<FlightData[]>
