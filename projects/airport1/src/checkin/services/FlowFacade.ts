import { RequestData } from '@http/Request'
import { CountryCode } from '../model/Schema'
import FlowStrategy from './flow/FlowStrategy'
import MXCheckinFlow from './flow/checkinFlow/MXCheckingFlow'
import USCheckinFlow from './flow/checkinFlow/USCheckInFlow'
import sessionManager from './sessionManager'
import { ResponseData } from '@http/Response'
import { Context } from '../model/Context'

const FLOWS_AVAILABLES = new Map<CountryCode, FlowStrategy>([
  ['US', new USCheckinFlow(sessionManager)],
  ['MX', new MXCheckinFlow(sessionManager)]
])

export class FlowFacade extends FlowStrategy {

  async init(requestData: RequestData): Promise<ResponseData> {
    const flow = FLOWS_AVAILABLES.get(requestData.country)

    if (!flow) {
      return this.reject()
    }

    return await flow.init(requestData)
  }

  async checkIn(requestData: RequestData): Promise<ResponseData> {
    const flow = FLOWS_AVAILABLES.get(requestData.country)

    if (!flow) {
      return this.reject()
    }

    return await flow.checkIn(requestData)
  }

  protected continueFlow(context: Context): Promise<Context> {
    throw new Error('Method not implemented.')
  }

}
