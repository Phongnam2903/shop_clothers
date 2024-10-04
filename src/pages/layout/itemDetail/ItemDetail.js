import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import "./ItemDetail.css";
import CustomNavbar from "../navbar/Navbar";
import { Container, Row } from "react-bootstrap";
import Footer from "../Footer/Footer";

function ItemDetail() {
  const { id } = useParams();
  const itemId = parseInt(id);
  const [item, setItem] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchItemDetail = async () => {
      try {
        const response = await fetch(`http://localhost:9999/products/${itemId}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setItem(data);
      } catch (err) {
        console.error("Failed to fetch item detail:", err);
      }
    };

    fetchItemDetail();
  }, [itemId]);

  const handleAddToCart = () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('Please log in to add items to the cart');
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
    cartItems.push({ ...item, selectedSize });
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    setIsAdded(true);
  };

  if (!item) return <p>Item not found</p>;

  return (
    <Container>   <Row><CustomNavbar /></Row>
      <Row><div className="item-detail-container">

        <Link to="/"> &#8592; Back</Link>
        <div className="item-detail">
          <div className="item-detail-image">
            <img src={item?.imageUrl} alt={"Item image"} />
          </div>
          <div className="item-detail-info">
            <div className="item-brand" style={{ margin: "0px 10px" }}>
              {item?.brand}
            </div>
            <div className="item-name">{item?.name}</div>
            <div className="item-price">${item?.price}</div>
            <select
              className="item-size"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Select Size</option>
              {item?.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
            <button
              className="item-btn"
              disabled={isAdded || !selectedSize}
              onClick={handleAddToCart}
            >
              {isAdded ? <Link to="/cart">Go to Cart</Link> : "Add To Bag"}
            </button>
            <p className="item-description">
              {item?.description}
            </p>
          </div>
        </div>
      </div>
      </Row>
      <Row>
        <Footer />
      </Row>
      </Container>


  );
}

export default ItemDetail;
