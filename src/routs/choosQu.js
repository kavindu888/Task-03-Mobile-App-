const express=require('express');
const { request } = require('http');
const router=express.Router();

const {choose}=require('../controls')

router.post('/',choose.Find);





module.exports=router;