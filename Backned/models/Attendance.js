const mongoose =require('mongoose')

const Schema=mongoose.Schema

const attendanceSchema=new Schema({
    student:{type:Schema.Types.ObjectId,ref:'student'},

    date:Date,
    status:String
})
module.exports=mongoose.model('Attendance',attendanceSchema)