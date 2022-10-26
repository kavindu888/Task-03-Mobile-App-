const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const Notification = sequelize.define('notification', 
    {
      
        notification: DataTypes.STRING,
       


    },
    {
        freezeTableName: true ,
        timestamps: false

    });

    return Notification;

};