import { Builder } from 'builder-pattern'
import { RequestData } from '@http/Request'
import { UUID } from 'crypto'

const MOCKED_REQUEST_DATA: RequestData = {
  sessionId: '123-123-123-123-123',
  userId: 'user123',
  country: 'US',
  flightNumbers: ['123', '123'],
  fields: {}
}

const generateRequestDataMock = (mockedData?: Partial<RequestData>): RequestData => {
  let builder = Builder<RequestData>(MOCKED_REQUEST_DATA)

  let sessionId
  if (mockedData?.sessionId === undefined) {
    sessionId = MOCKED_REQUEST_DATA.sessionId
  } else if (mockedData?.sessionId != null) {
    sessionId = mockedData.sessionId
  }

  if (mockedData != null) {
    builder = builder
      .sessionId(sessionId as UUID)
      .country(mockedData.country ?? MOCKED_REQUEST_DATA.country)
      .userId(mockedData.userId ?? MOCKED_REQUEST_DATA.userId)
      .flightNumbers(mockedData.flightNumbers ?? MOCKED_REQUEST_DATA.flightNumbers)
      .fields(mockedData.fields ?? MOCKED_REQUEST_DATA.fields)
  }

  return builder.build()
}

export default generateRequestDataMock
