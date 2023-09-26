import { IStorage } from '../../shared/interfaces/storage/types'

class Repository {
    protected storage: IStorage
    constructor(userStorage: IStorage) {
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
