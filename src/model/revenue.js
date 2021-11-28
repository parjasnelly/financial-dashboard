const sequelize = require('../database')
const {DataTypes, Model} = require('sequelize')

class Revenue extends Model {}

Revenue.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },
    value:{
        type: DataTypes.FLOAT,
        allowNull: false,
        unique: false
    }
},{
    sequelize,
    modelName: 'Revenue',
    tableName: 'revenues'
})

module.exports = Revenue