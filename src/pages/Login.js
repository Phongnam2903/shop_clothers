import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import CustomNavbar from './layout/navbar/Navbar';
import Footer from './layout/Footer/Footer';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:9999/users?username=${username}&password=${password}`);
      const user = response.data[0];
      if (user) {
        localStorage.setItem('userId', user.id);
        login(user.role);
        navigate('/management');
        window.location.reload();
      } else {
        setError('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed', error);
      setError('An error occurred while logging in');
    }
  };

  return (
    <Container
      fluid
    >
      <Row>
        <CustomNavbar />
      </Row>
      <Row className="w-100 justify-content-center mt-5 mb-5">
        <Col md="8" lg="6" xl="4">
          <Card
            className="shadow-lg p-4 border-0"
            style={{ backgroundColor: "#f8f9fa" }}
          >
            <Card.Body>
              <h2 className="text-center mb-4">Login</h2>
              <Form onSubmit={handleLogin}>
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
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                <Button variant="primary" type="submit" className="w-100 mb-3">
                  Login
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Link to="/register" className="d-block mt-2">
                  Register New Account
                </Link>
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

export default Login;
