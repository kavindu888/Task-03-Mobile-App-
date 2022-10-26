const express=require('express');
const { request } = require('http');
const router=express.Router();

const {checkQue}=require('../controls')

router.get('/',checkQue.Find);






module.exports=router;