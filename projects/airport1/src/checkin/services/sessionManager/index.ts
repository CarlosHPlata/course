import { getSessionRepository, saveSessionRepository } from '@external/SessionRepository'
import { makeSaveSession } from './saveSession'
import { makeGetSession } from './getSession'
import { flightsRepository } from '@external/FlightsRepository'
import { makeMapRequestToSession } from './mapRequestToSession'

const sessionManager = {
  saveSession: makeSaveSession(saveSessionRepository),
  getSession: makeGetSession(getSessionRepository),
  mapInitRequestToSession: makeMapRequestToSession(flightsRepository)
}

export type SessionManager = typeof sessionManager

export default sessionManager
