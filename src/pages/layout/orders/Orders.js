import React, { useState, useEffect } from "react";
import "./Orders.css";
import { Container, Row } from "react-bootstrap";
import CustomNavbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await fetch(`http://localhost:9999/orders?userId=${userId}`); 
      const ordersData = await response.json();
      setOrders(ordersData);
    };

    const fetchProducts = async () => {
      const response = await fetch("http://localhost:9999/products");
      const productsData = await response.json();
      setProducts(productsData);
    };

    fetchOrders();
    fetchProducts();
  }, []);

  const getProductName = (productId) => {
    const product = products.find((p) => p.id == productId);
    return product ? product.name : "Unknown Product";
  };

  return (
    <Container fluid>
      <Row>
        <CustomNavbar />
      </Row>
      <Row>
      <div className="orders-list">
      {orders.map((order) => (
        <div className="checkout-container" key={order.id}>
          <h3>#ID-62Z-{order.id}</h3>
          {order.items.map((item) => (
            <div className="order-item" key={item.productId}>
              <div className="item-name">{getProductName(item.productId)}</div>
              <div className="item-quantity">Quantity: {item.quantity}</div>
              <div className="item-price">Price: ${item.price}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
    
  );
}

export default Orders;
