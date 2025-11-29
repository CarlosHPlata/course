import { IPaymentMethod } from "../../../domain/interfaces/IPaymentMethod";

export class BankPaymentMethod implements IPaymentMethod {
  getPrefix(): string {
    return "BANK"
  }

  async pay(finalPrice: number, userId: string, email: string, token: string): Promise<string> {
    try {
      let bankResponse = await fetch(`http://localhost:3001/payment/bank/complete?token=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            user: {
              id: userId,
              email: email
            },
            amount: finalPrice
          })
        }
      )

      if (!bankResponse.ok) {
        throw new Error("Error fetching payment")
      }

      let paymentData = await bankResponse.json()

      return paymentData.token
    } catch (error) {
      throw new Error("Error fetching payment")
    }
  }
}
