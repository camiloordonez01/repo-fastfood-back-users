const messages = require('../../../../messages')
const SignIn = require('../SignIn')

jest.mock('../../common/Utils')
jest.mock('../../../interfaces/storage')
jest.mock('../../../infrastructure/externalRepository')
jest.mock('../../../shared/application/common/Utils')
jest.mock('../../../shared/infrastructure/database')

describe('SignIn', () => {
    it('Inicio de sesión exitoso', async () => {
        const response = await SignIn('orarjuan@mail.com', '12345678')
        expect(response).toEqual({
            AccessToken:
                'eyJraWQiOiJDQTB5cjRTV0pDdzZKcjF5U1wvR0psbGRVYUFadUM2RjJXQzJPNEdmajIwTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmYmI4MmQyMy03NWU1LTQxZWEtYmViNy03MGFkMWFmMjE5MjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV95c2hUek1YOFgiLCJjbGllbnRfaWQiOiIyZWp1YnNodHNyOTBsM2tsbDBlYmZoczVmayIsIm9yaWdpbl9qdGkiOiI1NDQ5YWViZi1iY2YwLTQ0NDUtYmNiNi05NmE3ZThhMjRhZDMiLCJldmVudF9pZCI6Ijc2NzcxMWVjLWQxMDctNDI3OC1hNzA4LTcyYWEyYzc5OTVmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTQxMTk2NDYsImV4cCI6MTY1NDEyMzI0NiwiaWF0IjoxNjU0MTE5NjQ2LCJqdGkiOiJiYzIxZDRiNy02OGZhLTQ3ZDItYjI2My02ZGMyZWIwZmIyYmQiLCJ1c2VybmFtZSI6Im9yYXJqdWFuQGhvdG1haWwuY29tIn0.JHPR3OzxhBeJflANXKmTBL4pUn_ixBvbx7Z974fvYS84c3DrmPze6JoCAJrASScBwnw2GJDXWhduAbkCEP99Qegbn3thinoYNtEskDM1RxVYF6Tfuxx2O4-Kbtd-ZGV9v4gx4Cna4qCS_yd7psKare08G7iIkH_AQQ4rojCCcJ2airxA9ZpPJ8QsntUUNUMR2qTi-gEufXUulzSPyKmsvZaH9JAH8Ayd2sGTnliQTtD9M_kHACDgWdzdD6fo2M_DEsrextR2l8_ejGRx6yzHErtEeORMcr7z8JZhTIiUl0w8AJDPWnWwyW8chJOD0dou15UQSmSvdQdSYW-r8zM9pQ',
            RefreshToken:
                'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.xGOkMi9uOSJJJbd1Hmn1gVjTwUFuKfjRv1BzfXWD6sh0PW6td_fTh_vNn625kucq2cTKcRZ7Uh9lOoM5uRhjAf1UNzgiP98mz5Pf1SUygxNElcoIiYpjfDU8fq4ZSHkkgzd4q4X-HaxzwJypvDEVqG7AjmnSKF01LZT3oEOXmYkJOEt-7PqN3N7HJ9_7vYO-ZfxbaEZHFbNyIP-cAyB1D5heT-BYT6rqZhgsBGECtltV48zHp8Py6rId8JNtdTO5RT3LEt4OxwsME3jq005dyoEzfKrCwM8fjjexO0S38vKGyRrff1sbUrWJiP0A8-Zk0kedPseNpUPC9HMQs0LO4w.lVJbdNDXaIXmCH7i.YmkoRyswo-pXKiaBISU5PVGYkKIaJe1HpywyvF2OYDxnl-XPkoGAIyCMY6Y4pBX_QMExqEvRr1LWswCic3eAG-iUkXNWSH-_hna8hXwwBGTUa8rj7S9bxgjDrauyyqsDZ5CwncrHnAlbSIZPdrUGxhu0Mm2RnBsC7YARSwTgaiNk8a0VKLIc33gaCUqvIodPZtmwaNwzGf-9W-HkmNNzXY3EErNvVWpJMt5fey97pGRWt5Kn3Wg-nssZitTsSjEbmmrIX6FdIPKGBebadRDgq9M4fSCHMEbPdkRdctE9Cdt57TqrAb7HgNCnliFO9Fzm_p6Q-Ow0_KjT7WSQWvlUnWzSOBYRhAoPKUcMpKGi6gxhlW5lu9GS0uCzT3fSxVLn9QvDE0Snl6gc-5dta7MaSCz7WlcRoVhLCu_I-yQThc61kRCKmWT8VaryrC0LkggUSLuyj4a9p-CPFbIi5Zu0hLUoTQeuyK9S5mvo3e6vul_zM1u8vzVbk-GG4av4Lx6NWCVgrJu0pAA5U77t29qEGeMLh6Rh8N1GK1g5qJzYM45g7nxxVE-6SqO3FQ5dmn6pWJ4G6EkuX011ZAvx317DFnxfSFcMXAqOJEIrjuLGnTvju7V2s6oZB4Zeyb8DjdxMHpLLo90vh7zP6U7EkZXS4VNJDGxm2NTXaOHaQtmTUd-LdklP3Zu6ksdk63Af2SzpxizYWw9XBGyk4YbpPNVRsXVDnL1Z_PownWehy8SJpSK5vIMLecIYbzxEhyLl0PEv9qqyUf3KO7rjRe7ct6kiUOOvkkxCI0h3clBMOyDPyksCiId_K1vW2c9k6T300DBFOZakQayAKqrjJFdfAB7HX6aQCjQsiC1Yo0RAk-c8CjVhRxllvZ3L11VaQCoV3NCt1n5BgFy5y128ftHaE4hFhmwfThdAQ3f2mD4SF-WsuksDc8QHV4pQdQ70Qr4TKZDIThslCkSgNruVAzMdC1RKCiYC5GRLLBRB7K-cinQ4KaUlUXrImJZBlJiikLVe1ARWYAOoz0rcjYDSx_r2pViqslz4ODtzDw7Rcvdbe2ND6NKU8MkzpZfKbRTPV-7RMaf9RduPpfsCoVcbMm1-0Udmj1UmQO0GTrygp4ophKqHRLvyMk8qv18zOzbx1yRDJ4h5y0HQlymsTUap5DLJt8S2_tRzdQiw4XAAQmfAt_0orbslnxfD98-ZgH7h5lIy_cHeU-dBJZogXK4YMDGP_0l6MmpYB3XwSj8zylz-BUiugN5t3QNF3Ro5g9WfZ8nGTYDAyDXUc0c13KOEueD13K1BPR9iU3mi3LE.3NWGby4Jhqg3YfmpK9drZg',
            Expiration: '2022-02-22 15:41:53',
            Relations: [
                {
                    role: 'dueño',
                    roleCode: 'DUEÑO',
                    superAdmin: 1,
                    establishment: 'zonarosa',
                    departmentCode: 'VALLE',
                    cityCode: 'CARTAGO',
                    address: 'Calle 30',
                    phone: '3104564933',
                    company: 'burgerpaisa',
                    companyUid: '1234',
                    logo: null,
                },
                {
                    role: 'cajero',
                    roleCode: 'CAJERO',
                    superAdmin: 0,
                    establishment: 'la20',
                    departmentCode: 'VALLE',
                    cityCode: 'CARTAGO',
                    address: 'Calle 20',
                    phone: '3127664897',
                    company: 'burgerpaisa',
                    companyUid: '1234',
                    logo: null,
                },
                {
                    role: 'administrador',
                    roleCode: 'ADMIN',
                    superAdmin: 1,
                    establishment: 'Punto 1',
                    departmentCode: 'VALLE',
                    cityCode: 'CARTAGO',
                    address: 'Calle 10',
                    phone: '3046230357',
                    company: 'hotdogpaisa',
                    companyUid: '4321',
                    logo: null,
                },
                {
                    role: 'mesero',
                    roleCode: 'MESERO',
                    superAdmin: 0,
                    establishment: 'Punto 1',
                    departmentCode: 'VALLE',
                    cityCode: 'CARTAGO',
                    address: 'Calle 10',
                    phone: '3046230357',
                    company: 'hotdogpaisa',
                    companyUid: '4321',
                    logo: null,
                },
            ],
        })
    })
    it('Inicio de sesión exitoso 2', async () => {
        const response = await SignIn('orarjuan@mail2.com', '12345678')
        expect(response).toEqual({
            AccessToken:
                'eyJraWQiOiJDQTB5cjRTV0pDdzZKcjF5U1wvR0psbGRVYUFadUM2RjJXQzJPNEdmajIwTT0iLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJmYmI4MmQyMy03NWU1LTQxZWEtYmViNy03MGFkMWFmMjE5MjEiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV95c2hUek1YOFgiLCJjbGllbnRfaWQiOiIyZWp1YnNodHNyOTBsM2tsbDBlYmZoczVmayIsIm9yaWdpbl9qdGkiOiI1NDQ5YWViZi1iY2YwLTQ0NDUtYmNiNi05NmE3ZThhMjRhZDMiLCJldmVudF9pZCI6Ijc2NzcxMWVjLWQxMDctNDI3OC1hNzA4LTcyYWEyYzc5OTVmMyIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2NTQxMTk2NDYsImV4cCI6MTY1NDEyMzI0NiwiaWF0IjoxNjU0MTE5NjQ2LCJqdGkiOiJiYzIxZDRiNy02OGZhLTQ3ZDItYjI2My02ZGMyZWIwZmIyYmQiLCJ1c2VybmFtZSI6Im9yYXJqdWFuQGhvdG1haWwuY29tIn0.JHPR3OzxhBeJflANXKmTBL4pUn_ixBvbx7Z974fvYS84c3DrmPze6JoCAJrASScBwnw2GJDXWhduAbkCEP99Qegbn3thinoYNtEskDM1RxVYF6Tfuxx2O4-Kbtd-ZGV9v4gx4Cna4qCS_yd7psKare08G7iIkH_AQQ4rojCCcJ2airxA9ZpPJ8QsntUUNUMR2qTi-gEufXUulzSPyKmsvZaH9JAH8Ayd2sGTnliQTtD9M_kHACDgWdzdD6fo2M_DEsrextR2l8_ejGRx6yzHErtEeORMcr7z8JZhTIiUl0w8AJDPWnWwyW8chJOD0dou15UQSmSvdQdSYW-r8zM9pQ',
            RefreshToken:
                'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.xGOkMi9uOSJJJbd1Hmn1gVjTwUFuKfjRv1BzfXWD6sh0PW6td_fTh_vNn625kucq2cTKcRZ7Uh9lOoM5uRhjAf1UNzgiP98mz5Pf1SUygxNElcoIiYpjfDU8fq4ZSHkkgzd4q4X-HaxzwJypvDEVqG7AjmnSKF01LZT3oEOXmYkJOEt-7PqN3N7HJ9_7vYO-ZfxbaEZHFbNyIP-cAyB1D5heT-BYT6rqZhgsBGECtltV48zHp8Py6rId8JNtdTO5RT3LEt4OxwsME3jq005dyoEzfKrCwM8fjjexO0S38vKGyRrff1sbUrWJiP0A8-Zk0kedPseNpUPC9HMQs0LO4w.lVJbdNDXaIXmCH7i.YmkoRyswo-pXKiaBISU5PVGYkKIaJe1HpywyvF2OYDxnl-XPkoGAIyCMY6Y4pBX_QMExqEvRr1LWswCic3eAG-iUkXNWSH-_hna8hXwwBGTUa8rj7S9bxgjDrauyyqsDZ5CwncrHnAlbSIZPdrUGxhu0Mm2RnBsC7YARSwTgaiNk8a0VKLIc33gaCUqvIodPZtmwaNwzGf-9W-HkmNNzXY3EErNvVWpJMt5fey97pGRWt5Kn3Wg-nssZitTsSjEbmmrIX6FdIPKGBebadRDgq9M4fSCHMEbPdkRdctE9Cdt57TqrAb7HgNCnliFO9Fzm_p6Q-Ow0_KjT7WSQWvlUnWzSOBYRhAoPKUcMpKGi6gxhlW5lu9GS0uCzT3fSxVLn9QvDE0Snl6gc-5dta7MaSCz7WlcRoVhLCu_I-yQThc61kRCKmWT8VaryrC0LkggUSLuyj4a9p-CPFbIi5Zu0hLUoTQeuyK9S5mvo3e6vul_zM1u8vzVbk-GG4av4Lx6NWCVgrJu0pAA5U77t29qEGeMLh6Rh8N1GK1g5qJzYM45g7nxxVE-6SqO3FQ5dmn6pWJ4G6EkuX011ZAvx317DFnxfSFcMXAqOJEIrjuLGnTvju7V2s6oZB4Zeyb8DjdxMHpLLo90vh7zP6U7EkZXS4VNJDGxm2NTXaOHaQtmTUd-LdklP3Zu6ksdk63Af2SzpxizYWw9XBGyk4YbpPNVRsXVDnL1Z_PownWehy8SJpSK5vIMLecIYbzxEhyLl0PEv9qqyUf3KO7rjRe7ct6kiUOOvkkxCI0h3clBMOyDPyksCiId_K1vW2c9k6T300DBFOZakQayAKqrjJFdfAB7HX6aQCjQsiC1Yo0RAk-c8CjVhRxllvZ3L11VaQCoV3NCt1n5BgFy5y128ftHaE4hFhmwfThdAQ3f2mD4SF-WsuksDc8QHV4pQdQ70Qr4TKZDIThslCkSgNruVAzMdC1RKCiYC5GRLLBRB7K-cinQ4KaUlUXrImJZBlJiikLVe1ARWYAOoz0rcjYDSx_r2pViqslz4ODtzDw7Rcvdbe2ND6NKU8MkzpZfKbRTPV-7RMaf9RduPpfsCoVcbMm1-0Udmj1UmQO0GTrygp4ophKqHRLvyMk8qv18zOzbx1yRDJ4h5y0HQlymsTUap5DLJt8S2_tRzdQiw4XAAQmfAt_0orbslnxfD98-ZgH7h5lIy_cHeU-dBJZogXK4YMDGP_0l6MmpYB3XwSj8zylz-BUiugN5t3QNF3Ro5g9WfZ8nGTYDAyDXUc0c13KOEueD13K1BPR9iU3mi3LE.3NWGby4Jhqg3YfmpK9drZg',
            Expiration: '2022-02-22 15:41:53',
            Relations: [],
        })
    })
    it('Error: El usuario no se encuentra en la base de datos', async () => {
        await expect(SignIn('orarjuan@yahoo.com', '12345678')).rejects.toThrow(
            messages.LOGIN_INVALID
        )
    })
    it('Error: Error al authenticar en aws', async () => {
        await expect(
            SignIn('orarjuan@codeexpired.com', '12345678')
        ).rejects.toThrow(messages.LOGIN_INVALID)
    })
})
