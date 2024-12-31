
const express =require('express')
const {markAttendance , getClasswiseAttendance} = require("../controllers/attendance")
const router = express.Router()

router.post('/mark',markAttendance)

router.get('/classwise/:className',getClasswiseAttendance)


module.exports=router
