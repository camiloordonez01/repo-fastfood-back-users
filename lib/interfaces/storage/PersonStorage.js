const { Logger } = require('../../shared/infrastructure/logger')

const { Person } = require('../../infrastructure/database/models')

const fileName = 'PersonStorage.js'
class PersonStorage {
    constructor() {
        this.model = Person
    }

    async createPerson(person, transaction) {
        try {
            const data = await this.model.create(person, { transaction })

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

module.exports = { PersonStorage }
