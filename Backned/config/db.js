const mongoose =require('mongoose')
require ('dotenv') .config()

const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI,{
              useNewUrlParser:false,
              useUnifiedTopology:true
          })
           console.log("mongoose db connect")
    }  catch(error){
         console.log(error)
    }
}
module.exports= connectDB