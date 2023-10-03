import { Suscriber } from "./Publisher";

export class Speaker implements Suscriber {
  notify(state: string) {
    if (state == 'green') {
      console.log('*some sound*')
    }
  }
}