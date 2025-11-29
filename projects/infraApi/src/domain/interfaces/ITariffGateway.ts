import { Tariff } from "../aggregates/Tariff";

export interface ITariffGateway {
  getTariff: () => Promise<Tariff>
}