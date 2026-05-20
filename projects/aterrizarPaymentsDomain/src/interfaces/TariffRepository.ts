import { Tariff } from "../dtos/Tariff";

export interface TariffRepository {
    getCurrentTariff(): Promise<Tariff>
}