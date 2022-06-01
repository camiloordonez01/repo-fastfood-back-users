const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')

const { Company } = require('./Company')

const {
    modelColumnDefault,
    columnIdDefault,
    columnCompanyUid,
} = require('../../../shared/objects/models')

const Establishment = sequelize.define(
    'Establishment',
    {
        idEstablishment: columnIdDefault('id_establishment'),
        name: {
            type: DataTypes.STRING(45),
            field: 'name',
            allowNull: false,
        },
        departmentCode: {
            type: DataTypes.STRING(45),
            field: 'department_code',
            allowNull: false,
        },
        cityCode: {
            type: DataTypes.STRING(45),
            field: 'city_code',
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING(255),
            field: 'address',
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(45),
            field: 'phone',
            allowNull: true,
        },
        isCentral: {
            type: DataTypes.ENUM,
            field: 'is_central',
            values: ['0', '1'],
            defaultValue: '0',
            allowNull: false,
        },
        companyUid: {
            ...columnCompanyUid,
            references: {
                model: Company,
                key: 'uidCompany',
            },
        },
        ...modelColumnDefault,
    },
    {
        sequelize,
        tableName: 'tbl_establishments',
        timestamps: false,
    }
)

Company.hasMany(Establishment, {
    foreignKey: 'companyUid',
    sourceKey: 'uidCompany',
})
Establishment.belongsTo(Company, {
    foreignKey: 'companyUid',
    targetKey: 'uidCompany',
})

module.exports = { Establishment }
