
const { INTEGER } = require("sequelize");

module.exports = (sequelize, DataTypes) => {

    const Work = sequelize.define('work', 
    {
      
      
        sno: DataTypes.INTEGER,
        dis: DataTypes.STRING,
        Date: DataTypes.DATEONLY,
        status:DataTypes.STRING
        


        


    },
    {
        freezeTableName: true ,
        timestamps: false
        

    });

    return Work;

};