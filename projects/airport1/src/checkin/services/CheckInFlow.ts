import { Builder } from 'builder-pattern'
import { Session } from '../model/session'
import { Context } from '../model/Context'
import { RequestData } from '@http/Request'
import { ResponseData } from '@http/Response'
import sessionUtils from './sessionManager'
import ValidateSessionStep from './flow/step/ValidateSessionStep'
import PassportInformationStep from './flow/step/PassportInformationStep'
import AgreementSignStep from './flow/step/AgreementSignStep'
import FlowExecuter from './flow/FlowExecuter'
import CompleteCheckinStep from './flow/step/CompleteCheckinStep'

export const initFLow = async (rquestData: RequestData): Promise<ResponseData> => {
  try {
    const session: Session = await sessionUtils.mapInitRequestToSession(rquestData)
    await sessionUtils.saveSession(session)

    return Builder<ResponseData>()
      .sessionId(session.sessionId)
      .build()
  } catch (e) {
    console.error(e)
    return Builder<ResponseData>()
      .status('rejected')
      .build()
  }
}

export const checkInFlow = async (requestData: RequestData): Promise<ResponseData> => {
  try {
    const context = await initContext(requestData)
    return await executeFlow(context)
  } catch (e) {
    console.error(e)
    return Builder<ResponseData>()
      .status('rejected')
      .build()
  }
}

const executeFlow = async (context: Context): Promise<ResponseData> => {
  const flowExecuter = new FlowExecuter()
    .and(new ValidateSessionStep())
    .and(new PassportInformationStep())
    .and(new AgreementSignStep())
    .and(new CompleteCheckinStep())

  context = await flowExecuter.execute(context)
  await sessionUtils.saveSession(context.getSession())

  return context.getResponse()
}

const initContext = async (requestData: RequestData): Promise<Context> => {
  const session: Session = await sessionUtils.getSession(requestData)
  const responseData = Builder<ResponseData>().status('rejected').build()
  return new Context(session, requestData, responseData)
}
