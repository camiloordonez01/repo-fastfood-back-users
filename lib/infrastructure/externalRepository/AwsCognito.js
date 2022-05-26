const crypto = require('crypto')
const {
    CognitoIdentityProvider,
} = require('@aws-sdk/client-cognito-identity-provider')

const messages = require('../../../messages')
const {
    clientIdUserPool,
    clientSecretUserPool,
    idUserPool,
} = require('../../../keys')

const { Logger } = require('../../shared/infrastructure/logger')

const fileName = 'AwsCognito.js'
class AwsCognito {
    constructor() {
        this.provider = new CognitoIdentityProvider({ region: 'us-east-1' })
    }

    async createUser(firstName, lastName, email, password) {
        try {
            const params = {
                ClientId: clientIdUserPool,
                Password: password,
                Username: email,
                SecretHash: this.hashSecret(
                    clientSecretUserPool,
                    email,
                    clientIdUserPool
                ),
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
                UserPoolId: idUserPool,
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
