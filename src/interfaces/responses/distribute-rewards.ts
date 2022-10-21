export interface EnergyReward {
    request_id: string
    amount: number
}

export interface DistributeRewardsItem {
    rewards: EnergyReward[]
}

export interface DistributeRewardsResponse {
    item: DistributeRewardsItem
}
