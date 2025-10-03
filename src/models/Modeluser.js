const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Modeluser = sequelize.define(
    'users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true }, email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
},
    {
        timestamps: false
    }
)
module.exports = Modeluser;