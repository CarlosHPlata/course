import { IPaymentMethod } from "../interfaces/IPaymentMethod";
import { PaymentFactory } from "./PaymentFactory";

describe('payment factory test', () => {

  it('pass token and return payment method prefix', () => {
    const factory = new PaymentFactory();
    expect(() => factory.paymentBuilder("INVALID")).toThrow('Invalid token')
  })

  it('Pass token and return right implementation', () => {
    const paymentMethod: IPaymentMethod = {
      getPrefix: () => 'test',
      pay: () => { throw new Error('not implemented') }
    }
    const factory = new PaymentFactory(paymentMethod);
    const result = factory.paymentBuilder('test_123')
    expect(result).toEqual(paymentMethod)
  })
});