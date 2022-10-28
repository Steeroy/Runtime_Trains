import React, { useContext, useEffect, useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Helmet from '../components/Helmet';
import CheckoutSteps from '../components/CheckoutSteps';
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import LoadingBox from '../components/LoadingBox';

const reducer = (state, action) => {
  switch (action.type) {
    case 'CREATE__REQUEST': {
      return { ...state, loading: true };
    }
    case 'CREATE__SUCCESS': {
      return { ...state, loading: false };
    }
    case 'CREATE__FAIL': {
      return { ...state, loading: false };
    }

    default:
      return state;
  }
};

function PlaceOrder() {
  const navigate = useNavigate();

  const [{ loading }, dispatch] = useReducer(reducer, {
    loading: false,
  });

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;

  cart.itemsPrice = round2(
    cart.cartItems.reduce((a, c) => a + c.quantity * c.price, 0)
  );

  cart.taxPrice = round2(0.15 * cart.itemsPrice);

  cart.totalPrice = cart.itemsPrice + cart.taxPrice;

  const placeOrderHandler = async () => {
    try {
      dispatch({ type: 'CREATE__REQUEST' });

      const { data } = await axios.post(
        '/api/orders',
        {
          orderItems: cart.cartItems,
          stationChosen: cart.stationChosen,
          paymentMethod: cart.paymentMethod,
          itemsPrice: cart.itemsPrice,
          taxPrice: cart.taxPrice,
          totalPrice: cart.totalPrice,
        },
        {
          headers: {
            authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      ctxDispatch({ type: 'CART__CLEAR' });
      dispatch({ type: 'CREATE__SUCCESS' });

      localStorage.removeItem('cartItems');
      navigate(`/orders/${data.order._id}`);
    } catch (err) {
      dispatch({ type: 'CREATE__FAIL' });
      alert(getError(err));
    }
  };

  return (
    <Helmet title="Place Order">
      <Container className="my-5">
        <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

        <h1 className="section__title my-3">Preview Order</h1>

        <Row>
          <Col md={8}>
            <Card className="my-3">
              <Card.Body>
                <Card.Title>Details:</Card.Title>
                <Card.Text>
                  <strong>Name:</strong> {cart.stationChosen.fullName} <br />
                  <strong>Station:</strong> {cart.stationChosen.station}
                </Card.Text>
                <Link to="/station">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="my-3">
              <Card.Body>
                <Card.Title>Payment</Card.Title>
                <Card.Text>
                  <strong>Method:</strong> {cart.paymentMethod}
                </Card.Text>
                <Link to="/payment">Edit</Link>
              </Card.Body>
            </Card>

            <Card className="my-3">
              <Card.Body>
                <Card.Title>Items</Card.Title>
                <ListGroup variant="flush">
                  {cart.cartItems.map((item) => (
                    <ListGroupItem key={item._id}>
                      <Row className="align-items-center">
                        <Col md={6}>
                          <img
                            src={item.imgUrl}
                            alt={item.name}
                            className="img-fluid rounded img-thumbnail"
                          />{' '}
                          <Link to={`/train/${item.slug}`}>{item.name}</Link>
                        </Col>
                        <Col md={3}>
                          <span>{item.quantity}</span>
                        </Col>
                        <Col md={3}>R{item.price}</Col>
                      </Row>
                    </ListGroupItem>
                  ))}
                </ListGroup>
                <Link to="/tickets">Edit</Link>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="my-3">
              <Card.Body>
                <Card.Title>Order Summary</Card.Title>

                <ListGroup variant="flush">
                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>Items</strong>
                      </Col>
                      <Col>R{cart.itemsPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>Tax</strong>
                      </Col>
                      <Col>R{cart.taxPrice.toFixed(2)}</Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <Row>
                      <Col>
                        <strong>Order Total:</strong>
                      </Col>
                      <Col>
                        <strong>R{cart.totalPrice.toFixed(2)}</strong>
                      </Col>
                    </Row>
                  </ListGroupItem>

                  <ListGroupItem>
                    <div
                      className="button__tertiary my-2"
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cart.cartItems === 0}
                    >
                      Place Order
                    </div>
                    {loading && <LoadingBox></LoadingBox>}
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default PlaceOrder;
