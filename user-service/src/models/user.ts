import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/mssql'

export interface UserProperties {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
}

class User extends Model<UserProperties> implements UserProperties {
    public id!: number
    public name!: string
    public createdAt!: Date
    public updatedAt!: Date
    public isActive!: boolean
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'Id'
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'Name'
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt'
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'UpdatedAt'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        field: 'IsActive'
    },
}, {
    sequelize,
    tableName: 'Users',
    timestamps: false
})

export default User