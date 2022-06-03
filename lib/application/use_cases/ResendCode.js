const { Logger } = require('../../shared/infrastructure/logger')

const { AwsCognito } = require('../../infrastructure/externalRepository')

const awsCognito = new AwsCognito()

/**
 * Execute the business rules to Resend code
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (email) => {
    try {
        await awsCognito.resendCode(email)

        return true
    } catch (error) {
        Logger.crit({
            level: 'crit',
            file: 'ResendCode.js',
            message: `${error.message}`,
            stack: error.stack,
        })
        return Promise.reject(error)
    }
}
