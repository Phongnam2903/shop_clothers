import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Checkout.css";
import { Container, Row } from "react-bootstrap";
import CustomNavbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [isOrdered, setIsOrdered] = useState(false);
  const userId = localStorage.getItem('userId'); // Lấy userId từ localStorage

  useEffect(() => {
    if (userId) {
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } else {
      alert('Please log in to proceed to checkout');
    }
  }, [userId]);

  const subTotal = cart.reduce((sum, curr) => sum + curr.price * (curr.quantity || 1), 0);

  const handlePay = async () => {
    if (!userId) {
      alert('Please log in to place an order');
      return;
    }

    // Tính toán số lượng tổng cho mỗi sản phẩm
    const productQuantities = cart.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = 0;
      }
      acc[item.id] += item.quantity || 1;
      return acc;
    }, {});

    const newOrder = {
      userId: parseInt(userId),
      orderDate: new Date().toISOString().split('T')[0],
      status: "Processing",
      totalAmount: subTotal,
      items: cart.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        price: item.price
      }))
    };

    try {
      // Save the order
      const response = await fetch("http://localhost:9999/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });
      if (!response.ok) throw new Error("Failed to save the order");

      // Fetch and update products
      const productsResponse = await fetch("http://localhost:9999/products");
      const productsData = await productsResponse.json();

      for (const [productId, quantity] of Object.entries(productQuantities)) {
        const product = productsData.find(product => product.id == productId);
        if (product) {
          const updatedProduct = {
            ...product,
            stock: product.stock - quantity,
          };

          await fetch(`http://localhost:9999/products/${productId}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ stock: updatedProduct.stock }),
          });
        }
      }

      setIsOrdered(true);
      localStorage.removeItem(`cartItems_${userId}`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Row>
        <CustomNavbar />
      </Row>
      <Row>
        <div className="checkout-container">
          {isOrdered ? (
            <h3>
              Yay! 🚀 Order placed successfully. <Link to="/">Shop more!</Link>
            </h3>
          ) : (
            <>
              <div>
                <div className="custom-row">
                  <h4>Order Review</h4>
                  <span>{cart.length} items in cart</span>
                </div>
                <div className="custom-row">
                  <h4>Coupons</h4>
                  <span>Not Available</span>
                </div>
                <div className="custom-row">
                  <h4>Checkout Summary</h4>
                  <div className="checkout-summary">
                    <span>Subtotal</span>
                    <span>${subTotal.toFixed(2)}</span>
                  </div>
                </div>
                <div className="custom-row">
                  <h4>Total</h4>
                  <span>${subTotal.toFixed(2)}</span>
                </div>
              </div>
              <button className="item-btn" onClick={handlePay}>
                Pay ${subTotal.toFixed(2)}
              </button>
            </>
          )}
        </div>
      </Row>
      <Row>
        <Footer />
      </Row>
    </Container>

  );
};

export default Checkout;
