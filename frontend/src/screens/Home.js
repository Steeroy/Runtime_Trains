import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import Helmet from '../components/Helmet';

function Home() {
  return (
    <Helmet title="Home">
      <Container>
        <h2>Home</h2>
      </Container>
    </Helmet>
  );
}

export default Home;
