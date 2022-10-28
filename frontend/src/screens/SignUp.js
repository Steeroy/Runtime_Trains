import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Col,
  Row,
  Form,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';

import Helmet from '../components/Helmet';
import '../App.css';
import img01 from '../assets/Saly-13.png';

function SignUp() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== comfirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });

      ctxDispatch({ type: 'USER__SIGNIN', payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));

      navigate(redirect || '/');
    } catch (err) {
      alert(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Helmet title="Sign Up">
      <Container className="signin__page mt-5 mb-5">
        <Row>
          <Col
            md={6}
            className=" d-flex flex-column align-items-center justify-content-center"
          >
            <h3 className="mb-5">Sign Up</h3>
            <Form className="signin__form d-flex flex-column align-items-center gap-4">
              <FormGroup
                className="formgroup d-flex flex-column gap-1"
                controlId="name"
              >
                <FormLabel>Name</FormLabel>
                <FormControl
                  type="text"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                className="formgroup d-flex flex-column gap-1"
                controlId="email"
              >
                <FormLabel>Email</FormLabel>
                <FormControl
                  type="email"
                  required
                  placeholder="Enter your email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                className="formgroup  d-flex flex-column gap-1 mb-3"
                controlId="password"
              >
                <FormLabel>Password</FormLabel>
                <FormControl
                  type="password"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>

              <FormGroup
                className="formgroup  d-flex flex-column gap-1 mb-3"
                controlId="password"
              >
                <FormLabel>Comfirm Password</FormLabel>
                <FormControl
                  type="password"
                  required
                  placeholder="Enter your password"
                  onChange={(e) => setComfirmPassword(e.target.value)}
                />
              </FormGroup>

              <div
                type="submit"
                className="button__tertiary signin__button"
                onClick={submitHandler}
              >
                Sign In
              </div>
            </Form>

            <p>
              Do you have an account?{' '}
              <span>
                <Link to={`/signin?redirect=${redirect}`}>Sign in here</Link>
              </span>
            </p>
          </Col>

          <Col md={6} className="img__box d-flex">
            <img src={img01} alt="Illustration" className="" />
          </Col>
        </Row>
      </Container>
    </Helmet>
  );
}

export default SignUp;
