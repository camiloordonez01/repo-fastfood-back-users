const { ResponseHandler } = require('../../shared/infrastructure/handler')

const { SignUp } = require('../../application/use_cases')

module.exports = {
    async signUp(req, _, next) {
        try {
            next(new ResponseHandler(201, await SignUp(req.body)))
        } catch (error) {
            next(error)
        }
    },
}
