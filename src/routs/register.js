const express=require('express');
const { request } = require('http');
const router=express.Router();

const {register}=require('../controls')

router.post('/',register.Find);





module.exports=router;