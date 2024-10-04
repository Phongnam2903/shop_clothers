import React, { useState, useEffect } from "react";
import { Table, Card, Dropdown, ButtonGroup } from "react-bootstrap";

function ManageOrders() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch orders
    fetch("http://localhost:9999/orders")
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch((error) => console.error("Error fetching orders:", error));

    // Fetch products
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));

    // Fetch users
    fetch("http://localhost:9999/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    // Update order status in state
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);

    // Send update request to server
    fetch(`http://localhost:9999/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update status");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Status updated successfully:", data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      });
  };

  return (
    <div>
      <Card className="mt-4">
        <Card.Header as="h4" className="text-center bg-primary text-white">
          Manage Orders
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>User Name</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
                <th>Items</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>
                    {users.find((user) => user.id == order.userId)?.username ||
                      "Unknown User"}
                  </td>
                  <td>{order.orderDate}</td>
                  <td>
                    <Dropdown as={ButtonGroup}>
                      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                        {order.status}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order.id, "Pending")
                          }
                        >
                          Pending
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order.id, "Shipped")
                          }
                        >
                          Shipped
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order.id, "Delivered")
                          }
                        >
                          Delivered
                        </Dropdown.Item>
                        <Dropdown.Item
                          onClick={() =>
                            handleStatusChange(order.id, "Cancelled")
                          }
                        >
                          Cancelled
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>{order.totalAmount}</td>
                  <td>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          Product:{" "}
                          {products.find((p) => p.id == item.productId)
                            ?.name || "Unknown Product"}
                          , Quantity: {item.quantity}, Price: {item.price}
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ManageOrders;
