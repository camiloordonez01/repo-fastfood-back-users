const Joi = require('joi')

const messages = require('../../../messages')
const commonMessages = require('../../shared/messages')
const regexs = require('../../shared/regexs')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

/**
 * Validate the information when signUp
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (req, res, next) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            firstName: Joi.string().alphanum().min(3).max(50).required(),
            lastName: Joi.string().min(3).max(50).required(),
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

        const messagesError = []
        error.details.forEach((element) => {
            switch (element.context.key) {
                case 'firstName':
                    if (element.type === 'any.required') {
                        messagesError.push(
                            commonMessages.VALIDATE_REQUIRED('Nombres')
                        )
                    } else if (
                        element.type === 'string.min' ||
                        element.type === 'string.max'
                    ) {
                        messagesError.push(
                            commonMessages.VALIDATE_LENGTH('Nombres', 3, 50)
                        )
                    }
                    break
                case 'lastName':
                    if (element.type === 'any.required') {
                        messagesError.push(
                            commonMessages.VALIDATE_REQUIRED('Apellidos')
                        )
                    } else if (
                        element.type === 'string.min' ||
                        element.type === 'string.max'
                    ) {
                        messagesError.push(
                            commonMessages.VALIDATE_LENGTH('Apellidos', 3, 50)
                        )
                    }
                    break
                case 'email':
                    if (element.type === 'any.required') {
                        messagesError.push(
                            commonMessages.VALIDATE_REQUIRED(
                                'Correo electrónico'
                            )
                        )
                    } else if (element.type === 'string.email') {
                        messagesError.push(messages.EMAIL_INVALID)
                    }
                    break
                case 'password':
                    if (element.type === 'any.required') {
                        messagesError.push(
                            commonMessages.VALIDATE_REQUIRED('Contraseña')
                        )
                    } else if (element.type === 'string.pattern.base') {
                        messagesError.push(messages.PASSWORD_INVALID)
                    }
                    break
            }
        })

        if (messagesError.length > 0) {
            // on fail return comma separated errors
            throw new ErrorHandler(400, messagesError)
        }
        next()
    } catch (error) {
        Logger.crit({
            level: 'crit',
            file: 'SignUpMiddleware.ts',
            message: `${error.message}`,
            stack: error.stack,
        })
        next(error)
    }
}
