import { Builder } from 'builder-pattern'
import { Context } from '../../../src/checkin/model/Context'
import generateRequestDataMock from './RequestData.mock'
import generateSessionMock from './Session.mock'
import { ResponseData } from '@http/Response'

export class MockContext extends Context {
  constructor() {
    const response = Builder<ResponseData>().build()
    super(generateSessionMock(), generateRequestDataMock(), response)
  }
}
