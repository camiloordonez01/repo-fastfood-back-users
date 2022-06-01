class EstablishmentRepository {
    constructor(repository) {
        this.repository = repository
    }

    getEstablishmentsByList(list) {
        return this.repository.getEstablishmentsByList(list)
    }
}

module.exports = { EstablishmentRepository }
