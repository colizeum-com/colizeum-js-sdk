import { GetMeResponse } from './responses/get-me'
import { ApiClientInterface } from './api'

export interface UserApiInterface extends ApiClientInterface {
    getMe(): Promise<GetMeResponse>
}
