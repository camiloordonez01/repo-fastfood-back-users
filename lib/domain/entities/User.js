class UserEntity {
    constructor({
        idUser,
        uidUser,
        email,
        username,
        verified,
        personId,
        activeRow,
        createdAt,
        updatedAt,
    }) {
        this.idUser = idUser
        this.uidUser = uidUser
        this.email = email
        this.username = username
        this.verified = verified
        this.personId = personId
        this.activeRow = activeRow
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

module.exports = { UserEntity }
