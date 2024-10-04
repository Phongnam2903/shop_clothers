import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from "react-router-dom";

import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Alert,
  Card
} from 'react-bootstrap';
import CustomNavbar from './layout/navbar/Navbar';
import Footer from './layout/Footer/Footer';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !password || !phoneNumber) {
      setError('All fields are required.');
      return;
    }

    try {
      const newUser = {
        username,
        password,
        phoneNumber,
        role: 'user'  // Default role for new users
      };

      const response = await axios.post('http://localhost:9999/users', newUser);
      
      if (response.status === 201) {
        setSuccess('Registration successful!');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed', error);
      setError('An error occurred while registering.');
    }
  };

  return (
    <Container fluid>
      <Row>
        <CustomNavbar />
      </Row>
      <Row className="w-100 justify-content-center mt-5 mb-5">
        <Col md="8" lg="6" xl="4">
          <Card className="shadow-lg p-4 border-0" style={{ backgroundColor: '#f8f9fa' }}>
            <Card.Body>
              <h2 className="text-center mb-4">Register</h2>
              <Form onSubmit={handleRegister}>
                <Form.Group controlId="formBasicUsername" className="mb-3">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhoneNumber" className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter phone number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Register
                </Button>
              </Form>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}
              <div className="text-center mt-3">
                <p>Already have an account? <Link to="/login">Login</Link></p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
};

export default Register;