import { RequestData } from '@http/Request'
import { ResponseData } from '@http/Response'
import { Context } from '../../model/Context'
import { SessionManager } from '../sessionManager'
import { Session } from '../../model/session'
import { Builder } from 'builder-pattern'

export default abstract class FlowStrategy {

  constructor(
    private readonly sessionManager: SessionManager
  ) { }

  async init(requestData: RequestData): Promise<ResponseData> {
    try {
      const session: Session = await this.sessionManager.mapInitRequestToSession(requestData)
      await this.sessionManager.saveSession(session)

      return Builder<ResponseData>()
        .sessionId(session.sessionId)
        .build()
    } catch (e) {
      console.error(e)
      return this.reject()
    }
  }

  async checkIn(requestData: RequestData): Promise<ResponseData> {
    try {
      let context = await this.initContext(requestData)
      context = await this.continueFlow(context)
      await this.sessionManager.saveSession(context.getSession())

      return context.getResponse()
    } catch (e) {
      console.error(e)
      return this.reject()
    }
  }

  protected reject(): ResponseData {
    return Builder<ResponseData>()
      .status('rejected')
      .build()
  }

  private async initContext(requestData: RequestData): Promise<Context> {
    const session: Session = await this.sessionManager.getSession(requestData)
    const responseData = Builder<ResponseData>().status('rejected').build()
    return new Context(session, requestData, responseData)
  }

  protected abstract continueFlow(context: Context): Promise<Context>
}
