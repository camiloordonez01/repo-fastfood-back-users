class PersonRepository {
    constructor(repository) {
        this.repository = repository
    }

    createPerson(person, transaction) {
        return this.repository.createPerson(person, transaction)
    }
}

module.exports = { PersonRepository }
