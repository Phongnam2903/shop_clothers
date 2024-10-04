import React, { useContext } from 'react';
import { Button, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav.Link variant="secondary" onClick={handleLogout} className="w-100">Logout</Nav.Link>
  );
};

export default LogoutButton;
