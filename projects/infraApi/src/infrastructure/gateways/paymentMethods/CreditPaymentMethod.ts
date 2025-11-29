import { IPaymentMethod } from "../../../domain/interfaces/IPaymentMethod";

export class CreditPaymentMethod implements IPaymentMethod {
  getPrefix(): string {
    return "CREDIT"
  }

  private async authorize(amount: number, userId: string, token: string) {
    let bankAuthorizeResponse = await fetch(`http://localhost:3001/payment/3ds/authorize?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userId,
          amount,
        })
      }
    )

    if (!bankAuthorizeResponse.ok) {
      throw new Error("Error fetching payment")
    }
    let bankAuthorizeData = await bankAuthorizeResponse.json()

    if (!bankAuthorizeData.accepted) {
      throw new Error("Error fetching payment")
    }
  }

  private async capture(token: string): Promise<string> {
    let bankCaptureResponse = await fetch(`http://localhost:3001/payment/3ds/capture?token=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
      }
    )

    if (!bankCaptureResponse.ok) {
      throw new Error("Error fetching payment")
    }

    let bankCaptureData = await bankCaptureResponse.json()

    return bankCaptureData.token
  }

  async pay(finalPrice: number, userId: string, email: string, token: string): Promise<string> {
    try {
      await this.authorize(finalPrice, userId, token);
      return await this.capture(token)
    } catch (error) {
      throw error
    }
  }
}