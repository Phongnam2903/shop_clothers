import React from "react";
import { Container } from "react-bootstrap";
import HomePage from "./home/HomePage";
import CustomNavbar from "./navbar/Navbar";
import Footer from "./Footer/Footer";

function Home() {
  return (
    <Container fluid>
      <CustomNavbar />
      <HomePage />
      <Footer />
    </Container>
  );
}

export default Home;
