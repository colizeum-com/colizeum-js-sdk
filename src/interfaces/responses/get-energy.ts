export interface EnergyToken {
    token_id: string
    energy: number
    max_energy: number
    next_energy_at: string
    energy_regeneration_amount: number
    energy_regeneration_rate: number
}

export interface EnergyItem {
    total_energy: number
    max_energy: number

    tokens: EnergyToken[]
}

export interface GetEnergyResponse {
    item: EnergyItem
}
