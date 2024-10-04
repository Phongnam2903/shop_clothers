import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";

function ManageReviews() {
  const [products, setProducts] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9999/reviews")
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:9999/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product ID</th>
            <th>User ID</th>
            <th>Rating</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review) => (
            <tr key={review.id}>
              <td>{review.id}</td>
              <td>{products.find((p) => p.id == review.productId)?.name}</td>
              <td>{users.find((u) => u.id == review.userId)?.username}</td>
              <td>{review.rating}</td>
              <td>{review.comment}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ManageReviews;
