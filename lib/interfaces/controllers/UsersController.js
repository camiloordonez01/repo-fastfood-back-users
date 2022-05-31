const { ResponseHandler } = require('../../shared/infrastructure/handler')

const { SignUp, Verify } = require('../../application/use_cases')

module.exports = {
    async signUp(req, _, next) {
        try {
            next(new ResponseHandler(201, await SignUp(req.body)))
        } catch (error) {
            next(error)
        }
    },
    async verify(req, _, next) {
        try {
            next(new ResponseHandler(201, await Verify(req.body)))
        } catch (error) {
            next(error)
        }
    },
}
