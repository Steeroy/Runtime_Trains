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
import { Icon } from '@iconify/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Store } from '../Store';
import { getError } from '../utils';

import Helmet from '../components/Helmet';
import '../App.css';
import img01 from '../assets/Saly-10.png';

function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);

  const { userInfo } = state;

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post('/api/users/signin', {
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
    <Helmet title="Sign In">
      <Container className="signin__page mt-5 mb-5">
        <Row>
          <Col
            md={6}
            className=" d-flex flex-column align-items-center justify-content-center"
          >
            <h3 className="mb-5">Login</h3>
            <Form className="signin__form d-flex flex-column align-items-center gap-4">
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

              <div
                type="submit"
                className="button__tertiary signin__button"
                onClick={submitHandler}
              >
                Sign In
              </div>
            </Form>

            <div className="mt-3 mb-3 d-flex gap-2 or__sections">
              <div className="or__line"></div>
              <h6>OR</h6>
              <div className="or__line"></div>
            </div>

            <p>Sign in using</p>

            <div className="icons d-flex align-items-center gap-3 mb-3">
              <Icon icon="bi:facebook" />
              <Icon icon="akar-icons:google-contained-fill" />
            </div>

            <p>
              Do you have an account?{' '}
              <span>
                <Link to={`/signup?redirect=${redirect}`}>Register here</Link>
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

export default SignIn;
