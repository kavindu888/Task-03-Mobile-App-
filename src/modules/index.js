const dbConfig=require('../config/dbConfig')
const Sequelize = require('sequelize');

const sequelize = new Sequelize(dbConfig.DATABASE, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.DIALECT,
    port:3307
});
const db = {};
db.sequelize = sequelize;

db.models = {};
db.models.User = require('./user')(sequelize, Sequelize.DataTypes);
db.models.Issue = require('./issue')(sequelize, Sequelize.DataTypes);
db.models.Notification = require('./notification')(sequelize, Sequelize.DataTypes);
db.models.Work = require('./work')(sequelize, Sequelize.DataTypes);
db.models.Fcm_token = require('./fcm_token')(sequelize, Sequelize.DataTypes);

db.models.User.hasMany(db.models.Work);
db.models.Work.belongsTo(db.models.User);

db.models.Issue.hasMany(db.models.Work);
db.models.Work.belongsTo(db.models.Issue);

db.models.Work.hasMany(db.models.Notification);
db.models.Notification.belongsTo(db.models.Work);

db.models.User.hasMany(db.models.Fcm_token);
db.models.Work.belongsTo(db.models.User);



module.exports=db;

