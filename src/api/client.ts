import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, Method } from 'axios'
import { InvalidTokenException } from '../exceptions/invalid-token'
import { InvalidRequestException } from '../exceptions/invalid-request'
import { GenericException } from '../exceptions/generic'
import { UnauthorizedException } from '../exceptions/unauthorized'
import { Config } from '../utils/config'
import { ConfigInitProps, ConfigInterface } from '../interfaces/config'
import { ApiClientInterface } from '../interfaces/api'

export class ApiClient implements ApiClientInterface {
    private client: AxiosInstance
    private config: ConfigInterface

    private headers: {
        [key: string]: string
    } = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    }

    constructor(baseURL: string, config?: ConfigInitProps) {
        this.client = axios.create({
            baseURL,
        })

        if (!config) {
            return
        }

        this.config = new Config(config)
    }

    public setConfig(config: ConfigInterface): void {
        this.config = config
    }

    public getConfig(): ConfigInterface {
        return this.config
    }

    public setAccessToken(token: string): void {
        this.config.setAccessToken(token)
    }

    public async request(
        method: Method,
        url: string,
        data?: any,
        headers?: { [key: string]: string }
    ) {
        try {
            const config: AxiosRequestConfig = {
                method,
                url,
                headers: {
                    ...this.headers,
                    ...headers,
                },
            }

            if (['POST', 'PUT', 'PATCH'].includes(method)) {
                config.data = data
            }

            const response = await this.client.request(config)

            return response.data
        } catch (e) {
            throw ApiClient.parseException(e)
        }
    }

    public async authorizedRequest(method: Method, url: string, data?: any) {
        return this.request(method, url, data, {
            Authorization: `Bearer ${this.config.getAccessToken()}`,
        })
    }

    public async serviceRequest(method: Method, url: string, data?: any) {
        return this.request(method, url, data, {
            Authorization: `Bearer ${this.config.getApiKey()}`,
        })
    }

    private static parseException(error: AxiosError<any>): Error {
        if (error.response?.data?.error) {
            const message = `${error.response?.data?.error} - ${error.response?.data?.error_description}`

            switch (error.response?.data.error) {
                case 'invalid_token':
                    return new InvalidTokenException(message)
                case 'invalid_request':
                    return new InvalidRequestException(message)
                default:
                    return new GenericException(message)
            }
        }

        if (error.response?.data.message) {
            switch (error.status) {
                case 401:
                    return new UnauthorizedException(error.response?.data.message)
                default:
                    return new GenericException(error.response?.data.message)
            }
        }

        return error
    }
}
