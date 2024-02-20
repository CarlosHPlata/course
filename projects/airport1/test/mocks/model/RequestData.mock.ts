import { Builder } from 'builder-pattern'
import { RequestData } from '@http/Request'

const MOCKED_REQUEST_DATA: RequestData = {
  sessionId: '123-123-123-123-123',
  userId: 'user123',
  country: 'US',
  flightNumbers: ['123', '123'],
  fields: {}
}

const generateRequestDataMock = (mockedData?: Partial<RequestData>): RequestData => {
  let builder = Builder<RequestData>(MOCKED_REQUEST_DATA)

  if (mockedData != null) {
    builder = builder
      .sessionId(mockedData.sessionId ?? MOCKED_REQUEST_DATA.sessionId)
      .userId(mockedData.userId ?? MOCKED_REQUEST_DATA.userId)
      .flightNumbers(mockedData.flightNumbers ?? MOCKED_REQUEST_DATA.flightNumbers)
      .fields(mockedData.fields ?? MOCKED_REQUEST_DATA.fields)
  }

  return builder.build()
}

export default generateRequestDataMock
