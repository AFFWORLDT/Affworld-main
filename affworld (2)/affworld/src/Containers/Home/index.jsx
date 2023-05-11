import React from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * @author
 * @function Home
 **/

const Home = (props) => {
  return (
    <>
      <div className="login-section section-padding">
        <Container>
            <h1>Go Visit Your Dashbooard!</h1>
            <Link to="/affiliate/offers">Offers</Link>
         </Container>
      </div>
    </>
  );
};

export default Home;
