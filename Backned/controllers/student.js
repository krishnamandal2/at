
const Student=require("../models/Student")


exports.getStudentByClass=async(req,res)=>{
    const {className}=req.params;

    try{
        const students = await  Student.find({class:className})

        if(students.length ===0){
              return res.status(404).json({message:"no Students Found"})
        }
        res.json(students)
    }    catch(err){
        res.status(500).json({message:err.message})
    }
}