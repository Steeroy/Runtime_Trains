import React from 'react';
import { Container, Row, Col, FormGroup, Label, Input, Form } from 'reactstrap';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

import train__illustration from '../assets/train_illustration.png';

const nav__links = [
  {
    display: 'Home',
    path: '/home',
  },
  {
    display: 'About',
    path: '/about',
  },
  {
    display: 'Tickets',
    path: '/tickets',
  },
  {
    display: 'Account',
    path: '/account',
  },
];

function Footer() {
  return (
    <footer className="footer">
      <Container>
        <Row className=" first__row">
          <Col
            lg="3"
            md="4"
            sm="6"
            className="news__col d-flex flex-column gap-2 align-items-center"
          >
            <div className="train__illustration">
              <img src={train__illustration} alt="train illustration" />
            </div>

            <div className="newsletter__subscribe">
              <Form className=" d-flex align-items-center">
                <FormGroup className="form__input d-flex align-items-center gap-2">
                  <Label className="news__text" for="subscribe">
                    Newsletter:
                  </Label>

                  <Input
                    className="input__text"
                    id="subscribe"
                    name="email"
                    placeholder="Enter your email"
                    type="email"
                  />
                </FormGroup>

                <div className="sub__button button__primary ">Subscribe</div>
              </Form>
            </div>
          </Col>

          <Col
            lg="3"
            md="4"
            sm="6"
            className="menu__col d-flex flex-column gap-4"
          >
            <h4>Runtime Trains</h4>

            <div className="footer__menu d-flex flex-column gap-3">
              {nav__links.map((item, index) => (
                <NavLink
                  to={item.path}
                  key={index}
                  className={(navClass) =>
                    navClass.isActive ? 'footer__menu__active' : ''
                  }
                >
                  {item.display}
                </NavLink>
              ))}
            </div>
          </Col>

          <Col
            lg="3"
            md="4"
            sm="6"
            className="contact__us d-flex flex-column gap-4"
          >
            <h4>Contact Us</h4>

            <div className="address d-flex flex-column gap-2">
              <p>
                <span>Address:</span> <br />
                123 ABC Road, <br /> Example, <br /> East Nowhere, <br /> South
                Africa
              </p>

              <p>
                Email: runtimetrains@example.com <br />
                Cellphone: 021-123-4567
              </p>
            </div>
          </Col>
        </Row>

        <Row className="second__row">
          <div className="line__separater"></div>
        </Row>

        <Row className="third__row d-flex align-items-center justify-content-between mt-3">
          <Col lg="3" md="4" sm="6" className="rights__reserved">
            <p className="d-flex align-items-center">All Rights Reserved</p>
          </Col>
          <Col lg="3" md="4" sm="6" className="design">
            <p>Designed by Siyanda</p>
          </Col>
          <Col
            lg="3"
            md="4"
            sm="6"
            className="icons d-flex align-items-center gap-3"
          >
            <Icon icon="ant-design:twitter-square-filled" />
            <Icon icon="fa6-brands:square-instagram" />
            <Icon icon="bxl:facebook-square" />
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
