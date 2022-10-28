import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import Helmet from '../components/Helmet';
import { Store } from '../Store';

function Station() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    userInfo,
    cart: { stationChosen },
  } = state;
  const [fullName, setFullName] = useState(stationChosen.fullName || '');
  const [station, setStation] = useState(stationChosen.station || '');

  useEffect(() => {
    if (!userInfo) {
      navigate('/signin?redirect=/station');
    }
  }, [userInfo, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    ctxDispatch({
      type: 'SAVE__STATION',
      payload: {
        fullName,
        station,
      },
    });

    localStorage.setItem(
      'station',
      JSON.stringify({
        fullName,
        station,
      })
    );

    navigate('/payment');
  };

  return (
    <Helmet title="Station">
      <Container className="mt-3 d-flex flex-column align-items-center justify-content-center">
        <CheckoutSteps step1 step2 className="checkout_steps_cont" />
        <div className="station__container">
          <h1 className="my-3">Station - Destination</h1>
          <Form>
            <FormGroup className="mb-3" controlId="fullName">
              <FormLabel>Full Name</FormLabel>
              <FormControl
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup className="mb-3" controlId="station">
              <FormLabel>Station</FormLabel>
              <FormControl
                value={station}
                onChange={(e) => setStation(e.target.value)}
                required
              />
            </FormGroup>

            <div className="mb-3">
              <div
                type="submit"
                className="button__tertiary signin__button"
                onClick={submitHandler}
              >
                Continue
              </div>
            </div>
          </Form>
        </div>
      </Container>
    </Helmet>
  );
}

export default Station;
