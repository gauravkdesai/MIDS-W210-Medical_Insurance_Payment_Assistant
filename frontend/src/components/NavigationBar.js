import React from 'react';
import {Link} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import styled from 'styled-components';
import NavbarToggle from 'react-bootstrap/NavbarToggle';
import NavbarCollapse from 'react-bootstrap/NavbarCollapse';

const Styles = styled.div`
    .navbar {
        background-color: #222;
    }

    a, .navbar-brand, .navbar-nav .nav-link{
        color: #bbb;

        $:hover{
            color: white
        }
    }
`;

export const NavigationBar = () => (
    <Styles>
        <Navbar expand="lg">
            <Navbar.Brand href="/">Medical Assitant (logo?)</Navbar.Brand>
            <NavbarToggle aria-controls="basic-navbar-nav"/>
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
                            <Link to="/AboutUs">About Us</Link>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            </NavbarCollapse>
        </Navbar>
    </Styles>
)