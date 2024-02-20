import { RequestData } from '@http/Request'
import { IFlightRepository } from '../../interfaces/IFlightsRepository'
import { Builder } from 'builder-pattern'
import { Session } from '../../model/session'
import { SessionData } from '../../model/session/SessionData'
import { UserInformation } from '../../model/session/UserInformation'
import * as Crypto from 'crypto'

export const makeMapRequestToSession = (repository: IFlightRepository) => async (requestData: RequestData): Promise<Session> => {
  const data = await mapSessionData(repository)(requestData)
  const userInformation = await mapUserInformation(requestData)

  return Builder<Session>()
    .sessionId(Crypto.randomUUID())
    .userId(requestData.userId)
    .data(data)
    .userInformation(userInformation)
    .build()
}

const mapSessionData = (repository: IFlightRepository) => async (requestData: RequestData): Promise<SessionData> => {
  const flights = await repository(requestData)

  return Builder<SessionData>()
    .flights(flights)
    .build()
}

const mapUserInformation = async (requestData: RequestData): Promise<UserInformation> => {
  return Builder<UserInformation>()
    .passportNo((requestData.fields?.passport_number as string))
    .build()
}
