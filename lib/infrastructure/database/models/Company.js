const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')

const { Person } = require('./Person')

const {
    modelColumnDefault,
    columnIdDefault,
} = require('../../../shared/objects/models')

const Company = sequelize.define(
    'Company',
    {
        idCompany: columnIdDefault('id_companies'),
        uidCompany: {
            type: DataTypes.STRING(100),
            field: 'uid_company',
            unique: true,
            allowNull: false,
        },
        ownerPerson: {
            type: DataTypes.INTEGER,
            field: 'owner_person',
            allowNull: false,
            references: {
                model: Person,
                key: 'idPerson',
            },
        },
        name: {
            type: DataTypes.STRING(45),
            field: 'name',
            unique: true,
            allowNull: false,
        },
        nit: {
            type: DataTypes.STRING(10),
            field: 'nit',
            unique: true,
            allowNull: true,
        },
        legalFormCode: {
            type: DataTypes.STRING(45),
            field: 'legal_form_code',
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(45),
            field: 'email',
            allowNull: true,
        },
        logo: {
            type: DataTypes.STRING(255),
            field: 'logo',
            allowNull: true,
        },
        ...modelColumnDefault,
    },
    {
        sequelize,
        tableName: 'tbl_companies',
        timestamps: false,
    }
)

Person.hasMany(Company, {
    foreignKey: 'ownerPerson',
})

module.exports = { Company }
