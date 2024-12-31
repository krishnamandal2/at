
const express =require('express')
const {getStudentByClass}=require('../controllers/student')
const router =express.Router()

router.get("/class/:className",getStudentByClass)

module.exports=router