const messages = require('../../../messages')
const { getExpirationDate } = require('../common/Utils')
const { encryptFunction } = require('../../shared/application/common/Utils')

const { Logger } = require('../../shared/infrastructure/logger')
const { ErrorHandler } = require('../../shared/infrastructure/handler')

const {
    UserRepository,
    EstablishmentRepository,
    PersonRepository,
} = require('../../domain/repositories')
const {
    UserStorage,
    EstablishmentStorage,
    PersonStorage,
} = require('../../interfaces/storage')

const { AwsCognito } = require('../../infrastructure/externalRepository')

const awsCognito = new AwsCognito()
const userRepository = new UserRepository(new UserStorage())
const establishmentRepository = new EstablishmentRepository(
    new EstablishmentStorage()
)
const personRepository = new PersonRepository(new PersonStorage())
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

        let companies = []

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

            let data = {}
            Roles.map((rol) => {
                const searchEstablisnment = establishments.find(
                    (element) =>
                        element.idEstablishment ===
                        rol.UserRelationship.establishmentId
                )
                data = !data[searchEstablisnment.companyUid]
                    ? {
                          ...data,
                          [searchEstablisnment.companyUid]: {
                              uid: searchEstablisnment.companyUid,
                              name: searchEstablisnment.Company.name,
                              logo: searchEstablisnment.Company.logo,
                              establishments: {
                                  [searchEstablisnment.idEstablishment]: {
                                      id: searchEstablisnment.idEstablishment,
                                      name: searchEstablisnment.name,
                                      isCentral: searchEstablisnment.isCentral,
                                      roles: [
                                          {
                                              name: rol.name,
                                              code: rol.code,
                                              superAdmin: rol.superAdmin,
                                          },
                                      ],
                                  },
                              },
                          },
                      }
                    : {
                          ...data,
                          [searchEstablisnment.companyUid]: {
                              ...data[searchEstablisnment.companyUid],
                              establishments: {
                                  ...data[searchEstablisnment.companyUid]
                                      .establishments,
                                  [searchEstablisnment.idEstablishment]: !data[
                                      searchEstablisnment.companyUid
                                  ].establishments[
                                      searchEstablisnment.idEstablishment
                                  ]
                                      ? {
                                            id: searchEstablisnment.idEstablishment,
                                            name: searchEstablisnment.name,
                                            isCentral:
                                                searchEstablisnment.isCentral,
                                            roles: [
                                                {
                                                    name: rol.name,
                                                    code: rol.code,
                                                    superAdmin: rol.superAdmin,
                                                },
                                            ],
                                        }
                                      : {
                                            ...data[
                                                searchEstablisnment.companyUid
                                            ].establishments[
                                                searchEstablisnment
                                                    .idEstablishment
                                            ],
                                            roles: [
                                                ...data[
                                                    searchEstablisnment
                                                        .companyUid
                                                ].establishments[
                                                    searchEstablisnment
                                                        .idEstablishment
                                                ].roles,
                                                {
                                                    name: rol.name,
                                                    code: rol.code,
                                                    superAdmin: rol.superAdmin,
                                                },
                                            ],
                                        },
                              },
                          },
                      }
            })

            companies = Object.values(data).map((element) => ({
                ...element,
                establishments: Object.values(element.establishments),
            }))
        }

        const { AccessToken, RefreshToken, ExpiresIn } = auth.value
        const uidUserEncrypt = await encryptFunction(foundUser.uidUser)

        const { firstName, lastName } = await personRepository.getPerson(
            foundUser.personId
        )

        return {
            AccessToken,
            RefreshToken,
            Expiration: getExpirationDate(ExpiresIn),
            Companies: companies,
            UidUser: uidUserEncrypt,
            userData: {
                firstName,
                lastName,
            },
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
