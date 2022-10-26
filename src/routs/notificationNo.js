const express=require('express');
const { request } = require('http');
const router=express.Router();

const {notificationNo}=require('../controls');


router.get('/',notificationNo.Find);





module.exports=router;