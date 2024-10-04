import React, { useState, useEffect } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import "./css/HomePage.css";
import LikeButton from "./LikeButton";
import ControlledCarousel from "./Banner";

function HomePage() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Sử dụng hook useNavigate để điều hướng

  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container className="homepage-container">
      <ControlledCarousel />
      <h2 className="section-title">Our Products</h2>
      <Row>
        {products.map((pro) => (
          <Col key={pro.id} md={4} className="product-col">
            <Card className="product-card">
              <div className="card-img-wrapper">
                <Card.Img
                  variant="top"
                  src={pro.imageUrl}
                  alt={pro.name}
                  className="product-image"
                />
                <LikeButton />
              </div>
              <Card.Body onClick={() => handleCardClick(pro.id)} style={{ cursor: "pointer" }}>
                <Card.Title
                  className="product-name"
                >
                  {pro.name}
                </Card.Title>
                <div className="product-brand-price-wrapper">
                  <Card.Text className="product-brand">{pro.brand}</Card.Text>
                  <Card.Text className="product-price">${pro.price}</Card.Text>
                </div>
                <Button variant="primary" className="add-to-cart-btn">
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
