import { IPaymentMethod } from "../interfaces/IPaymentMethod";

export class PaymentFactory {
  private paymentMethods: IPaymentMethod[];

  constructor(...paymentMethods: IPaymentMethod[]) {
    this.paymentMethods = paymentMethods;
  }

  paymentBuilder(token: string): IPaymentMethod | undefined {
    if (!token || typeof token !== "string") {
      throw new Error("invalid Token");
    }

    const parts = token.split("_");
    if (parts.length < 2 || parts[0].trim() === "") {
      throw new Error("Invalid token")
    }

    const paymentMethod = this.paymentMethods
      .find(paymentMethod => paymentMethod.getPrefix() === parts[0])

    return paymentMethod
  }
}