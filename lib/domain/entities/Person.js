class PersonEntity {
    constructor({
        idPerson,
        firstName,
        lastName,
        documentType,
        document,
        phone,
        birthday,
        gender,
        activeRow,
        createdAt,
        updatedAt,
    }) {
        this.idPerson = idPerson
        this.firstName = firstName
        this.lastName = lastName
        this.documentType = documentType
        this.document = document
        this.phone = phone
        this.birthday = birthday
        this.gender = gender
        this.activeRow = activeRow
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}

module.exports = { PersonEntity }
