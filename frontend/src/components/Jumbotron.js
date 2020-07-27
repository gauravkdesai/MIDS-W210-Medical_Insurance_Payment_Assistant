import React from "react";
import { Jumbotron as Jumbo, Container } from "react-bootstrap";
import styled from "styled-components";
import HomeHeader from "../assets/HomeHeader.jpg";

const Styles = styled.div`
  .jumbo {
    background: url(${HomeHeader}) no-repeat fixed bottom;
    background-size: cover;
    color: #efefef;
    height: 200px;
    position: relative;
    z-index: -2;
  }

  .overlay {
    background-color: #000;
    opacity: 0.2;
    position: absolute;
    top: -2;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
  }

  p {
    text-align: center;
  }
`;

export const Jumbotron = () => (
  <Styles>
    <Jumbo fluid className="jumbo">
      <div className="overlay" />
      <Container>
        <div>
          <h1>Medical Billing Virtual Assistant</h1>
          <br />
          <p>We help you decipher medical notes</p>
        </div>
      </Container>
    </Jumbo>
  </Styles>
);
