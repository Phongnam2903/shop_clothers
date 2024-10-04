import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FaUser, FaSearch } from "react-icons/fa"; // Import search icon from react-icons
import LogoutButton from "../Auth/LogoutButton";
import "../User/css/header.css";
const Header = () => {
  return (
    <Navbar bg="light" expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <img src="/assets/logo.png" alt="TD SHOP" className="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/womens">
              Womens
            </Nav.Link>
            <Nav.Link as={Link} to="/mens">
              Mens
            </Nav.Link>
            <Nav.Link as={Link} to="/clothing">
              Clothing
            </Nav.Link>
            <Nav.Link as={Link} to="/brands">
              Brands
            </Nav.Link>
          </Nav>
          <Form className="d-flex search-form">
            <FormControl
              type="search"
              placeholder="Search"
              className="mr-2 search-input"
              aria-label="Search"
            />
            <FaSearch size={20} className="search-icon" />
          </Form>
          <Nav>
            <Nav.Link as={Link} to="/cart" className="nav-cart">
              &#128722;{" "}
              <span className="cart-count" style={{ color: "red" }}>
                abc
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            <Nav.Link variant="outline-primary" className="nav-btn">
              <FaUser size={20} style={{ color: "black" }} />
              Hi, John
            </Nav.Link>
            <LogoutButton />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
