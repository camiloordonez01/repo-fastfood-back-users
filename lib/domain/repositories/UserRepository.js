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

    updateUserById(uidUser, user, transaction) {
        return this.repository.updateUserById(uidUser, user, transaction)
    }

    getUserRolesByUid(uidUser) {
        return this.repository.getUserRolesByUid(uidUser)
    }
}

module.exports = { UserRepository }
