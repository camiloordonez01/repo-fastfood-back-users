import { Request, Response, NextFunction } from 'express'
import { logger, ResponseHandler } from '../../shared/infrastructure/handler'

import { SignIn } from '../../application/use_cases'

const file = 'Users.controller.ts'
export const signIn = async (req: Request, res: Response, next: NextFunction) => {
    try {
        interface BodyInterface {
            email: string
            password: string
        }
        const { email, password }: BodyInterface = req.body

        next(new ResponseHandler(201, await SignIn(email, password)))
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file,
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}
