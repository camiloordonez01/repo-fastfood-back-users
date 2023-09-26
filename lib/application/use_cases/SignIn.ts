import { UserEntity } from '../../domain/entities'

import { UserRepository } from '../../domain/repositories'

import { UserStorage } from '../../interfaces/storage/mysql'

const userReporitory = new UserRepository(new UserStorage())

export default async (email: string, password: string) => {
    const user = new UserEntity({
        uidUser: '12345678',
        email: 'orarjuan2@hotmail.com',
        password: '12345678',
        personId: 1,
        verified: 1,
    })

    const result = await userReporitory.save(user)
    console.log(result)
    return true
}
