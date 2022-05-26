const crypto = require('crypto')
const {
    CognitoIdentityProvider,
} = require('@aws-sdk/client-cognito-identity-provider')

const messages = require('../../../messages')

const { Logger } = require('../../shared/infrastructure/logger')

const clientId = '2ejubshtsr90l3kll0ebfhs5fk'
const clientSecret = '1bjhtma6gci7c0sn73u1jrj23d3mgutbsu7fj3b9qo3c7pekjirn'
const userPoolId = 'us-east-1_yshTzMX8X'
const fileName = 'AwsCognito.js'
class AwsCognito {
    constructor() {
        this.provider = new CognitoIdentityProvider({ region: 'us-east-1' })
    }

    async createUser(firstName, lastName, email, password) {
        try {
            const params = {
                ClientId: clientId,
                Password: password,
                Username: email,
                SecretHash: this.hashSecret(clientSecret, email, clientId),
                UserAttributes: [
                    {
                        Name: 'email',
                        Value: email,
                    },
                    {
                        Name: 'custom:first_name',
                        Value: firstName,
                    },
                    {
                        Name: 'custom:last_name',
                        Value: lastName,
                    },
                ],
            }
            const response = await this.provider.signUp(params)

            return {
                status: true,
                value: response.UserSub,
            }
        } catch (error) {
            Logger.crit({
                level: 'crit',
                file: fileName,
                message: `${error.message}`,
                stack: error.stack,
            })

            if (error.__type === 'UsernameExistsException') {
                return {
                    status: false,
                    value: messages.USER_EXISTING,
                }
            }

            return Promise.reject(error)
        }
    }

    async deleteUser(email) {
        try {
            await this.provider.adminDeleteUser({
                UserPoolId: userPoolId,
                Username: email,
            })
            return true
        } catch (error) {
            Logger.crit({
                level: 'crit',
                file: fileName,
                message: `${error.message}`,
                stack: error.stack,
            })
            return Promise.reject(error)
        }
    }

    hashSecret(clientSecret, username, clientId) {
        return crypto
            .createHmac('SHA256', clientSecret)
            .update(username + clientId)
            .digest('base64')
    }
}

module.exports = { AwsCognito }
