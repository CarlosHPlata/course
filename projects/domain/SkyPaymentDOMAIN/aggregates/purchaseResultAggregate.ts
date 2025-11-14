import { PurchaseStatus } from "../entities/PurchaseStatus"

export type PurchaseResult = {
  status: PurchaseStatus,
  finalPrice: number
}