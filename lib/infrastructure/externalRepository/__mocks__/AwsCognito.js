const messages = require('../../../../messages')
module.exports = class {
    async createUser(firstName) {
        if (firstName === 'Juan') {
            return {
                status: false,
                value: messages.USER_EXISTING,
            }
        }
        return {
            status: true,
            value: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
        }
    }
    async deleteUser(email) {
        return true
    }
}
