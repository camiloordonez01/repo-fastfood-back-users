const Joi = require('joi')

const messages = require('../../../messages')
const commonMessages = require('../../shared/messages')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

/**
 * Validate the information when verifying the record
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (req, res, next) => {
    try {
        // create schema object
        const schemaBody = Joi.object({
            code: Joi.string().min(3).max(6).required(),
            email: Joi.string().email().required(),
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
        error?.details.forEach((element) => {
            switch (element.context.key) {
                case 'code':
                    if (element.type === 'any.required') {
                        messagesError.push(
                            commonMessages.VALIDATE_REQUIRED('Código')
                        )
                    } else if (
                        element.type === 'string.min' ||
                        element.type === 'string.max'
                    ) {
                        messagesError.push(
                            commonMessages.VALIDATE_LENGTH('Código', 3, 6)
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
            file: 'VerifyMiddleware.ts',
            message: `${error.message}`,
            stack: error.stack,
        })
        next(error)
    }
}
