const crypto = require('crypto')
const {
    CognitoIdentityProvider,
    AuthFlowType,
} = require('@aws-sdk/client-cognito-identity-provider')

const messages = require('../../../messages')
const {
    clientIdUserPool,
    clientSecretUserPool,
    idUserPool,
} = require('../../../keys')

const { Logger } = require('../../shared/infrastructure/logger')

const fileName = 'AwsCognito.js'

/**
 * Class responsible for controlling access to aws cognito
 *
 * @author camilo.ordonez
 *
 */
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

    async verifyUser(email, code) {
        try {
            const params = {
                ClientId: clientIdUserPool,
                Username: email,
                ConfirmationCode: code,
                SecretHash: this.hashSecret(
                    clientSecretUserPool,
                    email,
                    clientIdUserPool
                ),
            }
            const response = await this.provider.confirmSignUp(params)
            console.log(response)
            return {
                status: true,
                value: response,
            }
        } catch (error) {
            if (error.__type === 'CodeMismatchException') {
                return {
                    status: false,
                    value: messages.USER_CODE_INVALID,
                }
            } else if (error.__type === 'ExpiredCodeException') {
                return {
                    status: false,
                    value: messages.USER_CODE_EXPIRED,
                }
            }

            Logger.crit({
                level: 'crit',
                file: fileName,
                message: `${error.message}`,
                stack: error.stack,
            })

            return Promise.reject(error)
        }
    }

    async authUser(email, password) {
        try {
            const params = {
                ClientId: clientIdUserPool,
                AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
                AuthParameters: {
                    USERNAME: email,
                    PASSWORD: password,
                    SECRET_HASH: this.hashSecret(
                        clientSecretUserPool,
                        email,
                        clientIdUserPool
                    ),
                },
            }
            const response = await this.provider.initiateAuth(params)
            return {
                status: true,
                value: response.AuthenticationResult,
            }
        } catch (error) {
            if (error.__type === 'NotAuthorizedException') {
                return {
                    status: false,
                    code: 401,
                    value: messages.LOGIN_INVALID,
                }
            } else if (error.__type === 'UserNotConfirmedException') {
                return {
                    status: false,
                    code: 400,
                    value: messages.USER_NOT_VERIFIED,
                }
            }
            Logger.crit({
                level: 'crit',
                file: fileName,
                message: `${error.message}`,
                stack: error.stack,
            })

            return Promise.reject(error)
        }
    }

    async resendCode(email) {
        try {
            const params = {
                ClientId: clientIdUserPool,
                Username: email,
                SecretHash: this.hashSecret(
                    clientSecretUserPool,
                    email,
                    clientIdUserPool
                ),
            }
            await this.provider.resendConfirmationCode(params)
            return {
                status: true,
            }
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
