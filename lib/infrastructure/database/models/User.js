const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')
const {
    modelColumnDefault,
    columnIdDefault,
} = require('../../../shared/objects/models')

const User = sequelize.define(
    'User',
    {
        idUser: columnIdDefault('id_user'),
        uidUser: {
            type: DataTypes.STRING(100),
            field: 'uid_user',
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(45),
            field: 'username',
            allowNull: true,
        },
        verified: {
            type: DataTypes.ENUM,
            field: 'verified',
            values: ['0', '1'],
            defaultValue: '0',
            allowNull: false,
        },
        ...modelColumnDefault,
    },
    {
        sequelize,
        tableName: 'tbl_users',
        timestamps: false,
    }
)

module.exports = { User }
