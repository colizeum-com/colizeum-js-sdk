import { ConfigInitProps, ConfigInterface } from '../interfaces/config'
import { Constants } from './constants'

export class Config implements ConfigInterface {
    private readonly apiUrl: string
    private readonly issuerUrl: string
    private readonly appId: string

    private readonly apiKey?: string
    private accessToken?: string

    private readonly clientId?: string
    private readonly clientSecret?: string
    private readonly redirectUri?: string

    private readonly sandbox: boolean = true

    constructor(props: ConfigInitProps) {
        this.apiUrl = props.apiUrl || Constants.API_URL
        this.issuerUrl = props.issuerUrl || Constants.ISSUER

        this.appId = props.appId

        this.apiKey = props.apiKey
        this.accessToken = props.accessToken

        this.clientId = props.clientId
        this.clientSecret = props.clientSecret
        this.redirectUri = props.redirectUri

        this.sandbox = props.sandbox || true
    }

    public getApiUrl(): string {
        return this.apiUrl
    }

    public getIssuerUrl(): string {
        return this.issuerUrl
    }

    public getAppId(): string | undefined {
        return this.appId
    }

    public getApiKey(): string | undefined {
        return this.apiKey
    }

    public setAccessToken(token: string): void {
        this.accessToken = token
    }

    public getAccessToken(): string | undefined {
        return this.accessToken
    }

    public getClientId(): string | undefined {
        return this.clientId
    }

    public getClientSecret(): string | undefined {
        return this.clientSecret
    }

    public getRedirectUri(): string | undefined {
        return this.redirectUri
    }

    public isSandbox(): boolean {
        return this.sandbox
    }
}
