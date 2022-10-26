const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const FcmToken = sequelize.define('fcm_token', 
    {
      
        token: DataTypes.STRING(500),
       


    },
    {
        freezeTableName: true ,
        timestamps: false

    });

    return FcmToken;

};