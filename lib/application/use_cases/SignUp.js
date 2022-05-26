const messages = require('../../../messages')

const { sequelize } = require('../../shared/infrastructure/database')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

const { AwsCognito } = require('../../infrastructure/externalRepository')

const { UserEntity, PersonEntity } = require('../../domain/entities')

const {
    UserRepository,
    PersonRepository,
} = require('../../domain/repositories')
const { UserStorage, PersonStorage } = require('../../interfaces/storage')

const awsCognito = new AwsCognito()
const userRepository = new UserRepository(new UserStorage())
const personRepository = new PersonRepository(new PersonStorage())

module.exports = async (data) => {
    const transaction = await sequelize.transaction()
    try {
        const foundUser = await userRepository.getUserByEmail(data.email)

        if (foundUser) {
            throw new ErrorHandler(400, messages.USER_EXISTING)
        }

        const createUserCognito = await awsCognito.createUser(
            data.firstName,
            data.lastName,
            data.email,
            data.password
        )

        if (!createUserCognito.status) {
            throw new ErrorHandler(400, createUserCognito.value)
        }

        const user = new UserEntity({
            uidUser: createUserCognito.value,
            email: data.email,
        })

        const createUserDb = await userRepository.createUser(user, transaction)

        if (!createUserDb.status) {
            awsCognito.deleteUser(data.email)
            throw new ErrorHandler(400, createUserDb.value)
        }

        const person = new PersonEntity({
            userUid: createUserDb.value.uidUser,
            firstName: data.firstName,
            lastName: data.lastName,
        })

        const createPersonDb = await personRepository.createPerson(
            person,
            transaction
        )

        if (!createPersonDb.status) {
            awsCognito.deleteUser(data.email)
            throw new ErrorHandler(400, createPersonDb.value)
        }

        Logger.info({
            level: 'info',
            file: 'SignUp.js',
            message: `${messages.SUCCESS_SIGN_UP}`,
        })

        await transaction.commit()
        return true
    } catch (error) {
        await transaction.rollback()
        Logger.crit({
            level: 'crit',
            file: 'SignUp.js',
            message: `${error.message}`,
            stack: error.stack,
        })
        return Promise.reject(error)
    }
}
