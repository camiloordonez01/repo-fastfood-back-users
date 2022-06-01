const messages = require('../../../../messages')

module.exports = class {
    async getEstablishmentsByList(list) {
        return [
            {
                idEstablishment: 1,
                name: 'zonarosa',
                departmentCode: 'VALLE',
                cityCode: 'CARTAGO',
                address: 'Calle 30',
                phone: '3104564933',
                isCentral: '1',
                companyUid: '1234',
                Company: {
                    name: 'burgerpaisa',
                    logo: null,
                },
            },
            {
                idEstablishment: 2,
                name: 'la20',
                departmentCode: 'VALLE',
                cityCode: 'CARTAGO',
                address: 'Calle 20',
                phone: '3127664897',
                isCentral: '0',
                companyUid: '1234',
                Company: {
                    name: 'burgerpaisa',
                    logo: null,
                },
            },
            {
                idEstablishment: 3,
                name: 'Punto 1',
                departmentCode: 'VALLE',
                cityCode: 'CARTAGO',
                address: 'Calle 10',
                phone: '3046230357',
                isCentral: '1',
                companyUid: '4321',
                Company: {
                    name: 'hotdogpaisa',
                    logo: null,
                },
            },
        ]
    }
}
