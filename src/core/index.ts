import { Config } from '../utils/config'
import { ConfigInitProps, ConfigInterface } from '../interfaces/config'
import { ColizeumAuth } from '../auth'
import { AuthInterface } from '../interfaces/auth'
import { ColizeumUser } from '../api/user'
import { ColizeumFunds } from '../api/funds'
import { UserApiInterface } from '../interfaces/user'
import { FundsApiInterface } from '../interfaces/funds'

export class Colizeum {
    public readonly config: ConfigInterface

    public readonly auth: AuthInterface
    public readonly user: UserApiInterface
    public readonly funds: FundsApiInterface

    constructor(props: ConfigInitProps) {
        this.config = new Config(props)

        this.auth = new ColizeumAuth()
        this.auth.setConfig(this.config)

        this.user = new ColizeumUser()
        this.user.setConfig(this.config)

        this.funds = new ColizeumFunds()
        this.funds.setConfig(this.config)
    }

    public setAccessToken(token: string): Colizeum {
        this.config.setAccessToken(token)

        return this
    }
}
