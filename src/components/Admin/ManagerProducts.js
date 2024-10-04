import React, { useState, useEffect } from "react";
import { Button, Table, Alert, Form, Modal, Pagination } from "react-bootstrap";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [categorys, setCategories] = useState([]);
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    sizes: [], // Đảm bảo rằng sizes được khởi tạo là mảng rỗng
    brand: "",
    imageUrl: "",
    saleDiscount: 0,
  });
  const [showEditProductModal, setShowEditProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination and search state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("http://localhost:9999/products")
      .then((response) => response.json())
      .then((data) => {
        // Đảm bảo rằng sizes luôn là mảng
        const productsWithValidSizes = data.map((product) => ({
          ...product,
          sizes: Array.isArray(product.sizes) ? product.sizes : [],
        }));
        setProducts(productsWithValidSizes);
      })
      .catch((error) => console.error("Error fetching products:", error));

    fetch("http://localhost:9999/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleEditClick = (product) => {
    setSelectedProduct({
      ...product,
      sizes: Array.isArray(product.sizes) ? product.sizes : [], // Đảm bảo rằng sizes luôn là mảng
    });
    setShowEditProductModal(true);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedProduct({
      ...selectedProduct,
      [name]: value,
    });
  };

  const handleEditSizeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedProduct((prevProduct) => {
      const sizes = checked
        ? [...prevProduct.sizes, value]
        : prevProduct.sizes.filter((size) => size !== value);
      return { ...prevProduct, sizes };
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    setNewProduct((prevProduct) => {
      const sizes = checked
        ? [...prevProduct.sizes, value]
        : prevProduct.sizes.filter((size) => size !== value);
      return { ...prevProduct, sizes };
    });
  };

  const addProduct = () => {
    fetch("http://localhost:9999/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data]);
        setShowAlert(true);
        setShowAddProductModal(false);
      })
      .catch((error) => console.error("Error adding product:", error));
  };

  const deleteProduct = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      fetch(`http://localhost:9999/products/${productId}`, {
        method: "DELETE",
      })
        .then(() => {
          setProducts(products.filter((product) => product.id !== productId));
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  const updateProduct = () => {
    fetch(`http://localhost:9999/products/${selectedProduct.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(selectedProduct),
    })
      .then(() => {
        setProducts(
          products.map((product) =>
            product.id == selectedProduct.id ? selectedProduct : product
          )
        );
        setShowAlert(true);
        setShowEditProductModal(false);
      })
      .catch((error) => console.error("Error updating product:", error));
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(indexOfFirstProduct, indexOfLastProduct);

  const pageCount = Math.ceil(
    products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    ).length / itemsPerPage
  );

  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Button variant="primary" onClick={() => setShowAddProductModal(true)}>
        Add Product
      </Button>
      <Form.Control
        className="mt-3 mb-3"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Operation successful!
        </Alert>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Sizes</th>
            <th>Brand</th>
            <th>Image</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentProducts.map((product) => (
            <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.stock}</td>
              <td>
                {categorys?.find((c) => c.id == product.categoryId)?.name}
              </td>
              <td>
                <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
                  {(product.sizes || []).map((size, index) => (
                    <li key={index}>{size}</li>
                  ))}
                </ul>
              </td>
              <td>{product.brand}</td>
              <td>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{product.saleDiscount}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleEditClick(product)}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
      <Pagination>
        {Array.from({ length: pageCount }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>

      {/* Add Product Modal */}
      <Modal
        show={showAddProductModal}
        onHide={() => setShowAddProductModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formProductName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                placeholder="Enter product name"
              />
            </Form.Group>
            <Form.Group controlId="formProductDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                placeholder="Enter product description"
              />
            </Form.Group>
            <Form.Group controlId="formProductPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleInputChange}
                placeholder="Enter product price"
              />
            </Form.Group>
            <Form.Group controlId="formProductStock">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={newProduct.stock}
                onChange={handleInputChange}
                placeholder="Enter product stock"
              />
            </Form.Group>
            <Form.Group controlId="formProductCategory">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="text"
                name="categoryId"
                value={newProduct.categoryId}
                onChange={handleInputChange}
                placeholder="Enter product category"
              />
            </Form.Group>
            <Form.Group controlId="formProductSizes">
              <Form.Label>Sizes</Form.Label>
              {["S", "M", "L", "XL"].map((size) => (
                <Form.Check
                  key={size}
                  type="checkbox"
                  label={size}
                  value={size}
                  checked={newProduct.sizes.includes(size)}
                  onChange={handleSizeChange}
                />
              ))}
            </Form.Group>
            <Form.Group controlId="formProductBrand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleInputChange}
                placeholder="Enter brand"
              />
            </Form.Group>
            <Form.Group controlId="formProductImage">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                name="imageUrl"
                value={newProduct.imageUrl}
                onChange={handleInputChange}
                placeholder="Enter image URL"
              />
            </Form.Group>
            <Form.Group controlId="formProductDiscount">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                name="saleDiscount"
                value={newProduct.saleDiscount}
                onChange={handleInputChange}
                placeholder="Enter discount"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddProductModal(false)}
          >
            Close
          </Button>
          <Button variant="primary" onClick={addProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Product Modal */}
      {selectedProduct && (
        <Modal
          show={showEditProductModal}
          onHide={() => setShowEditProductModal(false)}
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Product</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formEditProductName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={selectedProduct.name}
                  onChange={handleEditInputChange}
                  placeholder="Enter product name"
                />
              </Form.Group>
              <Form.Group controlId="formEditProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={selectedProduct.description}
                  onChange={handleEditInputChange}
                  placeholder="Enter product description"
                />
              </Form.Group>
              <Form.Group controlId="formEditProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={selectedProduct.price}
                  onChange={handleEditInputChange}
                  placeholder="Enter product price"
                />
              </Form.Group>
              <Form.Group controlId="formEditProductStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={selectedProduct.stock}
                  onChange={handleEditInputChange}
                  placeholder="Enter product stock"
                />
              </Form.Group>
              <Form.Group controlId="formEditProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="categoryId"
                  value={selectedProduct.categoryId}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEditProductSizes">
                <Form.Label>Sizes</Form.Label>
                {["S", "M", "L", "XL"].map((size) => (
                  <Form.Check
                    key={size}
                    type="checkbox"
                    label={size}
                    value={size}
                    checked={selectedProduct.sizes.includes(size)}
                    onChange={handleEditSizeChange}
                  />
                ))}
              </Form.Group>
              <Form.Group controlId="formEditProductBrand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  name="brand"
                  value={selectedProduct.brand}
                  onChange={handleEditInputChange}
                />
              </Form.Group>
              <Form.Group controlId="formEditProductImage">
                <Form.Label>Image URL</Form.Label>
                <Form.Control
                  type="text"
                  name="imageUrl"
                  value={selectedProduct.imageUrl}
                  onChange={handleEditInputChange}
                  placeholder="Enter image URL"
                />
              </Form.Group>
              <Form.Group controlId="formEditProductDiscount">
                <Form.Label>Discount</Form.Label>
                <Form.Control
                  type="number"
                  name="saleDiscount"
                  value={selectedProduct.saleDiscount}
                  onChange={handleEditInputChange}
                  placeholder="Enter discount"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowEditProductModal(false)}
            >
              Close
            </Button>
            <Button variant="primary" onClick={updateProduct}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default ManageProducts;
