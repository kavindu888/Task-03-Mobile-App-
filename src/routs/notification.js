const express=require('express');
const { request } = require('http');
const router=express.Router();

const {notification}=require('../controls');


router.get('/',notification.Find);





module.exports=router;