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
    bookName: string
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
    public bookName!: string
}

UserBook.init({
    id: {
        type: DataTypes.NUMBER,
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'CreatedAt'
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'UpdatedAt'
    },
    userScore: {
        type: DataTypes.NUMBER,
        field: 'UserScore'
    },
    state: {
        type: DataTypes.NUMBER,
        defaultValue: 1,
        field: 'State'
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: 1,
        field: 'IsActive'
    },
    bookName: {
        type: DataTypes.STRING(255),
        allowNull: false,
        field: 'BookName'
    },
}, {
    sequelize,
    tableName: 'UserBook',
    timestamps: false
})

export default UserBook