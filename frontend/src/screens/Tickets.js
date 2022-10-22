import { useEffect, useReducer, useState } from 'react';
import Helmet from '../components/Helmet.js';
import TrainCard from '../components/TrainCard.js';
import { Container, Row, Col, Form, Label, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import logger from 'use-reducer-logger';
import data from '../data.js';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__REQUEST':
      return { ...state, loading: true };

    case 'FETCH__SUCCESS':
      return { ...state, trains: action.payload, loading: false };

    case 'FETCH__FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function Tickets() {
  const [{ loading, error, trains }, dispatch] = useReducer(logger(reducer), {
    trains: [data.trains[0]],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchTrains = async () => {
      dispatch({ type: 'FETCH__REQUEST' });
      try {
        const result = await axios.get('/api/trains');
        dispatch({ type: 'FETCH__SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH__FAIL', payload: err.message });
      }

      //setTrains(result.data);
    };
    fetchTrains();
  }, []);

  return (
    <Helmet title="Tickets">
      <Container className="tickets mt-5">
        <Row className="mb-3">
          <Col lg="3" md="4" sm="6" className="col">
            <h4 className="section__title">Book Ticket</h4>
          </Col>
        </Row>

        <Row>
          <div className="line__separater"></div>
        </Row>

        <Row className="mt-4">
          <div className="col">
            <Form className="book__form d-flex align-items-center justify-content-between">
              <FormGroup className="book__group">
                <Label for="depart" className="form__labels pb-2">
                  Departure:
                </Label>
                <Input
                  id="depart"
                  name="select"
                  type="select"
                  className="form__input"
                >
                  <option>Pr'Orange</option>
                  <option>Red Sparrow</option>
                  <option>Dunes</option>
                  <option>Hazel</option>
                  <option>Reaze</option>
                </Input>
              </FormGroup>

              <FormGroup className="book__group">
                <Label for="destination" className="form__labels pb-2">
                  Destination:
                </Label>
                <Input
                  id="destination"
                  name="select"
                  type="select"
                  className="form__input"
                >
                  <option>Pr'Orange</option>
                  <option>Red Sparrow</option>
                  <option>Dunes</option>
                  <option>Hazel</option>
                  <option>Reaze</option>
                </Input>
              </FormGroup>

              <FormGroup className="book__group">
                <Label for="date" className="form__labels pb-2">
                  Date:
                </Label>
                <Input
                  id="date"
                  name="date"
                  placeholder="10/03/2022"
                  type="date"
                  className="form__input"
                />
              </FormGroup>

              <FormGroup className="book__group">
                <Label for="time" className="form__labels pb-2">
                  Time:
                </Label>
                <Input
                  id="time"
                  name="ime"
                  placeholder="16:08"
                  type="time"
                  className="time__input"
                />
              </FormGroup>

              <FormGroup className="book__group form__button__group">
                <button className="search__train button__tertiary">
                  Search Trains
                </button>
              </FormGroup>
            </Form>
          </div>
        </Row>

        <Row className="mb-3">
          <Col lg="12" className="col">
            <h4 className="section__title">Available Trains</h4>
          </Col>
        </Row>

        <Row>
          <div className="line__separater"></div>
        </Row>

        <Row className="available__trains">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div>{error}</div>
          ) : trains ? (
            trains.map((item) => (
              <Col lg="3" md="4" key={item.slug}>
                <TrainCard item={item} />
              </Col>
            ))
          ) : (
            ''
          )}
        </Row>

        <Row className="mb-3">
          <Col lg="12" className="col">
            <h4 className="section__title">Favourites</h4>
          </Col>
        </Row>

        <Row>
          <div className="line__separater"></div>
        </Row>

        <Row className="available__trains">
          <Col lg="3" md="4" sm="6">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>{error}</div>
            ) : trains ? (
              <TrainCard item={trains[0]} />
            ) : (
              ''
            )}
          </Col>
        </Row>

        <Row className="mb-3">
          <Col lg="12" className="col">
            <h4 className="section__title">Checkout</h4>
          </Col>
        </Row>

        <Row>
          <div className="line__separater"></div>
        </Row>
      </Container>
    </Helmet>
  );
}

export default Tickets;
