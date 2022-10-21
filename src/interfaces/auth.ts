import { ConfigInterface } from './config'
import { GetTokenResponse } from './responses/get-token'

export interface AuthUrlProps {
    scopes?: string[]
    pkce?: boolean
    challenge?: string
}

export interface AuthInterface {
    setConfig(config: ConfigInterface): void

    getAuthenticationUrl(props: AuthUrlProps): string

    getTokensFromCode(code: string, verifier?: string): Promise<GetTokenResponse>

    generateVerifier(): string

    generateChallenge(verifier: string): string
}
