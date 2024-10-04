import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { FaUser } from "react-icons/fa";

import "./Navbar.css";

const CustomNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
    }

    const storedCartCount = localStorage.getItem(`cartCount_${storedUserId}`);
    if (storedCartCount) {
      setCartCount(parseInt(storedCartCount, 10));
    }
  }, []);



  const handleLogout = () => {
    // Xóa userId khỏi localStorage và cập nhật trạng thái
    localStorage.removeItem("userId");
    localStorage.removeItem(`cartCount_${userId}`); // Clear cart count on logout
    setIsLoggedIn(false);
    setCartCount(0);
    navigate("/"); // Điều hướng đến trang login sau khi đăng xuất
  };

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
          <Nav>
            <Nav.Link as={Link} to="/cart" className="nav-cart">
              &#128722;{" "}
              <span className="cart-count" style={{ color: "red" }}>
              {cartCount}
              </span>
            </Nav.Link>
            <Nav.Link as={Link} to="/orders">
              Orders
            </Nav.Link>
            {isLoggedIn ? (
              <>
                <Nav.Link as={Link} to={`/profile/${userId}`}>
                  <FaUser size={20} style={{ color: "black", marginRight: "5px" }} /> Profile
                </Nav.Link>
                <Button variant="outline-dark" onClick={handleLogout} className="ms-2">
                  Logout
                </Button>
              </>
            ) : (
              <Button variant="outline-dark" as={Link} to="/login">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
