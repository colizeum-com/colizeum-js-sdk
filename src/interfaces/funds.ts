import { GetEnergyResponse } from './responses/get-energy'
import { ConsumeEnergyResponse } from './responses/consume-energy'
import { GetSecondaryCurrencyResponse } from './responses/get-secondary-currency'
import { GetEarningsResponse } from './responses/get-earnings'
import { DistributeRewardsResponse } from './responses/distribute-rewards'
import { ApiClientInterface } from './api'

export interface FundsApiInterface extends ApiClientInterface {
    getEnergy(): Promise<GetEnergyResponse>

    consumeEnergy(amount: number, tokenId?: string): Promise<ConsumeEnergyResponse>

    distributeRewards(
        requestIds: string[],
        distribution: number[]
    ): Promise<DistributeRewardsResponse>

    getSecondaryCurrency(): Promise<GetSecondaryCurrencyResponse>

    getEarnings(): Promise<GetEarningsResponse>
}
