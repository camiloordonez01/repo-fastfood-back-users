import StorageMysql from '../../../shared/interfaces/storage/StorageMysql'

import { UserModel } from '../../../infrastructure/database/models/typeorm'
import { UserEntity } from '../../../domain/entities'

class UserStorage extends StorageMysql {
    constructor() {
        super(UserModel)
    }

    async getUserByEmail(email: string) {
        const user = await this.repository.findOneBy({ email })

        return new UserEntity(user as UserEntity)
    }
}

export default UserStorage
