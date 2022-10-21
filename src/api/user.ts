import { ApiClient } from './client'
import { Constants } from '../utils/constants'
import { ConfigInitProps } from '../interfaces/config'
import { UserApiInterface } from '../interfaces/user'
import { GetMeResponse } from '../interfaces/responses/get-me'

export class ColizeumUser extends ApiClient implements UserApiInterface {
    constructor(config?: ConfigInitProps) {
        super(`${Constants.API_URL}/users`, config)
    }

    public getMe(): Promise<GetMeResponse> {
        return this.authorizedRequest('GET', '/me')
    }
}
