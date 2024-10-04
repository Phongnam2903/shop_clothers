import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Modal,
  Card,
} from "react-bootstrap";
import CustomNavbar from "../navbar/Navbar";
import Footer from "../Footer/Footer";

const Profile = () => {
  const [user, setUser] = useState({});
  const [editableUser, setEditableUser] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        console.error("UserId not found in localStorage");
        return;
      }

      try {
        const response = await fetch(`http://localhost:9999/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user.");
        }
        const data = await response.json();
        setUser(data);
        setEditableUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setEditableUser({ ...editableUser, [id]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:9999/users/${editableUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editableUser),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile.");
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      localStorage.setItem("userId", updatedUser.id);
      alert("Profile updated successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match!");
      return;
    }

    const result = await checkOldPassword();
    if (!result) {
      setErrorMessage("Incorrect old password.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:9999/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...user,
          password: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to change password.");
      }
      alert("Password changed successfully!");
      setShowPasswordModal(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
      setErrorMessage("");
    } catch (error) {
      alert(error.message);
    }
  };

  const checkOldPassword = async () => {
    try {
      const response = await fetch(`http://localhost:9999/users/${user.id}`);
      if (!response.ok) {
        throw new Error("Failed to check old password.");
      }
      const data = await response.json();
      return data.password === oldPassword;
    } catch (error) {
      alert(error.message);
      return false;
    }
  };

  if (!user || !editableUser) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="profile" fluid>
      <Row>
        <CustomNavbar />
      </Row>
      <Row className="justify-content-center my-4">
        <Col xs={12} md={8} lg={6}>
          <Card className="shadow-sm">
            <Card.Body>
              <Row className="mb-3">
                <Col className="text-center">
                  <Image
                    src={user.imageUrl || "default-avatar.png"}
                    roundedCircle
                    fluid
                    className="profile-avatar mb-3"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                    }}
                  />
                  <h4 className="profile-username mb-1">{user.username}</h4>
                  <p className="profile-role text-muted">
                    {user.role === "admin" ? "Admin" : "User"}
                  </p>
                  <Button
                    variant="outline-primary"
                    onClick={() => setShowPasswordModal(true)}
                    className="mt-2"
                  >
                    Change Password
                  </Button>
                </Col>
              </Row>
              <Form onSubmit={handleUpdate}>
                <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableUser.username}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="phoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    value={editableUser.phoneNumber}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <div className="text-center">
                  <Button variant="success" type="submit">
                    Update Profile
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Footer />

      <Modal
        centered
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Change Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordChange}>
            {errorMessage && (
              <div className="text-danger mb-3">{errorMessage}</div>
            )}
            <Form.Group controlId="oldPassword" className="mb-3">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="newPassword" className="mb-3">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="confirmNewPassword" className="mb-3">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                required
              />
            </Form.Group>
            <div className="text-center">
              <Button variant="primary" type="submit">
                Change Password
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Profile;
