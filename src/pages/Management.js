import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

import UserDashboard from '../components/User/UserDashboard';
import AdminDashboard from '../components/Admin/AdminDashboard';

const Management = () => {
  const { role } = useAuth();
  
  const renderContent = () => {
    switch(role) {
      case 'admin':
        return <AdminDashboard />;
      case 'user':
        return <UserDashboard />;
      default:
        return <p>Vui lòng chọn quyền</p>;
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          {renderContent()}
        </Col>
      </Row>
    </Container>
  );
};

export default Management;
