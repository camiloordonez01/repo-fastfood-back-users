import { EntityRowsDefault } from './types'

class UserEntity implements EntityRowsDefault {
    userId?: number
    name: string
    lastName: string
    email: string
    password: string
    activeRow?: number
    createdAt?: string
    updatedAt?: string
    username?: string

    constructor(userEntity: UserEntity) {
        this.userId = userEntity.userId
        this.name = userEntity.name
        this.lastName = userEntity.lastName
        this.email = userEntity.email
        this.username = userEntity.username
        this.password = userEntity.password
        this.activeRow = userEntity.activeRow
        this.createdAt = userEntity.createdAt
        this.updatedAt = userEntity.updatedAt
    }
}

export default UserEntity
