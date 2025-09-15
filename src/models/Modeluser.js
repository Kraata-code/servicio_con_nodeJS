const {DataTypes} = require('sequelize');
const sequelize = require('./config/database');

const Modeluser = sequelize.define(
    'users',{
        id:{ type : DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
        username:{type: DataTypes.STRING,allowNull:false},
        age:{ type: DataTypes.INTEGER},
        password:{ type: DataTypes.STRING,allowNull:false}
    },
    {
        timestamps:true
    }
) 
module.exports = Modeluser;