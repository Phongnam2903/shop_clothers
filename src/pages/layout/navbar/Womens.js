import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import CustomNavbar from "./Navbar";
import LikeButton from "../home/LikeButton";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";

const Womens = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000); // Giá trị mặc định tối đa

  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => {
        // Lọc sản phẩm theo danh mục Women's (categoryId: 2)
        const womensProducts = data?.filter((pro) => pro.categoryId == 2);
        setProducts(womensProducts);
        setFilteredProducts(womensProducts);
      });
  }, []);

  // Xử lý tìm kiếm và lọc sản phẩm
  useEffect(() => {
    const filtered = products.filter((pro) => {
      return (
        pro.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        pro.price >= minPrice &&
        pro.price <= maxPrice
      );
    });
    setFilteredProducts(filtered);
  }, [searchTerm, minPrice, maxPrice, products]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container fluid>
      <Row>
        <CustomNavbar />
      </Row>
      <h2 className="my-4 text-center">Women's Products</h2>
      <Row className="mb-4">
        <Col md={6}>
          <Form.Control
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Min price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />
        </Col>
        <Col md={3}>
          <Form.Control
            type="number"
            placeholder="Max price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </Col>
      </Row>
      <Row>
        {filteredProducts.map((pro) => (
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
              <Card.Body
                onClick={() => handleCardClick(pro.id)}
                style={{ cursor: "pointer" }}
              >
                <Card.Title className="product-name">{pro.name}</Card.Title>
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
      <Footer />
    </Container>
  );
};

export default Womens;
