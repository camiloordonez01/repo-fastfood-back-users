const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')

const { columnIdDefault } = require('../../../shared/objects/models')

const { Establishment } = require('./Establishment')
const { Role } = require('./Role')

const RoleEstablishment = sequelize.define(
    'RoleEstablishment',
    {
        idRolesEstablishment: columnIdDefault('id_roles_establishment'),
        roleCode: {
            type: DataTypes.STRING(45),
            field: 'role_code',
            allowNull: false,
            references: {
                model: Role,
                key: 'code',
            },
        },
        establishmentId: {
            type: DataTypes.INTEGER,
            field: 'establishment_id',
            allowNull: false,
            references: {
                model: Establishment,
                key: 'id_establishment',
            },
        },
    },
    {
        sequelize,
        tableName: 'tbl_roles_establishment',
        timestamps: false,
    }
)

Establishment.belongsToMany(Role, {
    through: RoleEstablishment,
    foreignKey: 'establishmentId',
    sourceKey: 'idEstablishment',
})
Role.belongsToMany(Establishment, {
    through: RoleEstablishment,
    foreignKey: 'roleCode',
    sourceKey: 'code',
})

module.exports = { RoleEstablishment }
