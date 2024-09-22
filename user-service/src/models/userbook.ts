import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/mssql'

export interface UserBookProperties {
    id: number
    userId: number
    bookId: number
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    state: number
    userScore: number
}

class UserBook extends Model<UserBookProperties> implements UserBookProperties {
    public id!: number
    public userId!: number
    public bookId!: number
    public createdAt!: Date
    public updatedAt!: Date
    public isActive!: boolean
    public state!: number
    public userScore!: number
}

UserBook.init({
    id: {
        type: DataTypes.NUMBER,
        autoIncrement: true,
        primaryKey: true,
        field: 'Id'
    },
    userId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'UserId'
    },
    bookId: {
        type: DataTypes.NUMBER,
        allowNull: false,
        field: 'BookId'
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
    userScore: {
        type: DataTypes.NUMBER,
        defaultValue: -1,
        field: 'UserScore'
    },
    state: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
        field: 'State'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        field: 'IsActive'
    }
}, {
    sequelize,
    tableName: 'UserBook',
    timestamps: false
})

export default UserBook