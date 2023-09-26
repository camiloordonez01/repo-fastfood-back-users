import { IEntityRowsDefault } from './types'

class UserEntity implements IEntityRowsDefault {
    idUser?: number
    uidUser: string
    email: string
    username?: string
    password: string
    verified: number
    personId: number
    activeRow?: number
    createdAt?: string
    updatedAt?: string

    constructor(userEntity: UserEntity) {
        this.idUser = userEntity.idUser
        this.uidUser = userEntity.uidUser
        this.email = userEntity.email
        this.username = userEntity.username
        this.password = userEntity.password
        this.verified = userEntity.verified
        this.personId = userEntity.personId
        this.activeRow = userEntity.activeRow
        this.createdAt = userEntity.createdAt
        this.updatedAt = userEntity.updatedAt
    }
}

export default UserEntity
