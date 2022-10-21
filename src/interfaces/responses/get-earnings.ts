export interface EarningsItem {
    total_earnings: number
    client_id: string
}

export interface GetEarningsResponse {
    item: EarningsItem
}
