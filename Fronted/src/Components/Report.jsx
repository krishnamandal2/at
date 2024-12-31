import {Table, Container, Td,Heading, Select, VStack ,Box, Spinner, Tbody,Th,Thead,Tr,Text} from "@chakra-ui/react"
import { useState ,useEffect} from "react"
import axios from 'axios'


function Report(){

    const [className,setClassName]=useState("Bca")
    const[attendanceData,setAttendanceData]=useState([])
    const[loading,setLoading]=useState(false)

    useEffect(()=>{
         const fetchAttendanceData=async()=>{
             try{
                
                
                const {data}=await axios.get(`http://localhost:5000/api/attendance/classwise/${className}`)
                   
                if(Array.isArray(data)){
                    setAttendanceData(data)
                } else{
                    console.log("Unexpected data format",data)

                    setAttendanceData([])
                }
             } catch(error){
                 console.log( 'error in Fetching data',error)
                 setAttendanceData([])
             }  finally{
                  setLoading(false)
             }
         }
         fetchAttendanceData()
    },[className])



    return(
        <>

        <Container maxW='container.lg' p={4}>

            <VStack spacing={6} align="stretch" mb={8}>
                <Heading al="h1"size="lg" textAlign="center">Class wise  atte</Heading>

                <Box>
                    <Select
                        value={className}
                        onChange={(e)=>setClassName(e.target.value)}
                        placeholder="Select class"
                        size="lg"
                        bg="white"
                        borderColor="grey.300"



                        >
                       <option value="BCA">BCA</option>
                        <option value="MCA">MCA</option>
                        <option value="BTECH">BTECH</option>
                        <option value="UPSC"> UPSC</option>
                    </Select>
                </Box>
                {loading ?(
                    <Box textAlign="center">
                        <Spinner size="lg" color="blue.500"></Spinner>
                        <Text mt={4}>Loading</Text>
                    </Box>

                ):(
                    <Box bg='white' p={4} borderRadius="md" boxShadow="md">
                        <Table varient="simple">
<Thead>
    <Tr>
        <Th>Name</Th>
        <Th>Roll Numbers</Th>
        <Th>Attendance Percentage(%)</Th>
    </Tr>
</Thead>
     <Tbody>
        {attendanceData.length>0 ?(
            attendanceData.map((student)=>(
                 <Tr key={student.rollNumbers}>
                    <Td>{student.studentName}</Td>
                    <Td>{student.rollNumbers}</Td>
                    <Td>{student.percentage}</Td>


                 </Tr>

            ))

        ) :(
             <Tr>
                <Td colspan="3">No Data</Td>

             </Tr>
        )}
     </Tbody>
                        </Table>
                    </Box>
                )
            
            }
            </VStack>
        </Container>
        
        </>
    )
}

export default Report