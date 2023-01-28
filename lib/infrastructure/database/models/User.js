const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../shared/infrastructure/database')

const { Person } = require('./Person')

const {
    modelColumnDefault,
    columnIdDefault,
} = require('../../../shared/objects/models')

const User = sequelize.define(
    'User',
    {
        idUser: {
            type: DataTypes.INTEGER,
            field: 'id_user',
            allowNull: false,
            autoIncrement: true,
        },
        uidUser: {
            type: DataTypes.STRING(100),
            field: 'uid_user',
            allowNull: false,
            primaryKey: true,
        },
        personId: {
            type: DataTypes.INTEGER,
            field: 'person_id',
            unique: true,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'email',
            unique: true,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING(45),
            field: 'username',
            unique: true,
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

Person.hasOne(User, {
    foreignKey: 'personId',
    sourceKey: 'idPerson',
})
User.belongsTo(Person, {
    foreignKey: 'personId',
    targetKey: 'idPerson',
})

module.exports = { User }
