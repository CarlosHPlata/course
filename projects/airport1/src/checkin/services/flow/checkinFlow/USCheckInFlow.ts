import FlowStrategy from '../FlowStrategy'
import { Context } from '../../../model/Context'
import FlowExecuter from '../FlowExecuter'
import ValidateSessionStep from '../step/ValidateSessionStep'
import PassportInformationStep from '../step/PassportInformationStep'
import AgreementSignStep from '../step/AgreementSignStep'
import CompleteCheckinStep from '../step/CompleteCheckinStep'

export default class USCheckinFlow extends FlowStrategy {

  protected continueFlow(context: Context): Promise<Context> {
    const flowExecuter = new FlowExecuter()
      .and(new ValidateSessionStep())
      .and(new PassportInformationStep())
      .and(new AgreementSignStep())
      .and(new CompleteCheckinStep())

    return flowExecuter.execute(context)
  }

}
