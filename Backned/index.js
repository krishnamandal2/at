
const express =require('express')
const connectDB=require('./config/db')
const dotenv=require('dotenv')
const cors= require('cors')
const authRoutes =require('./routes/auth')
const studentRoutes=require('./routes/student')
const attendanceRoutes=require("./routes/attendance")



dotenv. config();
connectDB();

const app=express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use("/api/students", studentRoutes)
app.use('/api/attendance',attendanceRoutes)

const PORT=process.env.PORT|| 5000;

app.listen(PORT,()=>console.log('server start'))
