import { Application } from 'express'
import request, { Response } from 'supertest'
import { RequestData } from '../../../src/http/model/Request'
import { UUID } from 'crypto'
import generateRequestDataMock from '../../mocks/model/RequestData.mock'
import { CountryCode } from '../../../src/checkin/model/Schema'

interface RequiredData { sessionId: UUID, country: CountryCode }

const initSession = async (app: Application, country: CountryCode, data?: Partial<RequestData>): Promise<UUID> => {
  const requestData = generateRequestDataMock({ country, sessionId: (null) as unknown as UUID, ...data })
  const initResponse = await request(app).post('/init').send(requestData)
  const { sessionId } = initResponse.body

  expect(initResponse.body.sessionId).toBeDefined()
  expect(initResponse.headers['content-type']).toEqual(expect.stringContaining('json'))

  return sessionId
}

const initSessionWithPassport = (app: Application, country: CountryCode): Promise<UUID> => initSession(app, country, { fields: { passport_number: 'G123' } })

const continueRequest = async (app: Application, requiredData: RequiredData, data?: Partial<RequestData>): Promise<Response> => {
  const { sessionId, country } = requiredData

  const continueRequest = generateRequestDataMock({ sessionId, country, ...data })
  return await request(app).post('/continue').send(continueRequest)
}

const fillPassport = (app: Application, requiredData: RequiredData, data?: Partial<RequestData>): Promise<Response> => continueRequest(
  app,
  requiredData,
  { fields: { passport_number: 'G123' }, ...data }
)

const signLegalAgreement = (app: Application, requiredData: RequiredData, data?: Partial<RequestData>): Promise<Response> => continueRequest(
  app,
  requiredData,
  { fields: { agreement_required: true }, ...data }
)

export default {
  initSession,
  initSessionWithPassport,
  continue: continueRequest,
  fillPassport,
  signLegalAgreement
}
