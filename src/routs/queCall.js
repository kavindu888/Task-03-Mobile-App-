const express=require('express');
const { request } = require('http');
const router=express.Router();

const {queCall}=require('../controls')

router.post('/',queCall.Find);





module.exports=router;