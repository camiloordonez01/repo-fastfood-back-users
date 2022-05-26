class UserEntity {
    constructor({
        idUser,
        uidUser,
        email,
        username,
        verified,
        activeRow,
        createdAt,
        updatedAt,
    }) {
        this.idUser = idUser
        this.uidUser = uidUser
        this.email = email
        this.username = username
        this.verified = verified
        this.activeRow = activeRow
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

module.exports = { UserEntity }
