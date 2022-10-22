import React from 'react';
import { Container, Col, Row } from 'reactstrap';

import Helmet from '../components/Helmet';

function SignIn() {
  return (
    <Helmet title="Sign In">
      <Container>
        <h2>Sign In</h2>
      </Container>
    </Helmet>
  );
}

export default SignIn;
