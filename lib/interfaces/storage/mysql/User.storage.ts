import StorageMysql from '../../../shared/interfaces/storage/StorageMysql'

import { UserModel } from '../../../infrastructure/database/models/typeorm'
import { UserEntity } from '../../../domain/entities'

class UserStorage extends StorageMysql {
    constructor() {
        super(UserModel)
    }

    async getUserByEmail(email: string) {
        const user = await this.repository.findOneBy({ email })

        return user ? new UserEntity(user as UserEntity) : user
    }
}

export default UserStorage
