import { useContext, useEffect, useReducer, useState } from 'react';
import Helmet from '../components/Helmet.js';
import TrainCard from '../components/TrainCard.js';
import { Form, Label, FormGroup, Input } from 'reactstrap';
import axios from 'axios';
import logger from 'use-reducer-logger';
import data from '../data.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { getError } from '../utils.js';
import { Store } from '../Store';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { Container, Row, Col, ListGroup, Button, Card } from 'react-bootstrap';

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
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);

  const [filters, setFilters] = useState({});

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
        dispatch({ type: 'FETCH__FAIL', payload: getError(err) });
      }
    };
    fetchTrains();
  }, []);

  const searchTrainsHandler = (item) => {
    console.log(item);

    const filteredTrains = trains.filter(
      (element) =>
        element.stations.includes(item.depart) &&
        element.stations.includes(item.destination)
    );

    dispatch({ type: 'FETCH__SUCCESS', payload: filteredTrains });
  };

  useEffect(() => {
    const fetchStations = async () => {
      const result = await axios.get('/api/stations');
      setStations(result.data);
    };
    fetchStations();
  }, []);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const {
    cart: { cartItems, bookmarkItems },
  } = state;

  const updateTicketsHandler = async (item, quantity) => {
    const { data } = await axios.get(`/api/trains/${item._id}`);

    if (data.tickets < quantity) {
      window.alert('Sorry. The train is fully booked');
      return;
    }
    ctxDispatch({
      type: 'BOOK__TRAIN',
      payload: { ...item, quantity },
    });
  };

  const removeTicketItem = (item) => {
    ctxDispatch({
      type: 'REMOVE__TRAIN',
      payload: item,
    });
  };

  const checkoutHandler = () => {
    navigate('/signin?redirect=/station');
  };

  const filterHandler = (e) => {
    e.preventDefault();

    const value = e.target.value;
    setFilters({
      ...filters,
      [e.target.name]: value,
    });
  };

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
                  name="depart"
                  type="select"
                  className="form__input"
                  onChange={filterHandler}
                >
                  {stations.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </Input>
              </FormGroup>

              <FormGroup className="book__group">
                <Label for="destination" className="form__labels pb-2">
                  Destination:
                </Label>
                <Input
                  id="destination"
                  name="destination"
                  type="select"
                  className="form__input"
                  onChange={filterHandler}
                >
                  {stations.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
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
                  onChange={filterHandler}
                />
              </FormGroup>

              <FormGroup className="book__group">
                <Label for="time" className="form__labels pb-2">
                  Time:
                </Label>
                <Input
                  id="time"
                  name="time"
                  placeholder="16:08"
                  type="time"
                  className="time__input"
                  onChange={filterHandler}
                />
              </FormGroup>

              <FormGroup className="book__group form__button__group">
                <div
                  type="button"
                  className="search__train button__tertiary"
                  onClick={() => searchTrainsHandler(filters)}
                >
                  Search Trains
                </div>
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
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
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
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : bookmarkItems ? (
            bookmarkItems.map((item) => (
              <Col lg={3} md={4} key={item._id}>
                <TrainCard item={item} />
              </Col>
            ))
          ) : (
            <MessageBox>
              {'No favourites have been added, add favourites'}
            </MessageBox>
          )}
        </Row>

        <Row className="mb-3">
          <Col lg="12" className="col">
            <h4 className="section__title">Tickets</h4>
          </Col>
        </Row>

        <Row>
          <div className="line__separater"></div>
        </Row>

        <Row className="available__trains">
          <Col md={8}>
            {cartItems.length === 0 ? (
              <MessageBox>{'No tickets selected'}</MessageBox>
            ) : (
              <ListGroup>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item._id}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.imgUrl}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/trains/${item.slug}`}>{item.name}</Link>
                      </Col>

                      <Col md={3}>
                        <Button
                          variant="light"
                          onClick={() =>
                            updateTicketsHandler(item, item.quantity - 1)
                          }
                          disabled={item.quantity === 1}
                        >
                          <Icon icon="akar-icons:circle-minus-fill" />
                        </Button>{' '}
                        <span>{item.quantity}</span>{' '}
                        <Button
                          variant="light"
                          onClick={() =>
                            updateTicketsHandler(item, item.quantity + 1)
                          }
                          disabled={item.quantity === item.tickets}
                        >
                          <Icon icon="akar-icons:circle-plus-fill" />
                        </Button>
                      </Col>
                      <Col md={3}>R{item.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeTicketItem(item)}
                          variant="light"
                        >
                          <Icon icon="subway:multiply" />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <h3>
                      Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                      items) : R
                      {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                    </h3>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <div className="d-grid">
                      <div
                        type="button"
                        onClick={checkoutHandler}
                        className="button__tertiary"
                        disabled={cartItems.length === 0}
                      >
                        Proceed to Checkout
                      </div>
                    </div>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default Tickets;
