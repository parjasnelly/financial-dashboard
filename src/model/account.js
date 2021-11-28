const sequelize = require('../database')
const {DataTypes, Model} = require('sequelize')
const Expense = require('./expense')
const Revenue = require('./revenue')

class Account extends Model {}

Account.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
})
Account.hasMany(Expense)
Expense.belongsTo(Account)

Account.hasMany(Revenue)
Revenue.belongsTo(Account)
module.exports = Account