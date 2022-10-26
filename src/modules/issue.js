const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const Issue = sequelize.define('issue', 
    {
      
        issue: DataTypes.STRING,
      
        


    },
    {
        freezeTableName: true ,
        timestamps: false

    });

    return Issue;

};