import { Application } from 'express'
import request, { Response } from 'supertest'
import { RequestData } from '../../../src/http/model/Request'
import { UUID } from 'crypto'
import generateRequestDataMock from '../../mocks/model/RequestData.mock'

const initSession = async (app: Application, data?: Partial<RequestData>): Promise<UUID> => {
  const requestData = generateRequestDataMock({ sessionId: undefined, ...data })
  const initResponse = await request(app).post('/init').send(requestData)
  const { sessionId } = initResponse.body

  expect(initResponse.body.sessionId).toBeDefined()
  expect(initResponse.headers['content-type']).toEqual(expect.stringContaining('json'))

  return sessionId
}

const initSessionWithPassport = (app: Application): Promise<UUID> => initSession(app, { fields: { passport_number: 'G123' } })

const continueRequest = async (app: Application, sessionId: UUID, data?: Partial<RequestData>): Promise<Response> => {
  const continueRequest = generateRequestDataMock({ sessionId, ...data })
  return await request(app).post('/continue').send(continueRequest)
}

const fillPassport = (app: Application, sessionId: UUID, data?: Partial<RequestData>): Promise<Response> => continueRequest(
  app,
  sessionId,
  { fields: { passport_number: 'G123' }, ...data }
)

const signLegalAgreement = (app: Application, sessionId: UUID, data?: Partial<RequestData>): Promise<Response> => continueRequest(
  app,
  sessionId,
  { fields: { agreement_required: true }, ...data }
)

export default {
  initSession,
  initSessionWithPassport,
  continue: continueRequest,
  fillPassport,
  signLegalAgreement
}
