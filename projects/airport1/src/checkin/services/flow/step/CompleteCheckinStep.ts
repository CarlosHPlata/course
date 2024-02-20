import { Context } from '../../../model/Context'
import StepTemplate from '../StepTemplate'

export default class CompleteCheckinStep extends StepTemplate {

  onExecute(context: Context): Promise<boolean> {
    context = context.withResponseBuilder(rb => rb.status('completed'))
    return Promise.resolve(true)
  }

}
