import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import "./Footer.css"; // Import CSS riêng cho Footer nếu cần

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col md={4}>
            <h5>About Us</h5>
            <p>
              We are a leading e-commerce store offering the best products at
              the best prices. Your satisfaction is our priority.
            </p>
          </Col>
          <Col md={4}>
            <h5>Quick Links</h5>
            <Nav className="flex-column">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/womens">Womens</Nav.Link>
              <Nav.Link href="/mens">Mens</Nav.Link>
              <Nav.Link href="/brands">Brands</Nav.Link>
            </Nav>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <p>Email: support@tdshop.com</p>
            <p>Phone: +1 234 567 890</p>
            <div className="social-icons">
              <FaFacebook className="social-icon" />
              <FaTwitter className="social-icon" />
              <FaInstagram className="social-icon" />
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>
              &copy; {new Date().getFullYear()} TD SHOP. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
