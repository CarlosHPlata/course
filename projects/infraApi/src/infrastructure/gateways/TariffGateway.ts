import { Tariff } from "../../domain/aggregates/Tariff";
import { ITariffGateway } from "../../domain/interfaces/ITariffGateway";

export class TariffGateway implements ITariffGateway {
  async getTariff(): Promise<Tariff> {
    try {
      let tariffResponse = await fetch("http://localhost:3001/accounting/service/v1/tariff")

      if (!tariffResponse.ok) {
        throw new Error("Error fetching tariff")
      }

      let tariffData = await tariffResponse.json()

      return {
        basic: tariffData.basic,
        business: tariffData.business,
        first: tariffData.first,
      }
    } catch (error) {
      throw new Error("Error fetching tariff")
    }
  }
}