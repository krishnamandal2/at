const mongoose =require('mongoose')
const Schema = mongoose.Schema;

const studentSchema=new Schema({
    name:String,
    rollNumbers:String,
    class:String
})

module.exports=mongoose.model('Student',studentSchema)