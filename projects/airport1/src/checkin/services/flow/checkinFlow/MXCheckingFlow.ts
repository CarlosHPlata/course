import { Context } from '../../../model/Context'
import FlowExecuter from '../FlowExecuter'
import FlowStrategy from '../FlowStrategy'
import CompleteCheckinStep from '../step/CompleteCheckinStep'
import PassportInformationStep from '../step/PassportInformationStep'
import ValidateSessionStep from '../step/ValidateSessionStep'

export default class MXCheckinFlow extends FlowStrategy {

  protected continueFlow(context: Context): Promise<Context> {
    const flowExecuter = new FlowExecuter()
      .and(new ValidateSessionStep())
      .and(new PassportInformationStep())
      .and(new CompleteCheckinStep())

    return flowExecuter.execute(context)
  }

}
