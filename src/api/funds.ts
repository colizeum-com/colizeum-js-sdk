import { ApiClient } from './client'
import { Constants } from '../utils/constants'
import { ConfigInitProps } from '../interfaces/config'
import { FundsApiInterface } from '../interfaces/funds'
import { GetEnergyResponse } from '../interfaces/responses/get-energy'
import { ConsumeEnergyResponse } from '../interfaces/responses/consume-energy'
import { DistributeRewardsResponse } from '../interfaces/responses/distribute-rewards'
import { GetSecondaryCurrencyResponse } from '../interfaces/responses/get-secondary-currency'
import { GetEarningsResponse } from '../interfaces/responses/get-earnings'

export class ColizeumFunds extends ApiClient implements FundsApiInterface {
    constructor(config?: ConfigInitProps) {
        super(`${Constants.API_URL}/funds`, config)
    }

    public getEnergy(): Promise<GetEnergyResponse> {
        return this.authorizedRequest('GET', '/energy')
    }

    public consumeEnergy(amount: number, tokenId?: string): Promise<ConsumeEnergyResponse> {
        const payload: any = {
            amount,
        }

        if (tokenId) {
            payload.token_id = tokenId
        }

        return this.authorizedRequest('POST', '/energy/consume', payload)
    }

    public distributeRewards(
        requestIds: string[],
        distribution: number[]
    ): Promise<DistributeRewardsResponse> {
        return this.serviceRequest('POST', '/energy/rewards', {
            request_ids: requestIds,
            distribution: distribution,
        })
    }

    public getSecondaryCurrency(): Promise<GetSecondaryCurrencyResponse> {
        return this.authorizedRequest('GET', '/secondary_currency')
    }

    public getEarnings(): Promise<GetEarningsResponse> {
        return this.authorizedRequest('GET', '/earnings')
    }
}
