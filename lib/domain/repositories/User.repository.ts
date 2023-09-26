import { IUserStorage } from '../../interfaces/storage/types'
import Repository from './Repository'

class UserRepository extends Repository {
    protected storage: IUserStorage
    constructor(userStorage: IUserStorage) {
        super(userStorage)
        this.storage = userStorage
    }

    getUserByEmail(email: string) {
        return this.storage.getUserByEmail(email)
    }
}

export default UserRepository
