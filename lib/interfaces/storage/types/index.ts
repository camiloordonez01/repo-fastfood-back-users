import { UserEntity } from '../../../domain/entities'
import { IStorage } from '../../../shared/interfaces/storage/types'

export interface IUserStorage extends IStorage {
    getUserByEmail: (email: string) => Promise<UserEntity>
}
