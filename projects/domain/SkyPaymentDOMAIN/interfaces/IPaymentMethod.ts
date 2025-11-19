export interface IPaymentMethod {
  pay(finalPrice: number, userId: string, email: string, token: string): Promise<string>
  getPrefix(): string
}

