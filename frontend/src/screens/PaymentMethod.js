import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, FormCheck, Row } from 'react-bootstrap';
import Helmet from '../components/Helmet';
import CheckoutSteps from '../components/CheckoutSteps';

import '../App.css';
import { Store } from '../Store';

export default function PaymentMethod() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { stationChosen, paymentMethod },
  } = state;

  const [paymentMethodName, setPaymentMethodName] = useState(
    paymentMethod || 'PayPal'
  );

  useEffect(() => {
    if (!stationChosen) {
      navigate('/station');
    }
  }, [stationChosen]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE__PAYMENT__METHOD',
      payload: paymentMethodName,
    });

    localStorage.setItem('paymentMethod', paymentMethodName);
    navigate('/placeorder');
  };

  return (
    <Helmet title="Payment">
      <Container className="my-3 mt-3">
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className="paymentmethod">
          <h1 className=" section__title my-3 mt-3">Payment Method</h1>

          <Form className="paymentmethodform gap-4">
            <div>
              <FormCheck
                type="radio"
                id="PayPal"
                label="PayPal"
                value="PayPal"
                checked={paymentMethodName === 'PayPal'}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>

            <div>
              <FormCheck
                type="radio"
                id="Stripe"
                label="Stripe"
                value="Stripe"
                checked={paymentMethodName === 'Stripe'}
                onChange={(e) => setPaymentMethodName(e.target.value)}
              />
            </div>

            <div
              type="button"
              className="button__tertiary"
              onClick={submitHandler}
            >
              Continue
            </div>
          </Form>
        </div>
      </Container>
    </Helmet>
  );
}
