import React from 'react';
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
import { Link, useLocation } from 'react-router-dom';

import Helmet from '../components/Helmet';
import '../App.css';
import img01 from '../assets/Saly-10.png';

function SignIn() {
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ? redirectInUrl : '/';

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
                <FormLabel>Username</FormLabel>
                <FormControl
                  type="email"
                  required
                  placeholder="Enter your email"
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
                />
              </FormGroup>

              <div type="button" className="button__tertiary signin__button">
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
