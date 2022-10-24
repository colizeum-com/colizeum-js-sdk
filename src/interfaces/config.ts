export interface ConfigInitProps {
    apiUrl?: string
    issuerUrl?: string

    appId: string

    apiKey?: string

    accessToken?: string

    clientId?: string
    clientSecret?: string
    redirectUri?: string

    sandbox?: boolean
}

export interface ConfigInterface {
    getApiUrl(): string

    getIssuerUrl(): string

    getAppId(): string | undefined

    getApiKey(): string | undefined

    setAccessToken(token: string): void

    getAccessToken(): string | undefined

    getClientId(): string | undefined

    getClientSecret(): string | undefined

    getRedirectUri(): string | undefined

    isSandbox(): boolean
}
