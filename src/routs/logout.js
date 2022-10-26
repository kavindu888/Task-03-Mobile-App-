const express=require('express');
const { request } = require('http');
const router=express.Router();

const {logout}=require('../controls')

router.get('/',logout.Find);





module.exports=router;