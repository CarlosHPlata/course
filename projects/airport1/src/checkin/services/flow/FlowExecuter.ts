import { Context } from '../../model/Context'
import StepTemplate from './StepTemplate'

// Using chain of responsability
export default class FlowExecuter {

  private readonly steps: StepTemplate[] = []

  and(step: StepTemplate): FlowExecuter {
    this.steps.push(step)
    return this
  }

  async execute(context: Context): Promise<Context> {
    let shouldGoToNextStep = true
    let stepIndex = 0

    while (shouldGoToNextStep && stepIndex < this.steps.length) {
      const step: StepTemplate = this.steps[stepIndex++]
      shouldGoToNextStep = await step.execute(context)
    }

    return context
  }
}
