import { GetTokenResponse } from './responses/get-token'
import { ApiClientInterface } from './api'

export interface IdentityApiInterface extends ApiClientInterface {
    getTokensFromCode(code: string, verifier?: string): Promise<GetTokenResponse>

    refreshAccessToken(refreshToken: string, scopes?: string[]): Promise<GetTokenResponse>

    revokeToken(token: string): Promise<void>
}
