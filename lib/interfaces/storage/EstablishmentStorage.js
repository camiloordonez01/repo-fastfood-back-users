const { Logger } = require('../../shared/infrastructure/logger')

const {
    Establishment,
    Company,
} = require('../../infrastructure/database/models')

const fileName = 'EstablishmentStorage.js'
class EstablishmentStorage {
    constructor() {
        this.model = Establishment
    }

    async getEstablishmentsByList(list) {
        try {
            const data = await this.model.findAll({
                attributes: {
                    exclude: ['activeRow', 'createdAt', 'updatedAt'],
                },
                where: {
                    idEstablishment: list,
                    activeRow: '1',
                },
                include: [
                    {
                        model: Company,
                        where: { activeRow: '1' },
                        attributes: ['name', 'logo'],
                    },
                ],
            })

            return data ? data : []
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

module.exports = { EstablishmentStorage }
