const messages = require('../../../../messages')
const SignUp = require('../SignUp')

jest.mock('../../../interfaces/storage')
jest.mock('../../../infrastructure/externalRepository')
jest.mock('../../../shared/application/common/Utils')
jest.mock('../../../shared/infrastructure/database')

describe('SignUp', () => {
    it('Registro exitoso', async () => {
        const response = await SignUp({
            firstName: 'Juan Camilo',
            lastName: 'Ordoñez Arbelaez',
            email: 'orarjuan@hotmail.com',
            password: '12345678',
        })
        expect(response).toEqual(true)
    })
    it('Error: El usuario ya se encuentra en la base de datos', async () => {
        await expect(
            SignUp({
                firstName: 'Juan Camilo',
                lastName: 'Ordoñez Arbelaez',
                email: 'orarjuan@gmail.com',
                password: '12345678',
            })
        ).rejects.toThrow(messages.USER_EXISTING)
    })
    it('Error: El usuario ya se encuentra en cognito', async () => {
        await expect(
            SignUp({
                firstName: 'Juan',
                lastName: 'Ordoñez Arbelaez',
                email: 'orarjuan@hotmail.com',
                password: '12345678',
            })
        ).rejects.toThrow(messages.USER_EXISTING)
    })
    it('Error: No se pudo crear el usuario', async () => {
        await expect(
            SignUp({
                firstName: 'Juan Camilo',
                lastName: 'Ordoñez Arbelaez',
                email: 'orarjuan@yahoo.com',
                password: '12345678',
            })
        ).rejects.toThrow(messages.USER_EXISTING)
    })
    it('Error: No se pudo crear la persona', async () => {
        await expect(
            SignUp({
                firstName: 'Juan Camilo',
                lastName: 'Arbelaez',
                email: 'orarjuan@hotmail.com',
                password: '12345678',
            })
        ).rejects.toThrow(messages.USER_EXISTING)
    })
})
