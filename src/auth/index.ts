import { base64URL, generateRandomString } from '../utils/helpers'
import sha256 from 'crypto-js/sha256'
import { Constants } from '../utils/constants'
import { ColizeumIdentity } from '../api/identity'
import { Config } from '../utils/config'
import { MissingCredentialsException } from '../exceptions/missing-credentials'
import { ConfigInitProps, ConfigInterface } from '../interfaces/config'
import { IdentityApiInterface } from '../interfaces/identity'
import { AuthInterface, AuthUrlProps } from '../interfaces/auth'
import { GetTokenResponse } from '../interfaces/responses/get-token'

export class ColizeumAuth implements AuthInterface {
    private config: ConfigInterface
    private verifier: string

    private api: IdentityApiInterface

    constructor(config?: ConfigInitProps) {
        this.api = new ColizeumIdentity(config)

        if (!config) {
            return
        }

        this.config = new Config(config)

        this.api.setConfig(this.config)
    }

    public setConfig(config: ConfigInterface): void {
        this.config = config

        this.api.setConfig(config)
    }

    public getConfig(): ConfigInterface {
        return this.config
    }

    public getAuthenticationUrl(props?: AuthUrlProps): string {
        if (!props) {
            props = {
                pkce: true,
            }
        }

        if (!props.scopes) {
            props.scopes = Constants.DEFAULT_SCOPES
        }

        if (props.pkce && !this.verifier) {
            this.verifier = this.generateVerifier()
        }

        if (props.pkce && !props.challenge) {
            props.challenge = this.generateChallenge(this.verifier)
        }

        const clientId = this.getConfig().getClientId()
        const redirectUri = this.getConfig().getRedirectUri()

        if (!clientId) {
            throw new MissingCredentialsException('Missing Client ID')
        }

        if (!redirectUri) {
            throw new MissingCredentialsException('Missing Redirect URI')
        }

        const params: any = {
            response_type: 'code',
            client_id: clientId,
            redirect_uri: redirectUri!,
            scope: encodeURI(props.scopes.join(' ')),
            prompt: 'consent',
        }

        if (props.pkce) {
            params.code_challenge = props.challenge
            params.code_challenge_method = 'S256'
        }

        const query = new URLSearchParams(params)

        return `${Constants.ISSUER}/auth?${query.toString()}`
    }

    public getTokensFromCode(code: string, verifier?: string): Promise<GetTokenResponse> {
        return this.api.getTokensFromCode(code, verifier || this.verifier)
    }

    public refreshAccessToken(refreshToken: string, scopes?: string[]): Promise<GetTokenResponse> {
        return this.api.refreshAccessToken(refreshToken, scopes)
    }

    public revokeToken(token: string): Promise<void> {
        return this.api.revokeToken(token)
    }

    public generateVerifier(): string {
        return generateRandomString(128)
    }

    public generateChallenge(verifier: string): string {
        return base64URL(sha256(verifier).toString())
    }
}
