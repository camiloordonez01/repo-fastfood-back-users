const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')
const {
    modelColumnDefault,
    columnIdDefault,
    columnUserUid,
} = require('../../../shared/objects/models')

const Person = sequelize.define(
    'Person',
    {
        idPerson: columnIdDefault('id_person'),
        userUid: columnUserUid,
        firstName: {
            type: DataTypes.STRING(45),
            field: 'first_name',
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(45),
            field: 'last_name',
            allowNull: false,
        },
        documentType: {
            type: DataTypes.STRING(45),
            field: 'document_type',
            allowNull: true,
        },
        document: {
            type: DataTypes.STRING(45),
            field: 'document',
            allowNull: true,
        },
        phone: {
            type: DataTypes.STRING(15),
            field: 'phone',
            allowNull: true,
        },
        birthday: {
            type: DataTypes.DATE,
            field: 'birthday',
            allowNull: true,
        },
        gender: {
            type: DataTypes.ENUM,
            field: 'gender',
            values: ['M', 'W'],
            allowNull: true,
        },
        ...modelColumnDefault,
    },
    {
        sequelize,
        tableName: 'tbl_persons',
        timestamps: false,
    }
)

module.exports = { Person }
