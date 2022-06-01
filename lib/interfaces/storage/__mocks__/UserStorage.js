const messages = require('../../../../messages')

module.exports = class {
    async getUserByEmail(email) {
        if (
            email === 'orarjuan@hotmail.com' ||
            email === 'orarjuan@yahoo.com'
        ) {
            return null
        }

        if (email === 'orarjuan@mail.com') {
            return {
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                email: 'orarjuan@mail.com',
                username: null,
                verified: 1,
                activeRow: '1',
                createdAt: '2022-05-26T17:43:31.000Z',
                updatedAt: '2022-05-26T17:43:31.000Z',
            }
        }

        if (email === 'orarjuan@codeused.com') {
            return {
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                email: 'orarjuan@codeused.com',
                username: null,
                verified: 0,
                activeRow: '1',
                createdAt: '2022-05-26T17:43:31.000Z',
                updatedAt: '2022-05-26T17:43:31.000Z',
            }
        }

        if (email === 'orarjuan@codeexpired.com') {
            return {
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                email: 'orarjuan@codeexpired.com',
                username: null,
                verified: 0,
                activeRow: '1',
                createdAt: '2022-05-26T17:43:31.000Z',
                updatedAt: '2022-05-26T17:43:31.000Z',
            }
        }

        if (email === 'orarjuan@errorupdate.com') {
            return {
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f84d',
                email: 'orarjuan@errorupdate.com',
                username: null,
                verified: 0,
                activeRow: '1',
                createdAt: '2022-05-26T17:43:31.000Z',
                updatedAt: '2022-05-26T17:43:31.000Z',
            }
        }

        return {
            idUser: 5,
            uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83g',
            email: 'orarjuan@gmail.com',
            username: null,
            verified: 0,
            activeRow: '1',
            createdAt: '2022-05-26T17:43:31.000Z',
            updatedAt: '2022-05-26T17:43:31.000Z',
        }
    }

    async createUser(user) {
        if (user.email === 'orarjuan@yahoo.com') {
            return {
                status: false,
                value: messages.USER_EXISTING,
            }
        }
        return {
            status: true,
            value: {
                verified: '0',
                activeRow: '1',
                createdAt: { val: 'CURRENT_TIMESTAMP' },
                updatedAt: { val: 'CURRENT_TIMESTAMP' },
                idUser: 5,
                uidUser: '3c131f38-564a-4d2a-884c-42eb8bc9f83d',
                email: 'orarjuan@hotmail.com',
                username: undefined,
            },
        }
    }
    async updateUserById(uid) {
        if (uid === '3c131f38-564a-4d2a-884c-42eb8bc9f84d') {
            return {
                status: false,
            }
        }
        return {
            status: true,
        }
    }
    async getUserRolesByUid(uidUser) {
        if (uidUser === '3c131f38-564a-4d2a-884c-42eb8bc9f83g') {
            return {
                Roles: undefined,
            }
        }
        return {
            Roles: [
                {
                    name: 'dueño',
                    code: 'DUEÑO',
                    superAdmin: 1,
                    UserRelationship: {
                        establishmentId: 1,
                    },
                },
                {
                    name: 'cajero',
                    code: 'CAJERO',
                    superAdmin: 0,
                    UserRelationship: {
                        establishmentId: 2,
                    },
                },
                {
                    name: 'administrador',
                    code: 'ADMIN',
                    superAdmin: 1,
                    UserRelationship: {
                        establishmentId: 3,
                    },
                },
                {
                    name: 'mesero',
                    code: 'MESERO',
                    superAdmin: 0,
                    UserRelationship: {
                        establishmentId: 3,
                    },
                },
            ],
        }
    }
}
