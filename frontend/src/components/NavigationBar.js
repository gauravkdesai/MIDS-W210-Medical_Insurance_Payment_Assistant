import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import styled from "styled-components";
import NavbarToggle from "react-bootstrap/NavbarToggle";
import NavbarCollapse from "react-bootstrap/NavbarCollapse";
import LogoURL from "../assets/Logo.png";

const Styles = styled.div`
  .navbar {
    background-color: white;
  }

  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    color: #556b2f;

    $:hover {
      color: black;
    }
  }
`;

export const NavigationBar = () => (
  <Styles>
    <Navbar expand="lg">
      <Navbar.Brand href="/">
        <img
          src={LogoURL}
          width="40"
          height="50"
          className="d-inline-block"
          alt="MBVA logo"
        />{" "}
        MBVA
      </Navbar.Brand>
      <NavbarToggle aria-controls="basic-navbar-nav" />
      <NavbarCollapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Item>
            <Nav.Link>
              <Link to="/">Prediction</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/Methodology">Methodology</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/FAQ">FAQ</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/DemoApp">DemoApp</Link>
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <Link to="/AboutUs">About Us</Link>
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </NavbarCollapse>
    </Navbar>
  </Styles>
);
