const messages = require('../../../../messages')
const commonMessages = require('../../../shared/messages')
const Verify = require('../Verify')

jest.mock('../../../interfaces/storage')
jest.mock('../../../infrastructure/externalRepository')
jest.mock('../../../shared/application/common/Utils')
jest.mock('../../../shared/infrastructure/database')

describe('Verify', () => {
    it('Verificación exitosa', async () => {
        const response = await Verify({
            email: 'orarjuan@mailito.com',
            code: '003025',
        })
        expect(response).toEqual(true)
    })
    it('Error: El usuario no se encuentra en la base de datos', async () => {
        await expect(
            Verify({
                email: 'orarjuan@hotmail.com',
                code: '003025',
            })
        ).rejects.toThrow(messages.USER_NOT_EXISTING)
    })
    it('Error: El usuario ya se encuentra verificado', async () => {
        await expect(
            Verify({
                email: 'orarjuan@mail.com',
                code: '003025',
            })
        ).rejects.toThrow(messages.USER_ALREADY_VERIFIED)
    })
    it('Error: El código de verificación ya fue usado', async () => {
        await expect(
            Verify({
                email: 'orarjuan@codeused.com',
                code: '003025',
            })
        ).rejects.toThrow(messages.USER_CODE_INVALID)
    })
    it('Error: El código de verificación ha expirado', async () => {
        await expect(
            Verify({
                email: 'orarjuan@codeexpired.com',
                code: '003025',
            })
        ).rejects.toThrow(messages.USER_CODE_EXPIRED)
    })
    it('Error: Al actualizar el estado de verificación del usuario', async () => {
        await expect(
            Verify({
                email: 'orarjuan@errorupdate.com',
                code: '003025',
            })
        ).rejects.toThrow(commonMessages.UPDATE_ERROR)
    })
})
