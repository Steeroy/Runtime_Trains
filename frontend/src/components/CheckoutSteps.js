import React from 'react';
import { Col, Row } from 'react-bootstrap';

import '../App.css';

function CheckoutSteps(props) {
  return (
    <div className="steps">
      <Row className="checkout-steps mt-3">
        <Col md={3} className={props.step1 ? 'active' : ''}>
          Sign In
        </Col>
        <Col md={3} className={props.step2 ? 'active' : ''}>
          Station
        </Col>
        <Col md={3} className={props.step3 ? 'active' : ''}>
          Payment
        </Col>
        <Col md={3} className={props.step4 ? 'active' : ''}>
          Place Order
        </Col>
      </Row>
    </div>
  );
}

export default CheckoutSteps;
