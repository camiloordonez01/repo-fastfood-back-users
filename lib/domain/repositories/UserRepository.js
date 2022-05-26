class UserRepository {
    constructor(repository) {
        this.repository = repository
    }

    getUserByEmail(email) {
        return this.repository.getUserByEmail(email)
    }

    createUser(user, transaction) {
        return this.repository.createUser(user, transaction)
    }
}

module.exports = { UserRepository }
