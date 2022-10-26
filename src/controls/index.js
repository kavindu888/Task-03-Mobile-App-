const controllers = {};

controllers.register = require('./register');
controllers.login = require('./login');
controllers.choose = require('./choose');
controllers.checkQue = require('./ckeckQue');
controllers.notification = require('./notification');
controllers.notificationNo = require('./notificationNo');
controllers.getUserName = require('./getUserName');
controllers.queCall = require('./queCall');
controllers.logout = require('./logout');

module.exports = controllers;
