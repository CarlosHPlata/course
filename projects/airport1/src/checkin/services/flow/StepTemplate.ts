import { Context } from '../../model/Context'

export default abstract class StepTemplate {
  execute(context: Context): Promise<boolean> {
    if (this.when(context)) {
      return this.onExecute(context)
    }

    return Promise.resolve(true)
  }

  when(context: Context): boolean {
    return true
  }

  abstract onExecute(context: Context): Promise<boolean>
}
