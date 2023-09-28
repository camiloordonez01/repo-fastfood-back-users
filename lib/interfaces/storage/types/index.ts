import { UserEntity } from '../../../domain/entities'
import { Storage } from '../../../shared/interfaces/storage/types'

export interface UserStorage extends Storage {
    getUserByEmail: (email: string) => Promise<UserEntity | null>
}
