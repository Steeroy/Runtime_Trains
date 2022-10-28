import React, { useContext, useEffect, useReducer } from 'react';
import Helmet from '../components/Helmet';
import { Container } from 'react-bootstrap';
import '../App.css';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { Store } from '../Store';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getError } from '../utils';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH__REQUEST':
      return { ...state, loading: true };
    case 'FETCH__SUCCESS':
      return { ...state, orders: action.payload, loading: false };
    case 'FETCH__FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function OrderHistory() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH__REQUEST' });
      try {
        const { data } = await axios.get(`/api/orders/mine`, {
          headers: { authorization: `Bearer ${userInfo.token}` },
        });
        dispatch({ type: 'FETCH__SUCCESS', payload: data });
      } catch (error) {
        dispatch({
          type: 'FETCH__FAIL',
          payload: getError(error),
        });
      }
    };
    fetchData();
  }, [userInfo]);

  return (
    <Helmet title="Order History">
      <Container>
        <h1 className="section__title">Order History</h1>
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>USED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice.toFixed(2)}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                  <td>{order.isUsed ? order.usedAt.substring(0, 10) : 'No'}</td>
                  <td>
                    <div
                      type="button"
                      className="button__secondary"
                      onClick={() => {
                        navigate(`/orders/${order._id}`);
                      }}
                    >
                      Details
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Container>
    </Helmet>
  );
}

export default OrderHistory;
