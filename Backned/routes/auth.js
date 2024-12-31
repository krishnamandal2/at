const express=require('express')
const router = express.Router()
const{LoginTeacher} =require("../controllers/auth")


router.post('/login',LoginTeacher)

module.exports=router