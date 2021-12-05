const sequelize = require('../database')
const { DataTypes, Model } = require('sequelize')

class Expense extends Model { }

Expense.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    value: {
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
    }
}, {
    sequelize,
    modelName: 'Expense',
    tableName: 'expenses'
})

module.exports = Expense
