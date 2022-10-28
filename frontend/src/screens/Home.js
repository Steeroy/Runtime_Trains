import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Col, Row } from 'reactstrap';

import Helmet from '../components/Helmet';
import illustration from '../assets/train_illustration.png';

function Home() {
  return (
    <Helmet title="Home">
      <Container className="home">
        <Row className="my-5">
          <Col
            md={6}
            className="left d-flex flex-column align-items-center gap-3 justify-content-center"
          >
            <h1>
              Got a place to go? Let <span>Us</span> take <span>You</span>{' '}
              there.
            </h1>

            <div className="d-flex align-items-center gap-4">
              <Link to="/about">
                <div className="button__primary">Learn More</div>
              </Link>

              <Link to="/tickets">
                <div className="button__secondary">Book ticket</div>
              </Link>
            </div>
          </Col>
          <Col
            md={6}
            className="right d-flex align-items-center justify-content-center"
          >
            <img src={illustration} alt="illustration" />
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default Home;
