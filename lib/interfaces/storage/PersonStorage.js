const { Logger } = require('../../shared/infrastructure/logger')

const { Person } = require('../../infrastructure/database/models')

const { PersonEntity } = require('../../domain/entities')

const fileName = 'PersonStorage.js'
class PersonStorage {
    constructor() {
        this.model = Person
    }

    async getPerson(idPerson) {
        try {
            const data = await this.model.findOne({
                where: {
                    idPerson,
                    activeRow: '1',
                },
                raw: true,
            })

            return data ? new PersonEntity(data) : null
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
