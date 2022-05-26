const messages = require('../../../../messages')

module.exports = class {
    async getUserByEmail(email) {
        if (
            email === 'orarjuan@hotmail.com' ||
            email === 'orarjuan@yahoo.com'
        ) {
            return null
        }
        return {
            idUser: 5,
            uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
            email: 'orarjuan@gmail.com',
            username: null,
            verified: '0',
            activeRow: '1',
            createdAt: '2022-05-26T17:43:31.000Z',
            updatedAt: '2022-05-26T17:43:31.000Z',
        }
    }

    async createUser(user) {
        console.log('user', user)
        if (user.email === 'orarjuan@yahoo.com') {
            return {
                status: false,
                value: messages.USER_EXISTING,
            }
        }
        return {
            status: true,
            value: {
                verified: '0',
                activeRow: '1',
                createdAt: { val: 'CURRENT_TIMESTAMP' },
                updatedAt: { val: 'CURRENT_TIMESTAMP' },
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                email: 'orarjuan@hotmail.com',
                username: undefined,
            },
        }
    }
}
