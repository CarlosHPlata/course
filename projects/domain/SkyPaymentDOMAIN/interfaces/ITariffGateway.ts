import { Tariff } from "../entities/Tariff";

export interface ITariffGateway {
  getTariff: () => Promise<Tariff>
}