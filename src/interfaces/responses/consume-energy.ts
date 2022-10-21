export interface ConsumeEnergyItem {
    remaining_energy: number
    energy_deduced: number
    request_id: string
}

export interface ConsumeEnergyResponse {
    item: ConsumeEnergyItem
}
