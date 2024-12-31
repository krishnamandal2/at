import { Box, Container, FormControl, FormLabel, Input, Button, Heading, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make the POST request to the backend API for login
      await axios.post("http://localhost:5000/api/auth/login", { email, password });

      // Navigate to the attendance page after successful login
      navigate('/attend');
    } catch (error) {
      // Handle any errors during login (e.g., invalid credentials)
      setMessage('Login failed: ' + (error.response ? error.response.data.message : error.message));
    }
  };

  return (
    <Box minHeight="100vh" bgGradient="linear(to-r, teal.400, blue.400)" p={8}>
      <Container maxW="md" centerContent>
        <Box p={8} borderWidth={1} borderRadius="md" bg="white" width="100%" maxW="400px">
          <Heading as="h1" mb={6} textAlign="center">Login</Heading>

          {/* Form for user input */}
          <form onSubmit={handleSubmit}>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email" // Corrected the type
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>

            <FormControl id="password" isRequired mb={4}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password" // Corrected the type
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>

            {/* Display error message */}
            {message && <Text color="red.500" mb={4}>{message}</Text>}

            <Button type="submit" mt={6} colorScheme="blue" width="full">Login</Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
}

export default Login;
