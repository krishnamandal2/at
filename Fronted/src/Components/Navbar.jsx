import { Container,Flex,Heading, Spacer,Button} from "@chakra-ui/react"
import { Link } from "react-router-dom"


function Navbar(){
    return(
        <>
         <Container maxW="100%" p={4}>

            <Flex as='nav' bg="blue.500"
              color='white'
              p={4}
              align="center"
              mb={8}
              borderRadius='md'

             
            >

           <Heading as="h1" size="lg" color='white'> Admin Dashboard</Heading>

              <Spacer/>
              <Button as={ Link } to="/attend" colorScheme='white' 
              varients="outline" mr={4}>Mark Attendance</Button>
           
           <Button as={ Link } to="/report" colorScheme='white' 
              varients="outline" mr={4}> Total Attendance</Button>







              






            </Flex>

         </Container>

         

        </>
    )
}
export default Navbar