import React, { useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useParams } from 'react-router-dom'

import AboutUs from '../../Components/AboutUs/AboutUs'
import ContactUs from '../../Components/ContactUs/ContactUs'
import Posts from '../../Components/Posts/Posts'
import PostDetails from "../Posts/PostDetails"


function NavBar() {
  
  return (
    <Router >
      <div className="MainPage" style={{display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh'}}>
        <Navbar bg="dark" data-bs-theme="dark" sticky="top">
          <Container>
            <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>
                <Nav.Link href="/about">About Us</Nav.Link>
                <Nav.Link href="/contact">Contact</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Container>
            <Routes>
                <Route path="/"  element= {<Posts />} ></Route>
                <Route path="/about" element= {<AboutUs />} />
                <Route path="/contact" element= {<ContactUs />} />
                <Route path="post/:id" element= {<PostDetails />} />
            </Routes>
        </Container>
      </div>
    </Router>
  );
}

export default NavBar;
