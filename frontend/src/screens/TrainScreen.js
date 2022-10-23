import axios from 'axios';
import React, { useContext, useEffect, useReducer } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
// import { Col, Container, Row } from 'reactstrap';
import { Container, Row, Col, ListGroup, Badge, Card } from 'react-bootstrap';
import Helmet from '../components/Helmet.js';
import data from '../data.js';
import Rating from '../components/Rating.js';
import LoadingBox from '../components/LoadingBox.js';
import MessageBox from '../components/MessageBox.js';
import { Store } from '../Store';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__REQUEST':
      return { ...state, loading: true };

    case 'FETCH__SUCCESS':
      return { ...state, train: action.payload, loading: false };

    case 'FETCH__FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function TrainScreen() {
  const navigate = useNavigate();
  const params = useParams();
  const { slug } = params;

  const [{ loading, error, train }, dispatch] = useReducer(reducer, {
    train: [data.trains[0]],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchTrains = async () => {
      dispatch({ type: 'FETCH__REQUEST' });
      try {
        const result = await axios.get(`/api/trains/slug/${slug}`);
        dispatch({ type: 'FETCH__SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH__FAIL', payload: err.message });
      }
    };
    fetchTrains();
  }, [slug]);

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { cart } = state;

  const bookTrainHandler = async () => {
    const existItem = cart.cartItems.find((x) => x._id === train._id);

    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/trains/${train._id}`);

    if (data.tickets < quantity) {
      window.alert('Sorry. The train is fully booked');
      return;
    }

    ctxDispatch({
      type: 'BOOK__TRAIN',
      payload: { ...train, quantity: quantity },
    });

    navigate('/tickets');
  };

  return (
    <Helmet title={slug}>
      <Container className="train-screen__item">
        {loading ? (
          <Row>
            <LoadingBox />
          </Row>
        ) : error ? (
          <Row>
            <MessageBox variant="danger">{error}</MessageBox>
          </Row>
        ) : (
          <Row>
            <Col md={4}>
              <img className="img-large" src={train.imgUrl} alt={train.name} />
            </Col>
            <Col md={4}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1>{train.name}</h1>
                </ListGroup.Item>

                <ListGroup.Item>
                  <Rating rating={train.rating} numReviews={train.numReviews} />
                </ListGroup.Item>

                <ListGroup.Item>
                  <p>type: {train.type}</p>
                </ListGroup.Item>

                <ListGroup.Item>Price: R{train.price}</ListGroup.Item>

                <ListGroup.Item>
                  Description: <p>{train.description}</p>
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <Card.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <Row>
                        <Col>Price:</Col>
                        <Col>R{train.price}</Col>
                      </Row>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Row>
                        <Col>Status:</Col>
                        <Col>
                          {train.tickets > 0 ? (
                            <Badge bg="success">Available</Badge>
                          ) : (
                            <Badge bg="danger">Unavailable</Badge>
                          )}
                        </Col>
                      </Row>
                    </ListGroup.Item>

                    {train.tickets > 0 && (
                      <ListGroup.Item>
                        <div
                          onClick={bookTrainHandler}
                          type="button"
                          className="button__tertiary"
                        >
                          Book Train
                        </div>
                      </ListGroup.Item>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </Helmet>
  );
}

export default TrainScreen;
