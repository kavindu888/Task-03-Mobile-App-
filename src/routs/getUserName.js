const express=require('express');
const { request } = require('http');
const router=express.Router();

const {getUserName}=require('../controls')

router.get('/',getUserName.Find);





module.exports=router;