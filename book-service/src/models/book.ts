import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../config/mssql'

export interface BookProperties {
    id: number
    name: string
    createdAt: Date
    updatedAt: Date
    isActive: boolean
    isBorrowed: boolean
    score: number
}

class Book extends Model<BookProperties> implements BookProperties {
    public id!: number
    public name!: string
    public createdAt!: Date
    public updatedAt!: Date
    public isActive!: boolean
    public isBorrowed!: boolean
    public score!: number
}

Book.init({
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
    isBorrowed: {
        type: DataTypes.BOOLEAN,
        defaultValue: 0,
        field: 'IsBorrowed'
    },
    score: {
        type: DataTypes.NUMBER,
        defaultValue: -1,
        field: 'Score'
    },
}, {
    sequelize,
    tableName: 'Books',
    timestamps: false
})

export default Book