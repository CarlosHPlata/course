import { FlightData } from '../../checkin/model/session/FlightData'
import { RequestData } from '../../http/model/Request'

export const flightsRepository = async (requestData: RequestData): Promise<FlightData[]> => {
  const BASE_URL: string | undefined = process.env.AVIATOR_MICROSERVICE_URL

  if (!BASE_URL) {
    throw new Error('Not Connected')
  }

  const URL = BASE_URL + '/flights?'
  const URL_AND_PARAMS = URL + new URLSearchParams({
    q: requestData.flightNumbers.join(',')
  }).toString()

  const data = await fetch(URL_AND_PARAMS)
  const response = await data.json()

  return response as FlightData[]
}
