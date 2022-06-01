const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')
const {
    modelColumnDefault,
    columnIdDefault,
} = require('../../../shared/objects/models')

const Role = sequelize.define(
    'Role',
    {
        idRole: columnIdDefault('id_Role'),
        name: {
            type: DataTypes.STRING(100),
            field: 'name',
            allowNull: false,
        },
        code: {
            type: DataTypes.STRING(45),
            field: 'code',
            unique: true,
            allowNull: false,
        },
        superAdmin: {
            type: DataTypes.ENUM,
            field: 'super_admin',
            values: ['0', '1'],
            defaultValue: '0',
            allowNull: false,
        },
        ...modelColumnDefault,
    },
    {
        sequelize,
        tableName: 'tbl_roles',
        timestamps: false,
    }
)

module.exports = { Role }
