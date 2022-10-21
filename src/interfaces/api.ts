import { ConfigInterface } from './config'
import { Method } from 'axios'

export interface RequestHeaders {
    [key: string]: string
}

export interface ApiClientInterface {
    setConfig(config: ConfigInterface): void

    getConfig(): ConfigInterface

    setAccessToken(token: string): void

    request(method: Method, url: string, data?: any, headers?: RequestHeaders)

    authorizedRequest(method: Method, url: string, data?: any)

    serviceRequest(method: Method, url: string, data?: any)
}
