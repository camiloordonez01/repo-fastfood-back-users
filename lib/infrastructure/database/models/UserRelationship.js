const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')

const { columnIdDefault } = require('../../../shared/objects/models')

const { User } = require('./User')
const { Role } = require('./Role')
const { Establishment } = require('./Establishment')

const UserRelationship = sequelize.define(
    'UserRelationship',
    {
        idUserRelationship: columnIdDefault('id_users_relationship'),
        userUid: {
            type: DataTypes.STRING(100),
            field: 'user_uid',
            allowNull: false,
            references: {
                model: User,
                key: 'uid_user',
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
        roleCode: {
            type: DataTypes.STRING(45),
            field: 'role_code',
            allowNull: false,
            references: {
                model: Role,
                key: 'code',
            },
        },
    },
    {
        sequelize,
        tableName: 'tbl_users_relationship',
        timestamps: false,
    }
)

User.belongsToMany(Role, {
    through: UserRelationship,
    foreignKey: 'userUid',
    sourceKey: 'uidUser',
})
Role.belongsToMany(User, {
    through: UserRelationship,
    foreignKey: 'roleCode',
    sourceKey: 'code',
})

module.exports = { UserRelationship }
