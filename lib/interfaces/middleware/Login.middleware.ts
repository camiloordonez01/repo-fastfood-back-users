import { Request, Response, NextFunction } from 'express'
import Joi from 'joi'

import { logger, ErrorHandler } from '../../shared/infrastructure/handler'

import messages from '../../../messages'
import { validateRequired } from '../../shared/messages'
import regexs from '../../shared/regexs'

/**
 * Validate the information when login
 *
 * @author camilo.ordonez
 *
 */
const LoginMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().pattern(regexs.REGEX_PASSWORD).required(),
        })

        // schema options
        const options = {
            abortEarly: false, // include all errors
            allowUnknown: true, // ignore unknown props
            stripUnknown: true, // remove unknown props
        }

        // validate request body against schema
        const { error } = schemaBody.validate(req.body, options)

        const messagesError: string[] = []
        error?.details.forEach((element) => {
            switch (element.context?.key) {
                case 'email':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('Correo electrónico'))
                    } else if (element.type === 'string.email') {
                        messagesError.push(messages.EMAIL_INVALID)
                    }
                    break
                case 'password':
                    if (element.type === 'any.required') {
                        messagesError.push(validateRequired('Contraseña'))
                    } else if (element.type === 'string.pattern.base') {
                        messagesError.push(messages.PASSWORD_INVALID)
                    }
                    break
            }
        })

        if (messagesError.length > 0) {
            // on fail return comma separated errors
            throw new ErrorHandler(400, messagesError[0])
        }
        next()
    } catch (error) {
        if (error instanceof Error) {
            logger.crit({
                level: 'crit',
                file: 'LoginMiddleware.ts',
                message: `${error.message}`,
                stack: error.stack,
            })
        }
        next(error)
    }
}
export default LoginMiddleware
