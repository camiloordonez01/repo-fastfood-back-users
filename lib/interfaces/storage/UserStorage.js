const { Logger } = require('../../shared/infrastructure/logger')

const { UserEntity } = require('../../domain/entities')

const { User } = require('../../infrastructure/database/models')

const fileName = 'UserStorage.js'
class UserStorage {
    constructor() {
        this.model = User
    }

    async getUserByEmail(email) {
        try {
            const data = await this.model.findOne({
                where: {
                    email,
                },
                raw: true,
            })

            return data ? new UserEntity(data) : null
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

    async createUser(user, transaction) {
        try {
            const data = await this.model.create(user, { transaction })

            return {
                status: true,
                value: data.dataValues,
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

    async updateUserById(uidUser, user, transaction) {
        try {
            const data = await this.model.update(user, {
                where: { uidUser },
                transaction,
            })

            return {
                status: true,
                value: data.dataValues,
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
}

module.exports = { UserStorage }
