const messages = require('../../../messages')
const commonMessages = require('../../shared/messages')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

const { UserEntity } = require('../../domain/entities')

const { UserRepository } = require('../../domain/repositories')
const { UserStorage } = require('../../interfaces/storage')

const { AwsCognito } = require('../../infrastructure/externalRepository')

const awsCognito = new AwsCognito()
const userRepository = new UserRepository(new UserStorage())

/**
 * Execute the business rules to Verify user
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (data) => {
    try {
        const foundUser = await userRepository.getUserByEmail(data.email)

        if (foundUser === null) {
            throw new ErrorHandler(400, messages.USER_NOT_EXISTING)
        }

        if (foundUser.verified === 1) {
            throw new ErrorHandler(400, messages.USER_ALREADY_VERIFIED)
        }

        const verifyUserCognito = await awsCognito.verifyUser(
            data.email,
            data.code
        )

        if (!verifyUserCognito.status) {
            throw new ErrorHandler(400, verifyUserCognito.value)
        }

        const user = new UserEntity({
            verified: '1',
        })
        const updateUser = await userRepository.updateUserById(
            foundUser.uidUser,
            user
        )
        if (!updateUser.status) {
            throw new ErrorHandler(500, commonMessages.UPDATE_ERROR)
        }

        return true
    } catch (error) {
        Logger.crit({
            level: 'crit',
            file: 'SignUp.js',
            message: `${error.message}`,
            stack: error.stack,
        })
        return Promise.reject(error)
    }
}
