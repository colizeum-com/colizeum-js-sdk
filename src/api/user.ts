import { ApiClient } from './client'
import { Constants } from '../utils/constants'
import { UserApiInterface } from '../interfaces/user'
import { GetMeResponse } from '../interfaces/responses/get-me'

export class ColizeumUser extends ApiClient implements UserApiInterface {
    public getBaseUrl(): string {
        return `${this.getConfig()?.getApiUrl() || Constants.API_URL}/users`
    }

    public getMe(): Promise<GetMeResponse> {
        return this.authorizedRequest('GET', '/me')
    }
}
