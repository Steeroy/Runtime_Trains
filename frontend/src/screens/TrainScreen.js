import axios from 'axios';
import React, { useEffect, useReducer } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'reactstrap';
import Helmet from '../components/Helmet.js';
import data from '../data.js';

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

      //setTrains(result.data);
    };
    fetchTrains();
  }, [slug]);

  return (
    <Helmet title={slug}>
      <Container>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div>{error}</div>
        ) : (
          <div>{train.name}</div>
        )}
      </Container>
    </Helmet>
  );
}

export default TrainScreen;
