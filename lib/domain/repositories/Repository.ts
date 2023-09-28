import { Storage } from '../../shared/interfaces/storage/types'

class Repository {
    protected storage: Storage
    constructor(userStorage: Storage) {
        this.storage = userStorage
    }

    save(entity: unknown) {
        return this.storage.save(entity)
    }

    update(id: number, entity: unknown) {
        return this.storage.update(id, entity)
    }
}

export default Repository
