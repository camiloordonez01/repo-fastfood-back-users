const commonMessages = require('../../../shared/messages')

const ResendCode = require('../ResendCode')

jest.mock('../../../infrastructure/externalRepository')

describe('ResendCode', () => {
    it('Código reenviado exitosamente', async () => {
        const response = await ResendCode('orarjuan@mail.com')
        expect(response).toEqual(true)
    })
    it('Error', async () => {
        await expect(ResendCode('orarjuan@gmail.com')).rejects.toThrow(
            commonMessages.UNEXPECTED_ERROR
        )
    })
})
