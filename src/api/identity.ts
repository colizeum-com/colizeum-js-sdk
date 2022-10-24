import { ApiClient } from './client'
import { Constants } from '../utils/constants'
import { IdentityApiInterface } from '../interfaces/identity'
import { GetTokenResponse } from '../interfaces/responses/get-token'

export class ColizeumIdentity extends ApiClient implements IdentityApiInterface {
    public getBaseUrl(): string {
        return this.getConfig()?.getIssuerUrl() || Constants.ISSUER
    }

    public getTokensFromCode(code: string, verifier?: string): Promise<GetTokenResponse> {
        const payload: any = {
            client_id: this.getConfig().getClientId(),
            grant_type: 'authorization_code',
            code,
            redirect_uri: this.getConfig().getRedirectUri(),
        }

        if (verifier) {
            payload.code_verifier = verifier
        }

        if (this.getConfig().getClientSecret()) {
            payload.client_secret = this.getConfig().getClientSecret()
        }

        return this.request('POST', '/token', payload)
    }

    public refreshAccessToken(refreshToken: string, scopes?: string[]): Promise<GetTokenResponse> {
        return this.request('POST', '/token', {
            client_id: this.getConfig().getClientId(),
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
            redirect_uri: this.getConfig().getRedirectUri(),
            scope: typeof scopes !== 'undefined' ? scopes : Constants.DEFAULT_SCOPES,
        })
    }

    public revokeToken(token: string): Promise<void> {
        return this.request('POST', '/token/revocation', {
            token,
            client_id: this.getConfig().getClientId(),
        })
    }
}
