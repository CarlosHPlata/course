export class Publisher {
  private suscribers: Suscriber[];

  constructor() {
    this.suscribers = [];
  }

  public suscribe(suscriber: Suscriber) {
    this.suscribers.push(suscriber);
  }

  public notify(state: string) {
    this.suscribers.forEach((suscriber) => suscriber.notify(state));
  }
}

export interface Suscriber {
  notify(state: string)
}