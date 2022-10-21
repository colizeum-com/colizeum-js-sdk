import { EnergyItem } from './get-energy'
import { SecondaryCurrencyItem } from './get-secondary-currency'

export interface UserWallet {
    id: string
    address: string
}

export interface UserItem {
    id: string
    email: string
    username: string
    avatar: string
    bio: string
    twitter: string
    discord: string
    telegram: string
    created_at: string

    energy: EnergyItem
    secondaryCurrency: SecondaryCurrencyItem

    wallets: UserWallet[]
}

export interface GetMeResponse {
    item: UserItem
}
