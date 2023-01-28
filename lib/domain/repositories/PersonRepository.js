class PersonRepository {
    constructor(repository) {
        this.repository = repository
    }

    getPerson(idPerson) {
        return this.repository.getPerson(idPerson)
    }

    createPerson(person, transaction) {
        return this.repository.createPerson(person, transaction)
    }
}

module.exports = { PersonRepository }
