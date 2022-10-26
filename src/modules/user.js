const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', 
    {
        
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        hash: DataTypes.STRING,
        tp: DataTypes.INTEGER
        


    },
    {
        freezeTableName: true ,
        timestamps: false

    });

    return User;

};