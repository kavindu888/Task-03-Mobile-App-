const express=require('express');
const { request } = require('http');
const router=express.Router();

const {login}=require('../controls')

router.post('/',login.Find);





module.exports=router;