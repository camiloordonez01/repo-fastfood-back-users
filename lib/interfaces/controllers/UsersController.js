const { ResponseHandler } = require('../../shared/infrastructure/handler')

const { SignUp, Verify, SignIn } = require('../../application/use_cases')

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
    async signIn(req, _, next) {
        try {
            const { email, password } = req.body
            next(new ResponseHandler(201, await SignIn(email, password)))
        } catch (error) {
            next(error)
        }
    },
}
