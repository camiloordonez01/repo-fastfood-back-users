import md5 from 'md5'

import { getToken } from '../common/Utils.common'

import { UserRepository } from '../../domain/repositories'

import { UserStorage } from '../../interfaces/storage/mysql'
import { ErrorHandler } from '../../shared/infrastructure/handler'
import messages from '../../../messages'

const userReporitory = new UserRepository(new UserStorage())

export default async (email: string, password: string) => {
    const user = await userReporitory.getUserByEmail(email)
    if (!user || md5(password) !== user.password) {
        throw new ErrorHandler(400, messages.LOGIN_INVALID)
    }

    const { name, lastName } = user
    return getToken({name, lastName})
}
