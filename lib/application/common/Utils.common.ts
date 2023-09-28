import jwt from 'jsonwebtoken'
import { ObjectLiteral } from '../../shared/application/common/types'

import { keyEncript } from '../../../keys'

/**
 * Get token
 *
 * @author camilo.ordonez
 *
 */
export const getToken = (data: ObjectLiteral, expiresIn = 3600) => {
    return jwt.sign(data, keyEncript, { expiresIn })
}
