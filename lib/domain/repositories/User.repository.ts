import { UserStorage } from '../../interfaces/storage/types'
import Repository from './Repository'

class UserRepository extends Repository {
    protected storage: UserStorage
    constructor(userStorage: UserStorage) {
        super(userStorage)
        this.storage = userStorage
    }

    getUserByEmail(email: string) {
        return this.storage.getUserByEmail(email)
    }
}

export default UserRepository
