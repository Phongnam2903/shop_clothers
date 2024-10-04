import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Nav,
  Card,
  Navbar,
  Dropdown,
} from "react-bootstrap";
import {
  FaUserPlus,
  FaUser,
  FaProductHunt,
  FaUserCircle,
  FaStar,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ManageProducts from "./ManagerProducts";
import ManageOrders from "./ManagerOrder";
import ManageUsers from "./ManagerUsers";
import ManageReviews from "./ManagerReviews";

const AdminDashboard = () => {
  const [content, setContent] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Xóa userId khỏi localStorage và cập nhật trạng thái
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const renderContent = () => {
    switch (content) {
      case "ManageProducts":
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <ManageProducts />
            </Card.Body>
          </Card>
        );
      case "ManageOrders":
        return (
          <Card className="shadow-sm">
            <Card.Body>
              <ManageOrders />
            </Card.Body>
          </Card>
        );
      case "ManagerUsers":
        return (
          <Card className="shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white">
              Manage Users
            </Card.Header>
            <Card.Body>
              <ManageUsers />
            </Card.Body>
          </Card>
        );
      case "ManageReviews":
        return (
          <Card className="shadow-sm">
            <Card.Header as="h5" className="bg-primary text-white">
              Manage Reviews
            </Card.Header>
            <Card.Body>
              <ManageReviews />
            </Card.Body>
          </Card>
        );
      default:
        return (
          <Card className="shadow-sm text-center">
            <Card.Body className="text-muted">
              Please select a function from the menu
            </Card.Body>
          </Card>
        );
    }
  };

  return (
    <Container fluid className="p-0">
      <Row>
        {/* Header */}
        <Navbar
          bg="dark"
          variant="dark"
          className="d-flex justify-content-between p-3"
        >
          <Navbar.Brand href="#" className="text-white">
            <FaUserCircle className="me-2" /> Admin Dashboard
          </Navbar.Brand>
          <div className="d-flex align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant="secondary"
                id="dropdown-basic"
                className="d-flex align-items-center"
              >
                <FaUserCircle size={28} className="me-2" />
                <span className="text-white"></span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </Navbar>
      </Row>
      <Row className="no-gutters">
        {/* Sidebar */}
        <Col
          md={2}
          className="bg-dark text-white p-3 d-flex flex-column"
          style={{ height: "calc(100vh - 56px)" }} // Trừ chiều cao của header
        >
          <h4 className="text-center mb-4">Menu</h4>
          <Nav className="flex-column">
            <Nav.Item>
              <Nav.Link
                className="text-white nav-link-custom"
                style={{ cursor: "pointer" }}
                onClick={() => setContent("ManageOrders")}
              >
                <FaUserPlus className="me-2" /> Manage Orders
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-white nav-link-custom"
                style={{ cursor: "pointer" }}
                onClick={() => setContent("ManagerUsers")}
              >
                <FaUser className="me-2" /> Manage Users
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-white nav-link-custom"
                style={{ cursor: "pointer" }}
                onClick={() => setContent("ManageProducts")}
              >
                <FaProductHunt className="me-2" /> Manage Products
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                className="text-white nav-link-custom"
                style={{ cursor: "pointer" }}
                onClick={() => setContent("ManageReviews")}
              >
                <FaStar className="me-2" /> Manage Reviews
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>

        {/* Content Area */}
        <Col
          md={10}
          className="p-4"
          style={{
            backgroundColor: "#f8f9fa", // Màu nền nhẹ hơn
            height: "calc(100vh - 56px)",
            overflowY: "auto",
          }}
        >
          {renderContent()}
        </Col>
      </Row>

      <style jsx>{`
        .nav-link-custom:hover {
          background-color: #495057;
          color: white !important;
          border-radius: 5px;
          transition: background-color 0.3s ease-in-out;
        }
        .nav-link-custom {
          margin-bottom: 10px;
          padding: 10px;
          font-size: 1.1rem;
        }
      `}</style>
    </Container>
  );
};

export default AdminDashboard;
