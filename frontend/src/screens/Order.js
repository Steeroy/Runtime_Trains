import React, { useContext, useEffect, useReducer } from 'react';
import {
  Card,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { getError } from '../utils';
import axios from 'axios';
import Helmet from '../components/Helmet';
import { toast } from 'react-toastify';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH__SUCCESS':
      return { ...state, loading: false, order: action.payload, error: '' };
    case 'FETCH__FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'PAY__REQUEST':
      return { ...state, loadingPay: true };
    case 'PAY__SUCCESS':
      return { ...state, loadingPay: false, successPay: true };
    case 'PAY__FAIL':
      return { ...state, loadingPay: false };
    case 'PAY__RESET':
      return { ...state, loadingPay: false, successPay: false };
    default:
      return state;
  }
};

function Order() {
  const navigate = useNavigate();
  const { state } = useContext(Store);
  const { userInfo } = state;

  const params = useParams();
  const { id: orderId } = params;

  const [{ loading, error, order, successPay, loadingPay }, dispatch] =
    useReducer(reducer, {
      loading: true,
      order: {},
      error: '',
      successPay: false,
      loadingPay: false,
    });

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: { value: order.totalPrice },
          },
        ],
      })
      .then((orderID) => {
        return orderID;
      });
  }

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        dispatch({ type: 'PAY__REQUEST' });
        const { data } = await axios.put(
          `/api/orders/${order._id}/pay`,
          details,
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );

        dispatch({
          type: 'PAY__SUCCESS',
          payload: data,
        });

        toast.success('Order is paid');
      } catch (err) {
        dispatch({ type: 'PAY__FAIL', payload: getError(err) });
        toast.error(getError(err));
      }
    });
  }

  function onError(err) {
    toast.error(getError(err));
  }

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        dispatch({ type: 'FETCH__REQUEST' });
        const { data } = await axios.get(`/api/orders/${orderId}`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        dispatch({ type: 'FETCH__SUCCESS', payload: data });
      } catch (err) {
        dispatch({ type: 'FETCH__FAIL', payload: getError(err) });
      }
    };

    if (!userInfo) {
      return navigate('/login');
    }
    if (!order._id || successPay || (order._id && order._id !== orderId)) {
      fetchOrder();
      if (successPay) {
        dispatch({ type: 'PAY__RESET' });
      }
    } else {
      const loadPayPalScript = async () => {
        const { data: clientId } = await axios.get('/api/keys/paypal', {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });

        paypalDispatch({
          type: 'resetOptions',
          value: {
            'client-id': clientId,
            currency: 'USD',
          },
        });

        paypalDispatch({
          type: 'setLoadingStatus',
          value: 'pending',
        });
      };

      loadPayPalScript();
    }
  }, [order, userInfo, orderId, navigate, paypalDispatch, successPay]);

  return (
    <Helmet title={orderId}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <Container className="my-4">
          <h1 className="my-3 section__title">Order {orderId}</h1>
          <Row>
            <Col md={8}>
              <Card className="my-3">
                <Card.Body>
                  <Card.Title>Details</Card.Title>
                  <Card.Text>
                    <strong>Name: </strong>
                    {order.stationChosen.fullName} <br />
                    <strong>Station: </strong>
                    {order.stationChosen.station}
                  </Card.Text>
                  {order.isUsed ? (
                    <MessageBox variant="success">
                      Used at {order.usedAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not Used</MessageBox>
                  )}
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Payment</Card.Title>
                  <Card.Text>
                    <strong>Method: </strong>
                    {order.paymentMethod}
                  </Card.Text>
                  {order.isPaid ? (
                    <MessageBox variant="success">
                      Paid at: {order.paidAt}
                    </MessageBox>
                  ) : (
                    <MessageBox variant="danger">Not paid</MessageBox>
                  )}
                </Card.Body>
              </Card>

              <Card className="mb-3">
                <Card.Body>
                  <Card.Title>Items</Card.Title>
                  <ListGroup variant="flush">
                    {order.orderItems.map((item) => (
                      <ListGroupItem key={item._id}>
                        <Row className="align-items-center">
                          <Col md={6}>
                            <img
                              src={item.imgUrl}
                              alt={item.name}
                              className="img-fluid rounded img-thumbnail"
                            />
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
                        <Col>R{order.itemsPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                      <Row>
                        <Col>
                          <strong>Tax:</strong>
                        </Col>
                        <Col>R{order.taxPrice.toFixed(2)}</Col>
                      </Row>
                    </ListGroupItem>

                    <ListGroupItem>
                      <Row>
                        <Col>
                          <strong>Order Total:</strong>
                        </Col>
                        <Col>
                          <strong>R{order.totalPrice.toFixed(2)}</strong>
                        </Col>
                      </Row>
                    </ListGroupItem>
                    {!order.isPaid && (
                      <ListGroupItem>
                        {isPending ? (
                          <LoadingBox />
                        ) : (
                          <div>
                            <PayPalButtons
                              createOrder={createOrder}
                              onApprove={onApprove}
                              onError={onError}
                            ></PayPalButtons>
                          </div>
                        )}
                        {loadingPay && <LoadingBox />}
                      </ListGroupItem>
                    )}
                  </ListGroup>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}
    </Helmet>
  );
}

export default Order;
