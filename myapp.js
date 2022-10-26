const express=require('express');
const app=express();

const db=require('./src/modules/index');

const register=require('./src/routs/register');
const login=require('./src/routs/login');
const choose=require('./src/routs/choosQu');
const auth=require('./src/middleware/auth')
const checkQue=require('./src/routs/checkque')
const notification=require('./src/routs/notification')
const notificationNo=require('./src/routs/notificationNo')
const getUserName=require('./src/routs/getUserName')
const queCall=require('./src/routs/queCall')
const logout=require('./src/routs/logout')
app.use(express.json());

app.use('/api/registrer',register);
app.use('/api/login',login);
app.use('/api/choose',auth,choose);
app.use('/api/checkQue',auth,checkQue);
app.use('/api/notification',auth,notification);
app.use('/api/notificationNo',auth,notificationNo);
app.use('/api/getUserName',auth,getUserName);
app.use('/api/queCall',queCall);
app.use('/api/logout',auth,logout);


(async () => {
  
    await db.sequelize.sync();
    
})();




app.listen (3000);