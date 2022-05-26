const messages = require('../../../../messages')

module.exports = class {
    async createPerson(person) {
        if (person.lastName === 'Arbelaez') {
            return {
                status: false,
                value: messages.USER_EXISTING,
            }
        }
        return {
            status: true,
            value: {
                activeRow: '1',
                createdAt: { val: 'CURRENT_TIMESTAMP' },
                updatedAt: { val: 'CURRENT_TIMESTAMP' },
                idPerson: 5,
                userUid: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                firstName: 'Juan Camilo',
                lastName: 'Ordoñez Arbelaez',
                documentType: undefined,
                document: undefined,
                phone: undefined,
                birthday: undefined,
                gender: undefined,
            },
        }
    }
}
