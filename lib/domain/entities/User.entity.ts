import Entity from '../../shared/domain/entities/Entity'
import { EntityRowsDefault } from './types'

class UserEntity extends Entity implements EntityRowsDefault {
    userId?: number
    name: string
    lastName: string
    email: string
    password: string
    username?: string

    constructor(userEntity: UserEntity) {
        super(userEntity)
        this.userId = userEntity.userId
        this.name = userEntity.name
        this.lastName = userEntity.lastName
        this.email = userEntity.email
        this.username = userEntity.username
        this.password = userEntity.password
    }
}

export default UserEntity
