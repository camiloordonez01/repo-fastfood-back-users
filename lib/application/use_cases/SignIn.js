const messages = require('../../../messages')
const { getExpirationDate } = require('../common/Utils')
const { encryptFunction } = require('../../shared/application/common/Utils')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

const {
    UserRepository,
    EstablishmentRepository,
} = require('../../domain/repositories')
const {
    UserStorage,
    EstablishmentStorage,
} = require('../../interfaces/storage')

const { AwsCognito } = require('../../infrastructure/externalRepository')

const awsCognito = new AwsCognito()
const userRepository = new UserRepository(new UserStorage())
const establishmentRepository = new EstablishmentRepository(
    new EstablishmentStorage()
)
/**
 * Execute the business rules to Sign In
 *
 * @author camilo.ordonez
 *
 */
module.exports = async (email, password) => {
    try {
        const foundUser = await userRepository.getUserByEmail(email)

        if (foundUser === null) {
            throw new ErrorHandler(401, messages.LOGIN_INVALID)
        }

        //* Logging with aws cognito client
        const auth = await awsCognito.authUser(email, password)

        if (!auth.status) {
            throw new ErrorHandler(auth.code, auth.value)
        }

        let listRelations = []

        //* Obtains the user's relationships with the companies
        const { Roles } = await userRepository.getUserRolesByUid(
            foundUser.uidUser
        )

        //? Assess if you have any role
        if (Roles) {
            const listIdEstablishment = Roles.map(
                (item) => item.UserRelationship.establishmentId
            )

            //* Get the data of each relationship with establishments and your company
            const establishments =
                await establishmentRepository.getEstablishmentsByList(
                    listIdEstablishment
                )

            //* Cross the information of roles with the establishments
            listRelations = Roles.map((item) => {
                const searchEstablisnment = establishments.find(
                    (element) =>
                        element.idEstablishment ===
                        item.UserRelationship.establishmentId
                )
                return {
                    role: item.name,
                    roleCode: item.code,
                    superAdmin: item.superAdmin,
                    establishment: searchEstablisnment.name,
                    departmentCode: searchEstablisnment.departmentCode,
                    cityCode: searchEstablisnment.cityCode,
                    address: searchEstablisnment.address,
                    phone: searchEstablisnment.phone,
                    company: searchEstablisnment.Company.name,
                    companyUid: searchEstablisnment.companyUid,
                    logo: searchEstablisnment.Company.logo,
                }
            })
        }

        const { AccessToken, RefreshToken, ExpiresIn } = auth.value
        const uidUserEncrypt = await encryptFunction(foundUser.uidUser)

        return {
            AccessToken,
            RefreshToken,
            Expiration: getExpirationDate(ExpiresIn),
            Relations: listRelations,
            UidUser: uidUserEncrypt,
        }
    } catch (error) {
        Logger.crit({
            level: 'crit',
            file: 'SignIn.js',
            message: `${error.message}`,
            stack: error.stack,
        })
        return Promise.reject(error)
    }
}
