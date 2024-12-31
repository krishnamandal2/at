import { Button,Checkbox,Box, Container,FormControl,FormLabel,Heading, VStack,Input, HStack,Select,Text} from '@chakra-ui/react'
  
import { useState,useEffect } from 'react';
import axios from 'axios'

function Attendence(){

    const[date,setDate]=useState(new Date().toISOString().slice(0,10))
    const[selectedClass,setSelectedClass]=useState('')
    const[students,setStudents]=useState([])

    const[attendance,setAttendance]=useState({})


    useEffect(()=>{
         
        const fetchStudents=async()=>{
              
            try{
                
        const { data } = await axios.get(`http://localhost:5000/api/students/class/${selectedClass}`)
                     if(Array.isArray(data)){
                          setStudents(data)
                     }else{
                    console.error('Unexpected data')
                    setStudents([]);
                     }


            }catch(error){
                console.log("Error fatching students",error)
                 setStudents([]);
          }
        } 
        fetchStudents()

    }, [selectedClass])

    const handleAttendanceChange=( studentId,status)=>{
          
        setAttendance({
            ...attendance,
            [studentId]:status,
        })

    }

    const submitAttendance= async()=>{
         try{
            await axios.post("http://localhost:5000/api/attendance/mark",{


           
            attendanceData:attendance,
            date:date,

        })
        alert("Attendance submit")

         }   catch(error){
               console.log("error in submitation",error)
         }

          
    }


    return(

        <>
        <Box
         minHeight="100vh"
         bgGradient= "linear(to-r,teal.400,blue.400)"
         p={8}
        
        >
            <Container maxW="container.md" contentCenter>

                 <Box
                 p={8}
                 borderWidth={1}
                 borderRadius= "lg"
                 boxShadow="md"
                 bg="white"
                 width="100%"
                 
                 >
                    <Heading as="h1" mb={6} textAlign="center"> Marks Attendence</Heading>
                 <VStack spacing={6} align="stretch">
                 <FormControl>
                    <FormLabel>Select Date</FormLabel>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e)=>setDate(e.target.value)}
                    >


                    </Input>
                 </FormControl>
                   

                 <FormControl>
                    <FormLabel>Select Branch</FormLabel>
                    <Select
                      value={selectedClass}
                       onChange={(e)=>setSelectedClass(e.target.value)}
                    >
                        <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BTECH">BTECH</option>
                        <option value="UPSC"> UPSC</option>
                    </Select>
                    
                 </FormControl>

                 <Box>
                    {students.length> 0 ? (
                    students.map((student)=>(
                      
                      <HStack key={student._id} spacing={4} align="center" p={3} borderBottom="1px" borderColor="gray.200">

                      <Text flex={1}>{student.name} - {student.rollNumbers}</Text>
                      <Checkbox
                        ischecked={attendance[student._id]=== 'present'}
                        onChange={()=>handleAttendanceChange(student._id,"present")}
                       >



                      Present</Checkbox>

                      <Checkbox
                        ischecked={attendance[student._id]=== 'Absent'}
                        onChange={()=>handleAttendanceChange(student._id,"Absent")}
                       >

                        

                      Absent</Checkbox>
                  </HStack>

                    ))
                ):(

                    <Text>No Students found</Text>
                )
                    
                    }
                   
                 </Box>
                 

                 </VStack>
                 </Box>

                 <Button colorSchema="blue" onClick={submitAttendance}>Submit</Button>
            </Container>
    
        </Box>
        </>
    )
} 
export default Attendence