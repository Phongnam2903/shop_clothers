import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Cart.css";
import { Container, Row } from "react-bootstrap";
import CustomNavbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

function Cart() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      const storedCart =
        JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
      setCart(storedCart);
      localStorage.setItem(`cartCount_${userId}`, storedCart.length);
    }
  }, [userId]);

  const handleRemove = (itemId) => {
    const updatedCart = cart.filter((item) => item.id !== itemId);
    setCart(updatedCart);
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedCart));
      localStorage.setItem(`cartCount_${userId}`, updatedCart.length);
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  return (
    <Container fluid>
      <Row>
        <CustomNavbar />
      </Row>
      <Row className="mt-5 mb-5">
        <div className="cart-container">
          <h1>Cart</h1>
          {!cart.length ? (
            <div className="empty-cart">
              {/* Add your "No cart items" image here */}
              <img
                src="/assets/no_cart_items.png" // Replace with your actual image URL
                alt="No items in cart"
                className="no-items-image"
              />
              <p>No items added! Please add something to your cart.</p>
            </div>
          ) : (
            <>
              <div className="cart-list">
                {cart.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="item-image">
                      <img src={item.imageUrl} alt={item.name} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">{item.name}</div>
                      <div className="item-price">${item.price}</div>
                      <div className="item-size">
                        Size: {item.selectedSize || "N/A"}
                      </div>
                      <button
                        className="remove-btn"
                        onClick={() => handleRemove(item.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="cart-summary">
                <div className="total-price">
                  <strong>Total: ${calculateTotal()}</strong>
                </div>
                <Link to="/checkout">
                  <button className="item-btn">Checkout</button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>
  );
}

export default Cart;
