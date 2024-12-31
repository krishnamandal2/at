import { ChakraProvider } from '@chakra-ui/react';
import Login from './Components/Login';
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import Attendence from "./Components/Attendence" 
import Navbar from "./Components/Navbar"
import Report from "./Components/Report"
 
const  router= createBrowserRouter([
    {
        path:'/login',
         element: <><Login/></>
    },
        
    {
        path:'/attend', element:<><Navbar/><Attendence/></>
    },

    {
        path:'/report', element:<><Navbar/><Report/></>
    }
])
 
function App(){
     return(
        <>
          <ChakraProvider>
      <RouterProvider router={router}/>

    </ChakraProvider>
        
        </>
     )
}
export default App;